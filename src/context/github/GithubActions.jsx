import axios from "axios";
// const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
// const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_KEY;
const GITHUB_TOKEN = "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";
const GITHUB_URL = "https://api.github.com";

const github = axios.create({
  baseURL: GITHUB_URL,
  // headers: {
  //   Authorization: `token ${GITHUB_TOKEN}`,
  // },
});

// search users
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

// get user and all his repos repos
export const getUserAndRepos = async (id) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${id}`),
    github.get(`/users/${id}/repos`),
  ]);
  return {
    user: user.data,
    repos: repos.data,
  };
};
