export const registerUser = async (data) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
};

export const loginUser = async (data) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
};

export const logoutUser = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};

export const getMe = async () => {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });
  return res.json();
};
