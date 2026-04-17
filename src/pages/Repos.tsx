import { useParams, useNavigate } from "react-router-dom";
import styles from "./Repos.module.css";
import { RepoCard } from "../components/RepoCard";
import { Modal } from "../components/Modal";
import { useRepos } from "../hooks/useRepos";
import { useLanguages } from "../hooks/useLanguages";

export const Repos = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { repos, loading } = useRepos(username);
  const { langStats, selectedRepo, showModal, setShowModal, fetchLanguages } = useLanguages(username);

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
