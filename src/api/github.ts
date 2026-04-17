import axios from "axios";
import type { GitHubUser } from "../types/User";
import type { RepoProps } from "../types/Repo";

const BASE_URL = "https://api.github.com";

export const getUser = async (username: string): Promise<GitHubUser> => {
  const response = await axios.get(`${BASE_URL}/users/${username}`);
  return response.data;
};

export const getUserRepos = async (username: string): Promise<RepoProps[]> => {
  const response = await axios.get(`${BASE_URL}/users/${username}/repos`);
  return response.data;
};

export const getRepoReadme = async (username: string): Promise<string> => {
  const response = await axios.get(`${BASE_URL}/repos/${username}/${username}/readme`);
  return response.data.content;
};

export const getRepoLanguages = async (
    username: string,
    repo: string
  ): Promise<Record<string, number>> => {
    const response = await axios.get<Record<string, number>>(
      `${BASE_URL}/repos/${username}/${repo}/languages`
    );
    return response.data;
  };
  