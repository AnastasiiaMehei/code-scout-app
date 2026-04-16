import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Repos.module.css";
import { RepoCard } from "../components/RepoCard";
import { Modal } from "../components/Modal";
import type { RepoProps } from "../types/Repo";

export const Repos = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [repos, setRepos] = useState<RepoProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [langStats, setLangStats] = useState<{ lang: string; percent: string }[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get<RepoProps[]>(
          `https://api.github.com/users/${username}/repos`
        );
        setRepos(response.data);
      } catch {
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [username]);

  const fetchLanguages = async (repoName: string) => {
    try {
      const response = await axios.get<Record<string, number>>(
        `https://api.github.com/repos/${username}/${repoName}/languages`
      );
      const data = response.data;

      const total = Object.values(data).reduce((a, b) => a + b, 0);

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

  return (
    <section style={{ color: "#fff", textAlign: "center" }}>
      <h2 className="cosmicTitle">Repositories of {username}</h2>

      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ⬅ Back
      </button>

      {loading ? (
        <p>Loading repositories...</p>
      ) : repos.length === 0 ? (
        <p>
          No repositories found.{" "}
          <a href="https://github.com/new" target="_blank" rel="noreferrer">
            Create one
          </a>
        </p>
      ) : (
        <div className={styles.repoList}>
          {repos.map((repo) => (
            <RepoCard
              key={repo.id}
              {...repo}
              onShowStats={() => fetchLanguages(repo.name)}
            />
          ))}
        </div>
      )}

      {showModal && selectedRepo && (
        <Modal
          title={`Language stats for ${selectedRepo}`}
          stats={langStats}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
};
