

export const request = async <T>(host: string, endpoint: string, options: RequestInit) => {
  const res = await fetch(host + endpoint, options);

  if (res.ok) {
    return await res.json() as T;
  } else {
    throw new Error(res.statusText);
  }
};

export default request;