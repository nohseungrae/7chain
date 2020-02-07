import { IP_CONFIRM, IP_SERVER_ERROR } from "./types";
import axios from "axios";
import setIpAddress from "../utils/setIpAddress";

export const ipConfirm = () => async dispatch => {
  try {
    const res = await axios.get("/api/ip/confirm");
    dispatch({
      type: IP_CONFIRM,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: IP_SERVER_ERROR,
      payload: false
    });
  }
};
