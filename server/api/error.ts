export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (query.error) {
    setResponseStatus(event, 500);
    return {
      error: "This is a test error",
      requestedAt: Date.now(),
    };
  }
  setResponseStatus(event, 200);
  return {
    message: "This is a successful test response",
    requestedAt: Date.now(),
  };
});
