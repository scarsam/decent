async function api(
  path: string,
  body: { [key: string]: string },
): Promise<any> {
  try {
    const response = { body: "stub", ok: 200, message: "" };

    if (!response?.ok) {
      throw new Error(response?.message);
    }

    return response;
  } catch (err) {
    const error = err.message
      ? err
      : new Error("Something bad happened, try again later");
    throw error;
  }
}

export default api;
