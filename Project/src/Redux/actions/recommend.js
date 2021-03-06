import * as types from "../actionType";
import axios from "axios";
import { LocalASP_Net } from "../../API/const";

export const getRecommend = (recommend) => {
  return {
    type: types.GET_RECOMMEND,
    payload: recommend,
  };
};

export const loadRecommend = (username) => {
  return function (dispatch) {
    axios({
      method: "get",
      url: LocalASP_Net + username,
    })
      .then((res) => {
        dispatch(getRecommend(res.data));
      })
      .catch((err) => console.log(err));
  };
};
