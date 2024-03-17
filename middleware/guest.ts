import { useUser } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (_) => {
  const user = await useUser();
  const popupStore = useState("popup");

  if (user !== null && user !== undefined) {
    popupStore.value = {
      display: true,
      message: "You are already logged in!",
    };

    // cleanup
    setTimeout(() => {
      popupStore.value = { display: false, message: "" };
    }, 5000);
    return "/";
  }
});
