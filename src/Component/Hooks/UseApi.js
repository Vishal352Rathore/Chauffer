// src/hooks/useApi.js
import { useState } from "react";
import axios from "axios";

const UseApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callApi = async ({ url, method = 'GET', headers = {}, body = null }) => {
    setLoading(true);
    setError(null);
    setData(null);

    console.log("USE API :",url ,method ,headers,body)
    try {
      const response = await axios({
        url,
        method,
        headers,
        data: body
      });

      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, callApi };
};

export default UseApi;
