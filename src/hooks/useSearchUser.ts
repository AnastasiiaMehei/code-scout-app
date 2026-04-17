import { useDispatch, useSelector } from "react-redux";
import { setQuery, addUser, deleteUser } from "../store/userSlice";
import type { RootState, AppDispatch } from "../store";
import { getUser } from "../api/github";
import { toast } from "react-toastify";

export const useSearchUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, users } = useSelector((state: RootState) => state.user);

  const searchUser = async () => {
    if (query.trim() === "") {
      toast.warn("Please enter a username 🚀");
      return;
    }
    try {
      const data = await getUser(query);
      dispatch(addUser(data));
      dispatch(setQuery(""));
      toast.success(`User ${data.login} found 🚀`);
    } catch (error) {
      console.error(error);
      toast.error("User not found 🚀");
    }
  };

  const updateQuery = (value: string) => dispatch(setQuery(value));
  const removeUser = (login: string) => dispatch(deleteUser(login));

  return { query, users, searchUser, updateQuery, removeUser };
};
