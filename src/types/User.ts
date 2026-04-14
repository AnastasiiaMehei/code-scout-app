export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;

  name?: string;
  bio?: string;
  company?: string;
  location?: string;
  email?: string;
  blog?: string;
  twitter_username?: string;
  

  linkedin?: string;
  medium?: string;

  followers: number;
  following: number;
  public_repos: number;

  created_at: string;
  updated_at: string;
  
}
