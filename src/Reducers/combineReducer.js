import bookingStageReducer from "./bookingStageReducer";
import userDetailReducer from "./userDetailReducer"
import paymentDetailReducer from "./paymentDetailReducer"
import { combineReducers } from "redux";

const rootReducer = combineReducers({
 bookingStageReducer,userDetailReducer,paymentDetailReducer
});

export default rootReducer;