// src/types/User.ts

export interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    bio?: string;
    followers: number;
    following: number;
  }
  