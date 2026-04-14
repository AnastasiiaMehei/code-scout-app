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
      <h2 className={styles.title}>{user.login}</h2>
      <img src={user.avatar_url} alt={user.login} width="120" className={styles.avatar} />
      <p className={styles.bio}>{user.bio}</p>
      <p className={styles.stats}>Followers: {user.followers} | Following: {user.following}</p>

      <div className={styles.actions}>
        <a href={user.html_url} target="_blank" rel="noreferrer" className={styles.link}>
          View Profile
        </a>
        <button onClick={() => navigate(`/repos/${user.login}`)} className={styles.button}>
          View Repositories
        </button>
      </div>

      <button onClick={() => onDelete(user.login)} className={styles.deleteButton}>✖</button>
    </div>
  );
};
