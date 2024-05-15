

export const request = async <T>(endpoint: string, options: RequestInit) => {
  const host = process.env.NEXT_PUBLIC_API_HOST;

  const res = await fetch(host + endpoint, options);

  if (res.ok) {
    return await res.json() as T;
  } else {
    throw new Error(res.statusText);
  }
};

export default request;