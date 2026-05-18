import { useCookies as useClientCookies } from "next-client-cookies";

export const useCookies = () => {
  const clientCookies = useClientCookies();

  const get = (key: string): string | undefined => {
    return clientCookies.get(key);
  };

  const set = (
    key: string,
    value: string,
    options?: {
      path?: string;
      expires?: Date;
      domain?: string;
      secure?: boolean;
      sameSite?: "strict" | "lax" | "none";
    }
  ) => {
    clientCookies.set(key, value, options);
  };

  const remove = (key: string, options?: { path?: string }) => {
    clientCookies.remove(key, options);
  };

  return { get, set, remove };
};
