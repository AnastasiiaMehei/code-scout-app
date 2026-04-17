import { useState } from "react";
import { getRepoLanguages } from "../api/github";

export const useLanguages = (username: string | undefined) => {
  const [langStats, setLangStats] = useState<{ lang: string; percent: string }[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchLanguages = async (repoName: string) => {
    if (!username) return;
    try {
      const data = await getRepoLanguages(username, repoName);

      const total = Object.values(data).reduce((a: number, b: number) => a + b, 0);

      const percentages = Object.entries(data).map(([lang, bytes]) => ({
        lang,
        percent: ((bytes / total) * 100).toFixed(2),
      }));

      setLangStats(percentages);
      setSelectedRepo(repoName);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  return { langStats, selectedRepo, showModal, setShowModal, fetchLanguages };
};
