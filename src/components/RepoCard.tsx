import type { RepoProps } from "../types/Repo";
import { FaStar, FaCodeBranch, FaEye, FaExclamationCircle } from "react-icons/fa";
import styles from "./RepoCard.module.css";

export const RepoCard = ({
  name,
  description,
  language,
  forks_count,
  stargazers_count,
  open_issues_count,
  watchers_count,
  license,
  updated_at,
  html_url,
  onShowStats,
}: RepoProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{name}</h3>
      {description && <p className={styles.description}>{description}</p>}
      <p className={styles.stats}>Language: {language || "N/A"}</p>
      <p className={styles.stats}>
  <FaStar /> Stars: {stargazers_count} | <FaCodeBranch /> Forks: {forks_count} | <FaEye /> Watchers: {watchers_count}
</p>
<p className={styles.stats}>
  <FaExclamationCircle /> Issues: {open_issues_count}
</p>

      {license && <p className={styles.stats}>License: {license.name}</p>}
      <p className={styles.meta}>Last updated: {new Date(updated_at).toLocaleDateString()}</p>

      <div className={styles.actions}>
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Open on GitHub
        </a>
        <button onClick={onShowStats} className={styles.link}>
  Show Language Stats
</button>
      </div>
    </div>
  );
};
