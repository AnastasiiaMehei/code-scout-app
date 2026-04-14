import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import cardImg from "./assets/cardImg.png";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

interface GitHubUser {
  login: string;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  html_url: string;
}

function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<GitHubUser[]>([]);

  const searchUser = async () => {
    if (query.trim() === "") return;

    try {
      const response = await axios.get<GitHubUser>(
        `https://api.github.com/users/${query}`
      );
      const foundUser = response.data;

      setUsers((prev) => {
        const exists = prev.find((u) => u.login === foundUser.login);
        if (exists) {
          toast.info("User already in list ✨", {
            toastId: "user-exists",
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
          });
          return [exists, ...prev.filter((u) => u.login !== foundUser.login)];
        } else {
          return [foundUser, ...prev];
        }
      });

      setQuery("");
    } catch {
      toast.error("User not found 🚀", {
        toastId: "user-not-found",
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const deleteUser = (login: string) => {
    setUsers((prev) => prev.filter((u) => u.login !== login));
  };

  return (
    <div className="app-wrapper">
      <header className="header">
        <p className="headerTitle">Code Scout App</p>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field"
        />
        <button onClick={searchUser} className="search-button">
          Search
          </button>
          </header>
          <main 
  className={users.length === 0 ? "main-content no-scroll" : "main-content scroll"}
>
  {users.length === 0 && (
    <img src={cardImg} alt="Card background" className="fade-image" />
  )}

  {users.length > 0 && (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.login} className="card">
          <h2>{user.login}</h2>
          <img
            src={user.avatar_url}
            alt={user.login}
            width="120"
            className="avatar"
          />
          <p>{user.bio}</p>
          <p>
            Followers: {user.followers} | Following: {user.following}
          </p>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="magic-link"
          >
            View Profile
          </a>
          <button
            onClick={() => deleteUser(user.login)}
            className="delete-button"
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  )}

  <ToastContainer aria-label="Toast container" />
</main>

      <footer className="footer">
        <div>
          <p>
            Made with ♡ by{" "}
            <a
              href="https://github.com/AnastasiiaMehei"
              target="_blank"
              rel="noreferrer"
            >
               Anastasiia Zlahodukh
            </a>
          </p>
          <p>All rights reserved © 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
