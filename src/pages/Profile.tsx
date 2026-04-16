import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { GitHubUser } from "../types/User";
import styles from "./Profile.module.css";

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [readme, setReadme] = useState<string>("");

  // правильне декодування Base64 → UTF-8
  const decodeBase64 = (str: string) => {
    const bytes = Uint8Array.from(atob(str), c => c.charCodeAt(0));
    return new TextDecoder("utf-8").decode(bytes);
  };

  useEffect(() => {
    if (!username) return;

    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(data => setUser(data));

    fetch(`https://api.github.com/repos/${username}/${username}/readme`)
      .then(res => res.json())
      .then(data => {
        if (data.content) {
          setReadme(decodeBase64(data.content));
        }
      });
  }, [username]);

  if (!user) return <p>Loading...</p>;

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
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{readme}</ReactMarkdown>
      </div>

      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ⬅ Back
      </button>
    </div>
  );
}
