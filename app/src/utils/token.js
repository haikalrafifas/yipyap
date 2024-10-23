export const isAuthenticated = () => {
  return getToken() ? true : false;
};

export const decodeToken = () => {
  const token = getToken();

  if (!token) return null;

  try {
    // Split the token into its parts
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token structure');
    }

    // Decode the payload part (second part)
    const payload = parts[1];
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};
