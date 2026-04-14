import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Repos.module.css";
import { RepoCard } from "../components/RepoCard";
import type { RepoProps } from "../types/Repo";

export const Repos = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [repos, setRepos] = useState<RepoProps[]>([]);
  const [loading, setLoading] = useState(true);

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
            <RepoCard key={repo.id} {...repo} />
          ))}
        </div>
      )}
    </section>
  );
};
