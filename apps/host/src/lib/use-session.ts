import { Auth } from "aws-amplify";
import useSWR from "swr";
export default function useSession() {
  const { data: session } = useSWR("session", async () => {
    try {
      const data = await Auth.currentAuthenticatedUser({
        bypassCache: false,
      });
      return data.attributes;
    } catch {
      return null;
    }
  });

  return session;
}
