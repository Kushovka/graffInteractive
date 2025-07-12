import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCommentsByPostId, fetchPostById } from "../services/api";
import Loader from "../components/Loader";
import type { Post } from "../types";
import { motion } from "framer-motion";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      if (id) {
        const postData = await fetchPostById(+id);
        const commentData = await fetchCommentsByPostId(+id);
        setPost(postData);
        setComments(commentData);
      }
      setIsLoading(false);
    };
    load();
  }, [id]);

  if (isLoading || !post) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-grey02 hover:text-white transition-colors duration-300 text-xl"
      >
        Назад
      </button>

      <motion.div
        className="w-1/2 pb-[50px]"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
      >
        <h2 className="text-xl text-white font-semibold mb-2">{post.title}</h2>
        <p className="mb-4 text-grey02">{post.body}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
      >
        <h3 className="text-white font-semibold mb-2 text-center">
          Комментарии
        </h3>
        <ul className="flex flex-col items-center justify-center space-y-5">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="border p-2 rounded-[10px] lg:w-1/2 w-full"
            >
              <p className="font-semibold text-white/80">
                {comment.name} ({comment.email})
              </p>
              <p className="text-grey02">{comment.body}</p>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default PostPage;
