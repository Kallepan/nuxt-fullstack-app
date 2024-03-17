import { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  setCookie(event, "auth_token", "");
});
