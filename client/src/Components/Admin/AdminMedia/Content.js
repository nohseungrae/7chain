import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getMediaAll, deleteMedia } from "../../../actions/media";
import { Link } from "react-router-dom";

const Section = styled.section`
  margin-top: 80px;
  padding: 0 0 120px;
  overflow: hidden;
`;
const Container = styled.div`
  max-width: 1162px;
  width: 1162px;
  margin: auto;
`;
const HBox = styled.div`
  position: relative;
  width: 1162px;
  margin: 0 auto;
  padding-top: 45px;
  transition: all 0.1s, color 0.1s 0.1s;
  border-bottom: 1px #282828 solid;
  padding-bottom: 15px;
  margin-bottom: 55px;
  h2 {
    font-weight: 700;
    font-size: 40px;
    color: #fff;
  }
`;
const Articles = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Item = styled.div`
  position: relative;
  margin-top: 40px;
  text-align: center;
  flex: 0 0 25%;
  max-width: 25%;
  padding-right: 15px;
  padding-left: 15px;
  a {
    color: #fff;
    overflow: hidden;
    figure {
      position: relative;
      width: 100%;
      height: auto;
      margin: 0;
      padding: 0;
      background: #fff;
      overflow: hidden;
      border: 1px solid #fff;
      > img {
        width: 100%;
        height: 12vw;
        max-height: 160px;
      }
    }
    p {
      text-align: left;
      margin: 0;
      padding: 20px 0 0;
      font-size: 20px;
      line-height: 1.5;
      display: -webkit-box;
      max-height: 260px;
      opacity: 0.9;
    }
  }
`;
const Type = styled.div`
  color: #fff;
  padding: 5px;
  font-size: 18px;
  min-height: 40px;
  display: flex;
  > div {
    width: 45%;
    padding: 0 10px;
  }
`;
const Close = styled.div`
  position: absolute;
  right: 16px;
  top: 5px;
  margin: 0;
  width: 33px;
  height: 28px;
  opacity: 1;
  z-index: 998;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    z-index: 999;
  }
`;
// const Logo = styled.div`
//   position: absolute;
//   left: 16px;
//   top: 1px;
//   margin: 0;
//   padding: 2px 5px;
//   background: #353434;
//   width: 85px;
//   height: 34px;
//   opacity: 0.7;
//   img {
//     width: 75px;
//     height: 30px;
//   }
// `;
const Sub = styled.div`
  text-align: left;
  margin: 0;
  padding: 14px 0 0;
  font-size: 15px;
  letter-spacing: 1px;
  vertical-align: text-bottom;
  span:first-child {
    font-weight: bold;
  }
  span:last-child {
    margin-left: 5px;
    opacity: 0.8;
    ::before {
      display: inline-block;
      content: "";
      width: 1px;
      height: 12px;
      margin-right: 11px;
      background: #fff;
      opacity: 0.8;
    }
  }
`;
const SeeMore = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 90px;
`;
const SLink = styled(Link)`
  padding: 10px 30px;
  background: #393939;
  color: #fff;
  font-size: 22px;
`;
export default () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { media, cnt } = useSelector(state => ({
    media: state.media.adminMedia,
    cnt: state.media.cnt
  }));
  const handleClick = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleDelete = no => {
    const r = window.confirm("hello");
    if (r) {
      dispatch(deleteMedia(no));
    } else {
      return false;
    }
  };
  useEffect(() => {
    dispatch(getMediaAll(currentPage));
  }, [currentPage, dispatch]);
  return (
    <Section>
      <Container>
        <HBox>
          <h2>Media</h2>
        </HBox>
        <Articles>
          {media &&
            media.map(me => (
              <Item key={me.no}>
                <Type>
                  <div>{me.is_7chain === 1 ? "7Chain" : null}</div>
                  <div>{me.is_numbers === 1 ? "Numbers" : null}</div>
                </Type>
                <Close onClick={() => handleDelete(me.no)}>
                  <img
                    src={require("../../../assets/images/MVPGame_Close.png")}
                    alt="close"
                  />
                </Close>
                <a
                  href={me.media_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <figure>
                    <img
                      src={`/images/media/${encodeURIComponent(
                        me.poster_img_filename
                      )}`}
                      alt="poster"
                    />
                    {/* <Logo>
                      <img
                        src={`/images/media/${encodeURIComponent(
                          me.logo_img_filename,
                          "euc-kr"
                        )}`}
                        alt="logo"
                      />
                    </Logo> */}
                  </figure>
                  <Sub>
                    <span>{me.media_name}</span>
                    <span>{me.reg_date}</span>
                  </Sub>
                  <p>{me.title}</p>
                </a>
              </Item>
            ))}
        </Articles>
        <SeeMore>
          {cnt && media.length === cnt ? null : (
            <SLink to="#" onClick={handleClick}>
              더보기
            </SLink>
          )}
        </SeeMore>
      </Container>
    </Section>
  );
};
