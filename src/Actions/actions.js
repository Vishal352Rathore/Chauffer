export const nextStage = (data) => {
  return {
    type: "NEXT_STAGE",
    payload: data,
  };
};

export const previousStage = (data) => {
  return {
    type: "PREVIOUS_STAGE",
    payload: data,
  };
};

export const updateBookingData = (data) => {
  return { 
    type: "UPDATE_BOOKING_DATA", 
    payload: data 
  };
};

export const updatePaymentData = (data) => {
  return {
     type: "UPDATE_PAYMENT_DATA",
     payload: data 
    };
};
