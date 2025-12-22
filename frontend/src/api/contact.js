export const sendContactMessage = async (data) => {
  const res = await fetch(`${import.meta.env.VITE_USER_API}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
};
