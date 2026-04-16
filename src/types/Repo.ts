// src/types/Repo.ts
export interface RepoProps {
  id: number;
  name: string;
  description?: string;       
  language: string | null;     
  forks_count: number;        
  stargazers_count: number;    
  watchers_count: number;      
  open_issues_count: number;   
  license?: { name: string };  
  updated_at: string;         
  html_url: string;    
  onShowStats: () => void;     
}
