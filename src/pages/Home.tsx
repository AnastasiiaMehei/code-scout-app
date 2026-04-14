import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import cardImg from "../assets/cardImg.png";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { setQuery, addUser, deleteUser } from "../store/userSlice";
import { UserCard } from "../components/UserCard";
import "../App.css";
import styles from "./Home.module.css";
export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, users } = useSelector((state: RootState) => state.user);

  const searchUser = async () => {
    if (query.trim() === "") return;
    try {
      const response = await axios.get(`https://api.github.com/users/${query}`);
      dispatch(addUser(response.data));
      dispatch(setQuery(""));
    } catch {
      toast.error("User not found 🚀");
    }
  };

  return (
    <div className="app-wrapper">
      <section className={styles.searchSection}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={query}
          className="input-field"
          onChange={(e) => dispatch(setQuery(e.target.value))}
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
        <UserCard key={user.login} user={user} onDelete={() => dispatch(deleteUser(user.login))} />
      ))}
    </div>
  )}
  <ToastContainer aria-label="Toast container" />
</main>

    </div>
  );
};
