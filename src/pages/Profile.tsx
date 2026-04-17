import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import styles from "./Profile.module.css";
import { useGitHubUser } from "../hooks/useGitHubUser";
import { useReadme } from "../hooks/useReadme";
import { RotatingLines } from "react-loader-spinner";
import { FaArrowLeft } from "react-icons/fa6";


export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const { user, loading } = useGitHubUser(username || "");

  const { readme, loading: readmeLoading } = useReadme(username || "");

  if (loading) {
    return (
      <div className={styles.spinnerWrapper}>
        <RotatingLines
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={true}
        />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) return <p>User not found</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.cosmicTitle}>{user.name || user.login}</h1>
      <img
        src={user.avatar_url}
        alt={user.login}
        width="150"
        className={styles.avatar}
      />
      {user.bio && <p>{user.bio}</p>}
      <p className={styles.stats}>
        Followers: {user.followers} | Public repos: {user.public_repos}
      </p>

      <h2 className={styles.cosmicTitle}>README.md</h2>
      {readmeLoading ? (
        <div className={styles.spinnerWrapper}>
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={true}
          />
          <p>Loading README...</p>
        </div>
      ) : (
        <div className={styles.readmeContainer}>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {readme}
          </ReactMarkdown>
        </div>
      )}

      <button onClick={() => navigate(-1)} className={styles.backButton}>
      <FaArrowLeft /> Back
      </button>
    </div>
  );
}
