import { recommendProducers } from "./recommendProducers";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  recommend: recommendProducers,
});

export default rootReducers;
