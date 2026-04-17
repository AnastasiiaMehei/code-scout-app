import { useEffect, useState } from "react";
import { getUserRepos } from "../api/github";
import type { RepoProps } from "../types/Repo";

export const useRepos = (username: string | undefined) => {
  const [repos, setRepos] = useState<RepoProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchRepos = async () => {
      try {
        setLoading(true); 
        const data = await getUserRepos(username);
        setRepos(data);
      } catch {
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  return { repos, loading };
};
