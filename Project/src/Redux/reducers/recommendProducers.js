import * as types from "../actionType";

const initalState = {
  recommend: [],
};

export const recommendProducers = (state = initalState, action) => {
  switch (action.type) {
    case types.GET_RECOMMEND:
      return {
        ...state,
        recommend: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
