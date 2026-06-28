import { auth } from '../firebase/config';

const BASE_URL = '/api';

const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) return {};
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
};

export const submitEnquiry = async (formData) => {
  const res = await fetch(`${BASE_URL}/enquiries`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse(res);
};

export const fetchEnquiries = async (params = {}) => {
  const headers = await getAuthHeaders();
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/enquiries?${qs}`, { headers });
  return handleResponse(res);
};

export const fetchEnquiry = async (id) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/enquiries/${id}`, { headers });
  return handleResponse(res);
};

export const updateEnquiry = async (id, body) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/enquiries/${id}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
};

export const deleteEnquiry = async (id) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/enquiries/${id}`, {
    method: 'DELETE',
    headers,
  });
  return handleResponse(res);
};
