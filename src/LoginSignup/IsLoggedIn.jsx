export const isLoggedIn = () => {
    // Check if the token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode the token to get its payload
        const decodedToken = decode(token);
        // Check if the token is expired
        if (decodedToken.exp * 1000 > Date.now()) {
          return true; // User is logged in
        } else {
          // Token is expired
          localStorage.removeItem('token'); // Remove the expired token
          return false; // User is not logged in due to expired token
        }
      } catch (error) {
        console.log("Error decoding token:", error);
        localStorage.removeItem('token'); // Remove the invalid token
        return false; // User is not logged in due to invalid token
      }
    }
    return false; // User is not logged in
  };
  