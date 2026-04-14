import type { RepoProps } from "../types/Repo";
import styles from "./RepoCard.module.css";

export const RepoCard = ({
  name,
  language,
  forks_count,
  stargazers_count,
  html_url,
}: RepoProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.stats}>Language: {language || "N/A"}</p>
      <p className={styles.stats}>
        ⭐ Stars: {stargazers_count} | 🍴 Forks: {forks_count}
      </p>
      <div className={styles.actions}>
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Open on GitHub
        </a>
      </div>
    </div>
  );
};
