import { useUser } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (_) => {
  const user = await useUser();

  if (user !== null && user !== undefined) {
    return "/";
  }
});
