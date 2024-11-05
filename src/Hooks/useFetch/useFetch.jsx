import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig/axiosInstance";

export const useFetch = ({ endpoint, params, headers, ...rest }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const getData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(endpoint, {
        params,
        headers,
        ...rest,
      });
      setData(res.data);
      setError(undefined);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [JSON.stringify(params)]);
  return {
    data,
    loading,
    error,
  };
};
