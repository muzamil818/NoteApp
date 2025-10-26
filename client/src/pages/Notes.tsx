import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface notes{
  _id: string;
  title: string;
  content: string;
};

const Notes = () => {
  const [notes, setNotes] = useState<notes[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setcontent] = useState<string>("");
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

  const handelDelte = async (id:string) => {
      const token = localStorage.getItem("token");
      if(!token) return alert("Please login to Delete the note")

      try{

        await axios.delete(`${import.meta.env.VITE_API_URI}/note/${id}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        setNotes((pre)=> pre.filter((i)=> i._id !== id))

      }catch(err){
        console.error(`DELETE api/note/delete`, err);
        alert(`failed to delete the note: ${err} `)
      }
  }
  return (
    <div className="">
    <div className="flex items-center justify-center mt-16">
      <form onSubmit={handelNote}>
        <div className="*:placeholder:text-[15px] *:text-gray-700 w-[400px] h-[300px] bg-white rounded shadow flex flex-col p-7 gap-6 ">
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
              className="rounded px-6 py-2 cursor-pointer shadow bg-sky-200"
            >
              Add Note
            </button>
          </div>
        </div>
      </form>

    </div>
    <div className="w-full h-screen bg-[#758A93] pt-10 ">

    <div className="ml-3 flex gap-3 ">
      {notes.map((note) => (
        <div  className="w-[300px] h-[300px] bg-gray-800 rounded shadow"  key={note._id}>
          <h1 className="text-2xl text-center text-white">{note.title}</h1>
          <p className="text-white p-3">{note.content}</p>

          <div className=" mt-3 m-3 items-center justify-center ">
          <button className="bg-red-400 py-2 px-6 rounded text-center " onClick={()=>handelDelte(note._id)}>Delete</button>
          </div>
        </div>
      ))}
      </div>
          </div>
    </div>
    
  );
};

export default Notes;
