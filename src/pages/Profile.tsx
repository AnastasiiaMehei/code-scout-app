import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import styles from "./Profile.module.css";
import { useGitHubUser } from "../hooks/useGitHubUser";
import { useReadme } from "../hooks/useReadme";

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { user, loading: userLoading } = useGitHubUser(username || "");
  const { readme, loading: readmeLoading } = useReadme(username);

  if (userLoading) return <p>Loading user...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.cosmicTitle}>{user.name || user.login}</h1>
      <img src={user.avatar_url} alt={user.login} width="150" className={styles.avatar} />
      {user.bio && <p>{user.bio}</p>}
      <p className={styles.stats}>
        Followers: {user.followers} | Public repos: {user.public_repos}
      </p>

      <h2 className={styles.cosmicTitle}>README.md</h2>
      <div className={styles.readmeContainer}>
        {readmeLoading ? <p>Loading README...</p> : <ReactMarkdown rehypePlugins={[rehypeRaw]}>{readme}</ReactMarkdown>}
      </div>

      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ⬅ Back
      </button>
    </div>
  );
}
