import { useState, useEffect, useCallback } from 'react';
import { fetchEnquiries } from '../services/api';

export const useEnquiries = (initialParams = {}) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchEnquiries(params);
      setData(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => { load(); }, [load]);

  return { data, pagination, loading, error, setParams, refresh: load };
};
