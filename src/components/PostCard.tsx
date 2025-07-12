import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import type { Post, Comment } from "../types";
import { fetchCommentsByPostId } from "../services/api";
import CommentsModal from "./CommentsModal";
import { SlMagnifier } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { motion } from "framer-motion";

interface Props {
  post: Post;
  index: number;
}

const PostCard: FC<Props> = ({ post, index }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const openInNewTab = () => {
    window.open(`/post/${post.id}`, "_blank");
  };

  const handleOpenComments = async () => {
    setIsLoading(true);
    const data = await fetchCommentsByPostId(post.id);
    setComments(data);
    setIsModalOpen(true);
    setIsLoading(false);
  };

  return (
    <motion.div
      key={index}
      className="flex flex-col justify-between xl:p-10 lg:p-8 md:p-6 p-4 border border-grey02/50 rounded shadow hover:shadow-md transition gap-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: [0.17, 0.67, 0.83, 0.67],
        delay: index * 0.05,
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <h3 className="font-semibold xl:text-[20px] lg:text-[18px] md:text-[16px] text-[12px] mb-2 text-center text-white">
          {post.title}
        </h3>
        <p className="xl:text-[18px] lg:text-[16px] md:text-[14px] text-[10px] mb-2 text-center text-grey02">
          {post.body}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2 border border-grey02 rounded-[10px] p-[8px] group cursor-pointer">
          <button
            onClick={() => navigate(`/post/${post.id}`)}
            className="text-grey02 hidden md:block group-hover:text-white transition-colors duration-300 xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px]"
          >
            Подробнее
          </button>
          <SlMagnifier className="xl:w-[24px] lg:w-[20px] md:w-[18px] w-[16px] text-grey02 group-hover:text-white transition-colors duration-300" />
        </div>
        <div className="flex items-center justify-center gap-2 border border-grey02 rounded-[10px] p-[8px] group cursor-pointer">
          <button
            onClick={handleOpenComments}
            className="text-grey02 group-hover:text-white transition-colors duration-300 xl:text-[20px] lg:text-[18px] md:text-[14px] text-[12px]  hidden md:block"
          >
            {isLoading ? "Загрузка..." : "Комментарии"}
          </button>
          <FaRegComment className="xl:w-[24px] lg:w-[20px] md:w-[18px] w-[16px] text-grey02 group-hover:text-white transition-colors duration-300" />
        </div>
      </div>

      <CommentsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        comments={comments}
      />
    </motion.div>
  );
};

export default PostCard;
