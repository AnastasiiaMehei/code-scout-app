import { useEffect, useState } from "react";
import { getUser } from "../api/github";
import type { GitHubUser } from "../types/User";

export const useGitHubUser = (username: string) => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      try {
        setLoading(true); 
        const data = await getUser(username);
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  return { user, loading };
};
