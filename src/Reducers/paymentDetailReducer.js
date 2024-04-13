const initialState = {
    nameofcard: "",
    cardnumber: "",
    expirationdate: "",
    cvv: "",
  }
  
  const paymentDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_PAYMENT_DATA":
            return {
              ...state,
              ...action.payload
            };
      default:
        return state;
    }
  };
  
  export default paymentDetailReducer;
  