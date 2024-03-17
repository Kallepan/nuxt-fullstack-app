import { getUserBySessionToken } from "~/server/database/services/sessionService";

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, "auth_token");
  if (!authToken) {
    return null;
  }

  return await getUserBySessionToken(authToken);
});
