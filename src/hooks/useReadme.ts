import { useEffect, useState } from "react";
import { getRepoReadme } from "../api/github";
import { decodeBase64 } from "../utils/decodeBase64";

export const useReadme = (username: string | undefined) => {
  const [readme, setReadme] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchReadme = async () => {
      try {
        setLoading(true);
        const content = await getRepoReadme(username);
        if (content) {
          setReadme(decodeBase64(content));
        }
      } catch {
        setReadme("");
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, [username]);

  return { readme, loading };
};
