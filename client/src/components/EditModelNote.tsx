import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface EditProps {
  note: {
    _id: string;
    title: string;
    content: string;
  
  };
  onClose: () => void;
  onUpdate: (updateNote: { _id: string; title: string; content: string}) => void;
}

const EditModelNote: React.FC<EditProps> = ({ note, onClose, onUpdate,  }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to edit the note.");

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URI}/note/${note._id}`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onUpdate({ _id: note._id, title, content });
      onClose();
    } catch (err) {
      alert("Problem saving edit: " + err);
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          key="modal"
          className="bg-white/10 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-8 w-[400px] text-white"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1], // Smooth cubic easing
          }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Edit Note</h2>

          <input
            className="w-full bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-md p-2 outline-none focus:ring-2 focus:ring-sky-400 transition mb-3"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-md p-2 outline-none focus:ring-2 focus:ring-sky-400 transition mb-4"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex justify-between mt-4">
            <button
              className="bg-sky-500/80 hover:bg-sky-500 text-white px-4 py-2 rounded-md transition"
              onClick={handleSave}
            >
              Save
            </button>

            <button
              className="bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditModelNote;
