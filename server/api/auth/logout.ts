export default defineEventHandler(async (event) => {
  setCookie(event, "auth_token", "");
});
