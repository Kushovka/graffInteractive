import { motion } from "framer-motion";
import type { FC } from "react";

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

type CommentsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
};

const CommentsModal: FC<CommentsModalProps> = ({
  isOpen,
  onClose,
  comments,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-grey01 flex items-center justify-center p-3 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-grey01 rounded-l-xl max-w-md w-full border border-grey02 p-5 overflow-y-auto max-h-[80vh] custom-scroll"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-white font-semibold">Комментарии</h2>
          <button
            onClick={onClose}
            className="text-grey02 hover:text-white transition-colors duration-300"
          >
            ✖
          </button>
        </div>

        {comments.length === 0 ? (
          <p>Нет комментариев</p>
        ) : (
          <ul className="space-y-2">
            {comments.map((comment) => (
              <li key={comment.id} className="border p-2 rounded">
                <p className="font-semibold text-white md:text-[16px] text-[12px]">
                  {comment.name} ({comment.email})
                </p>
                <p className="text-grey02 md:text-[16px] text-[12px]">
                  {comment.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default CommentsModal;
