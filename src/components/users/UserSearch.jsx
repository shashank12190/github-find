import React, { useState, useContext } from "react";
import { AlertContext } from "../../context/alert/AlertContext";
import { searchUsers } from "../../context/github/GithubActions";
import { GitHubContext } from "../../context/github/GithubContext";

const UserSearch = () => {
  const { users, dispatch } = useContext(GitHubContext);
  const { setAlert } = useContext(AlertContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "error");
    } else {
      dispatch({ type: "SET_LOADING" });
      const users = await searchUsers(text);
      dispatch({ type: "GET_USERS", payload: users });
      setText("");
    }
  };
  const [text, setText] = useState("");
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form className="form-control" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              className="w-full pr-40 bg-gray-200 input input-lg text-black"
              placeholder="Search"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button
              type="submit"
              className="absolute top-0 right-0 btn btn-lg w-36 rounded-l-none"
            >
              GO
            </button>
          </div>
        </form>
      </div>
      <div>
        {users.length > 0 && (
          <button
            className="btn btn-ghost btn-lg"
            onClick={() => dispatch({ type: "CLEAR_USERS" })}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
