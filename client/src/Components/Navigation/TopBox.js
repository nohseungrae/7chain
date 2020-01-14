import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBars } from "@fortawesome/free-solid-svg-icons";
import { device } from "../../device";

const TopBox = styled.div`
  max-width: 1162px;
  width: 100%;
  margin: auto;
  padding: 0px 5px 0;
  > div {
    ${device.PC992`padding : 5px 5px`}
    position: relative;
    display: flex;
    justify-content: space-between;
  }
`;
const LogoBox = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
  padding: 0;
  margin-left: 0;
  img {
    height: 32px;
  }
`;
const NavBar = styled.div`
  display: flex;
  flex-grow: 1;
  ${device.PC992`display : none`}
`;
const Ul = styled.ul`
  padding: 0;
  border: 0;
  margin: 0 20px 0 auto;
  background-color: transparent;
  display: flex;
`;
const Li = styled.li``;
const Alink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #fff;
  padding: 0.6em 1em;
`;
const Util = styled.div`
  display: flex;
  align-items: center;
  ${device.PC992`  position: absolute; display : block`}
  right: 55px;
  top: 10px;
  padding: 0;
`;
const UtilBox = styled(Link)`
  font-size: 16px;
  color: #fff;
  i,
  svg {
    margin-left: 5px;
    margin-right: 5px;
  }
`;
const ToggleBox = styled.button`
  ${device.PC992`  position: absolute; display : block`}
  display : none;
  right: 0;
  top: 0;
  font-weight: 300;
  font-size: 32px;
  background-color: transparent;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.5);
  padding: 0.25rem 0.75rem;
  cursor: pointer;
`;
export default ({ handleClick, history, location, handleGo }) => {
  const ul = useRef(null);

  return (
    <>
      <TopBox>
        <div>
          <LogoBox onClick={handleClick} to="/">
            <img
              src={require("../../assets/images/logo/7chain-logo-white.svg")}
              alt="logo"
            />
          </LogoBox>
          {(location && location.pathname === "/admin/press") ||
          location.pathname === "/admin/media" ? (
            <NavBar>
              <Ul>
                <Li>
                  <Alink to="/admin/press">Press</Alink>
                </Li>
                <Li>
                  <Alink to="/admin/media">Media</Alink>
                </Li>
              </Ul>
            </NavBar>
          ) : (
            <>
              <NavBar>
                <Ul ref={ul}>
                  <Li>
                    <Alink onClick={handleGo} to="#overview">
                      <span>Overview</span>
                    </Alink>
                  </Li>
                  <Li>
                    <Alink onClick={handleGo} to="#roadmap">
                      <span>Roadmap</span>
                    </Alink>
                  </Li>
                  <Li>
                    <Alink onClick={handleGo} to="#token">
                      <span>Token Distribution</span>
                    </Alink>
                  </Li>
                  <Li>
                    <Alink onClick={handleGo} to="#press">
                      <span>Press</span>
                    </Alink>
                  </Li>
                  <Li>
                    <Alink onClick={handleGo} to="#media">
                      <span>Media</span>
                    </Alink>
                  </Li>
                  <Li>
                    <Alink to="#">
                      <span>Contact</span>
                    </Alink>
                  </Li>
                </Ul>
              </NavBar>
              <Util>
                <UtilBox to="/">
                  <i className="flag-icon flag-icon-kr"></i>
                  <span>Korean</span>
                  <FontAwesomeIcon icon={faAngleDown} />
                </UtilBox>
              </Util>
            </>
          )}
          <ToggleBox>
            <FontAwesomeIcon icon={faBars} />
          </ToggleBox>
        </div>
      </TopBox>
    </>
  );
};
