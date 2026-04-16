import { useNavigate } from "react-router-dom";
import type { GitHubUser } from "../types/User";
import styles from "./UserCard.module.css";

interface UserCardProps {
  user: GitHubUser;
  onDelete: (login: string) => void;
}

export const UserCard = ({ user, onDelete }: UserCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{user.name || user.login}</h2>
      <img src={user.avatar_url} alt={user.login} width="120" className={styles.avatar} />

      {user.bio && <p className={styles.bio}>{user.bio}</p>}
      {user.company && <p className={styles.info}>🏢 {user.company}</p>}
      {user.location && <p className={styles.info}>📍 {user.location}</p>}
      {user.email && <p className={styles.info}>✉️ {user.email}</p>}

      {/* Соціальні посилання */}
      {user.blog && (
        <a href={user.blog} target="_blank" rel="noreferrer" className={styles.link}>
          🌐 {user.blog}
        </a>
      )}
      {user.linkedin && (
        <a href={`https://linkedin.com/in/${user.linkedin}`} target="_blank" rel="noreferrer" className={styles.link}>
          🔗 LinkedIn
        </a>
      )}
      {user.medium && (
        <a href={`https://medium.com/@${user.medium}`} target="_blank" rel="noreferrer" className={styles.link}>
          ✍️ Medium
        </a>
      )}
      {user.twitter_username && (
        <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noreferrer" className={styles.linkMedia}>
          🐦 @{user.twitter_username}
        </a>
      )}

      <p className={styles.stats}>
        Followers: {user.followers} | Following: {user.following} | Public repos: {user.public_repos}
      </p>
      <p className={styles.meta}>
        Joined: {new Date(user.created_at).toLocaleDateString()} | Last active:{" "}
        {new Date(user.updated_at).toLocaleDateString()}
      </p>

      <div className={styles.actions}>
      <button onClick={() => navigate(`/repos/${user.login}`)} className={styles.button}>
          View Repositories
        </button>
        <a href={user.html_url} target="_blank" rel="noreferrer" className={styles.link}>
          View Profile
        </a>
      
      </div>

      <button onClick={() => onDelete(user.login)} className={styles.deleteButton}>✖</button>
    </div>
  );
};
