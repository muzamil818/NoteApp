import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { FaEdit } from "react-icons/fa";
import { TbPinned } from "react-icons/tb";
import EditModelNote from "../components/EditModelNote";
import { FiDelete } from "react-icons/fi";
interface notes {
  _id: string;
  title: string;
  content: string;
  pinned: boolean;
}

const Notes = () => {
  const [notes, setNotes] = useState<notes[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setcontent] = useState<string>("");
  const [editNote, setEditNote] = useState<notes | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URI}/note`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(res.data);
      } catch (err) {
        console.error(`Error: ${err}`);
      }
    };
    fetchNotes();
  }, [navigate]);

  const handelNote = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add a note");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URI}/note`,
        { title, content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes((pre) => [...pre, res.data]);
      setTitle("");
      setcontent("");
    } catch (err) {
      alert(`Server error ${err}`);
    }
  };

  const handelDelte = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to Delete the note");

    try {
      await axios.delete(`${import.meta.env.VITE_API_URI}/note/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((pre) => pre.filter((i) => i._id !== id));
    } catch (err) {
      console.error(`DELETE api/note/delete`, err);
      alert(`failed to delete the note: ${err} `);
    }
  };
  const handleEdit = (update: notes) => {
    setNotes((pre) => pre.map((n) => (n._id == update._id ? update : n)));
  };

  const handleToggle = async (id: string, currentPinned: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You are not Authorized! ");

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URI}/note/${id}`,
        { pinned: !currentPinned },
        {
          headers: {
            Authorization: `Bearer  ${token}`,
          },
        }
      );

      setNotes((prev) =>
        prev.map((n) => (n._id === id ? { ...n, pinned: res.data.pinned } : n))
      );
    } catch (err) {
      console.error(`put api/note/pinned it is causing an error ${err}`);
    }
  };
  return (
    <div className="">
      <div className="flex items-center justify-center mt-16">
        <form className="border rounded" onSubmit={handelNote}>
          <div className="*:placeholder:text-[15px] *:text-gray-700 w-[400px] h-[350px] bg-white rounded border-black shadow flex flex-col p-7 gap-6 ">
            <h1 className="text-center text-3xl"> Notes</h1>

            <input
              className="outline-1 px-2 py-4"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="outline-1 px-2"
              name="content"
              id=""
              value={content}
              placeholder="Note content"
              onChange={(e) => setcontent(e.target.value)}
            />

            <div className=" flex items-center justify-center w-full">
              <button
                type="submit"
                className="relative z-1 flex h-[30px] w-[100px] items-center justify-center whitespace-nowrap rounded-[10px] border-none bg-transparent px-5 py-5 text-[16px] text-[#f0f0f0] outline-none select-none cursor-pointer 
  before:content-[''] before:absolute before:bottom-0 before:right-0 before:h-full before:w-full before:rounded-[10px] before:bg-[#28282d] before:transition-all before:duration-400 before:-z-99999
  after:content-[''] after:absolute after:bottom-0 after:right-0 after:h-[35px] after:w-[35px] after:translate-x-2.5 after:translate-y-2.5 after:rounded-[50px] after:bg-[#ffffff15] after:backdrop-blur-[5px] after:transition-all after:duration-400 after:-z-99999
  hover:before:translate-x-[5%] hover:before:translate-y-[20%] hover:before:h-[110%] hover:before:w-[110%]
  hover:after:translate-x-0 hover:after:translate-y-0 hover:after:h-full hover:after:w-full hover:after:rounded-[10px]
  active:after:translate-y-[5%] active:after:transition-none"
              >
                Add Note
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* bg-[#758A93] */}
      <div className="  w-full h-screen  pt-10 bg-gray-600 ">
        <div className="items justify-center ml-3 flex flex-wrap gap-3  p-16 ">
          {notes.map((note) => (
            <div
             
              className="w-[300px] h-[200px] bg-[#112d3d] relative rounded shadow"
              key={note._id}
            >
              <TbPinned
                className=" absolute left-0 -top-3 text-[#969900] cursor-pointer transition-all text-2xl "
                onClick={() => handleToggle(note._id, note.pinned)}
              />
              {/* <FaEdit
                className=" absolute right-7 text-[#54aad1] cursor-pointer transition-all text-2xl"
                onClick={() => setEditNote(note)}
              /> */}
              <FiDelete  className="absolute cursor-pointer right-0 text-[#a33f29] text-2xl" onClick={() => handelDelte(note._id)}/>
              <h1 className="text-2xl p-3 text-white">{note.title}</h1>
              <p className="text-white p-3">{note.content}</p>

              <div className=" mt-3 m-3 items-center justify-center ">
                <button
                  className="relative z-1 flex h-[30px] w-[100px] items-center justify-center whitespace-nowrap rounded-[10px] border-none bg-transparent px-5 py-5 text-[16px] text-[#f0f0f0] outline-none select-none cursor-pointer 
  before:content-[''] before:absolute before:bottom-0 before:right-0 before:h-full before:w-full before:rounded-[10px] before:bg-[#28282d] before:transition-all before:duration-400 before:-z-99999
  after:content-[''] after:absolute after:bottom-0 after:right-0 after:h-[35px] after:w-[35px] after:translate-x-2.5 after:translate-y-2.5 after:rounded-[50px] after:bg-[#ffffff15] after:backdrop-blur-[5px] after:transition-all after:duration-400 after:-z-99999
  hover:before:translate-x-[5%] hover:before:translate-y-[20%] hover:before:h-[110%] hover:before:w-[110%]
  hover:after:translate-x-0 hover:after:translate-y-0 hover:after:h-full hover:after:w-full hover:after:rounded-[10px]
  active:after:translate-y-[5%] active:after:transition-none"
                 onClick={() => setEditNote(note)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editNote && (
        <EditModelNote
          note={editNote}
          onUpdate={() => handleEdit}
          onClose={() => setEditNote(null)}
        />
      )}
    </div>
  );
};

export default Notes;
