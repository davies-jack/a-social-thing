export const get = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  return response.json();
};

export const post = async (url: string, options?: RequestInit) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  let formattedUrl = url;
  if (url.startsWith("/")) {
    formattedUrl = `${apiUrl}${url}`;
  }
  try {
    const response = await fetch(formattedUrl, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
