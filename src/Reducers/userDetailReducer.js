const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    flight_no :"",
    chauffer_notes :"",
    cost_center:""
  }
  
  const bookingStageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_BOOKING_DATA":
            return {
              ...state,
              ...action.payload
            };
      default:
        return state;
    }
  };
  
  export default bookingStageReducer;
  