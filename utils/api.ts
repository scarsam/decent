async function api(
  path: string,
  body: { [key: string]: string },
): Promise<any> {
  try {
    const response: any = await fetch(path, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok)
      throw Error(
        response?._bodyText ? response?._bodyText : response.statusText,
      );
    const json = await response.json();

    return json;
  } catch (err) {
    const error = err?.message
      ? err
      : new Error("Something bad happened, try again later");
    throw error;
  }
}

export default api;
