export default defineEventHandler(async (event) => {
  const duration = Number(event.context.params?.duration ?? 1000);
  await new Promise((resolve) => setTimeout(resolve, duration));
  return `Waited for ${duration}ms`;
});
