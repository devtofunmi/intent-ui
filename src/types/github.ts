export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
}

export interface GitHubContextType {
  isConnected: boolean;
  user: GitHubUser | null;
  token: string | null;
  connect: () => void;
  setAccessToken: (token: string) => void;
  disconnect: () => void;
}
