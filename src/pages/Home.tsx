import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import cardImg from "../assets/cardImg.png";
import { UserCard } from "../components/UserCard";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import styles from "./Home.module.css";
import type { GitHubUser } from "../types/User";

export const Home = () => {
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
          toast.info("User already in list ✨");
          return [exists, ...prev.filter((u) => u.login !== foundUser.login)];
        } else {
          return [foundUser, ...prev];
        }
      });
      setQuery("");
    } catch {
      toast.error("User not found 🚀");
    }
  };

  const deleteUser = (login: string) => {
    setUsers((prev) => prev.filter((u) => u.login !== login));
  };

  return (
    <div className="app-wrapper">
      <section className={styles.searchSection}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field"
        />
        <button onClick={searchUser} className="search-button">Search</button>
      </section>

      <main className={users.length === 0 ? "main-content no-scroll" : "main-content scroll"}>
        {users.length === 0 && (
          <img src={cardImg} alt="Card background" className="fade-image" />
        )}
        {users.length > 0 && (
          <div className={styles.userList}>
            {users.map((user) => (
              <UserCard key={user.login} user={user} onDelete={deleteUser} />
            ))}
          </div>
        )}
        <ToastContainer aria-label="Toast container" />
      </main>
    </div>
  );
};
