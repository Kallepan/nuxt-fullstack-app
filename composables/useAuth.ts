import type { NavigationFailure } from "vue-router";
import type { FormValidation } from "~/types/FormValidation";
import type { IUser } from "~/types/IUser";
import type { InputValidation } from "~/types/InputValidation";
import type { ISession } from "~~/types/ISession";

export const useAuthCookie = () => useCookie("auth_token");

export async function useUser(): Promise<IUser> {
  const authCookie = useAuthCookie().value;
  const user = useState<IUser>("user");

  if (!(authCookie || !user.value)) {
    return user.value;
  }

  return useFetch<IUser>(`/api/auth/getByAuthToken`, {
    headers: useRequestHeaders(["cookie"]),
  })
    .then((res) => res.data)
    .then((res) => {
      if (res.value) {
        user.value = res.value;
      }
      return user.value;
    })
    .catch((e) => {
      console.error(e);
      return user.value;
    });
}

export async function userLogout(): Promise<void | NavigationFailure | undefined> {
  return useFetch("/api/auth/logout")
    .then(() => {
      useState("user").value = null;
    })
    .then(() => useRouter().push("/"));
}

export async function registerWithEmail(username: string, name: string, email: string, password: string): Promise<FormValidation> {
  return useFetch<ISession>("/api/auth/register", {
    method: "POST",
    body: { data: { username, name, email, password } },
  })
    .then(async ({ data, error }) => {
      if (error) {
        type ErrorData = {
          data: ErrorData;
        };

        const errorData = error.value as unknown as ErrorData;
        const errors = errorData.data.data as unknown as string;
        const parsedError = JSON.parse(errors);
        const errorMap = new Map<string, { check: InputValidation }>(Object.entries(parsedError));

        return { hasErrors: true, errors: errorMap };
      }

      if (data) {
        useState("user").value = data;
        await useRouter().push("/dashboard");
      }

      return { hasErrors: false };
    })
    .catch((e) => {
      console.error(e);
      return { hasErrors: true };
    });
}

export async function loginWithEmail(email: string, password: string) {
  const user = await $fetch<IUser>("/api/auth/login", {
    method: "POST",
    body: { email: email, password: password },
  });
  useState("user").value = user;
  await useRouter().push("/dashboard");
}
