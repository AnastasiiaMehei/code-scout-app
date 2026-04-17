import cardImg from "../assets/cardImg.png";
import { ToastContainer } from "react-toastify";
import { UserCard } from "../components/UserCard";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import styles from "./Home.module.css";
import { useSearchUser } from "../hooks/useSearchUser";
import { useDispatch } from "react-redux";
import { setLastVisitedPage } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { query, users, searchUser, updateQuery, removeUser } = useSearchUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="app-wrapper">
      <section className={styles.searchSection}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={query}
          className="input-field"
          onChange={(e) => updateQuery(e.target.value)}
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
              <UserCard
                key={user.login}
                user={user}
                onDelete={() => removeUser(user.login)}
                onViewProfile={() => {
                  dispatch(setLastVisitedPage("/"));
                  navigate(`/profile/${user.login}`);
                }}
              />
            ))}
          </div>
        )}
      </main>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
