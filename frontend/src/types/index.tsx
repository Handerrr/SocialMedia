export type User = {
  id: number;
  username: string;
  profile_pic: string;
};

export type Comment = {
  id: number;
  content: string;
  created_at: string;
  user: User;
  parent: number | null;
  likes_count: number;
};

export type Post = {
  id: number;
  content: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  author: {
    id: number;
    username: string;
    profile_pic: string;
  };
};

export type ProfileUser = {
  id: number;
  username: string;
  bio: string;
  profile_pic: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  followers: User[];
  following: User[];
  is_following: boolean;
};
