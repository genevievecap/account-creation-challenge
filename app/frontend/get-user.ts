export const getUserSession = async () => {
  const res = await fetch('/api/get_account', {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();

  console.log('getUserSession response:', data);
  return data;
};
