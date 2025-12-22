const BASE_URL = "http://localhost:5400/api/auth";

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
};

export const logoutUser = async () => {
  await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const getMe = async () => {
  const res = await fetch(`${BASE_URL}/me`, {
    credentials: "include",
  });

  return res.json();
};
