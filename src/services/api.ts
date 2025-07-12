import axios from "axios";
import type { Post } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get(`${API_URL}/posts`);
  return data;
};

export const fetchCommentsByPostId = async (
  postId: number
): Promise<Comment[]> => {
  const { data } = await axios.get(`${API_URL}/posts/${postId}/comments`);
  return data;
};

export const fetchPostById = async (postId: number): Promise<Post> => {
  const { data } = await axios.get(`${API_URL}/posts/${postId}`);
  return data;
};
