import { useState } from "react"
import axios from "axios"

interface editProps {
    note:{

        _id: string,
        title: string,
        content: string
    },
    onClose: () => void,
    onUpdate:(udateNote:{_id: string, title: string, content: string}) => void
}


const EditModelNote:React.FC<editProps> = ({note, onClose, onUpdate}) => {

    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)

    const handleSave = async () => {
        const token = localStorage.getItem("token")
        if(!token) return alert("please login to edit the note ")

        try{
                axios.put(`${import.meta.env.VITE_API_URI}/note/${note._id}`,
                    {title, content},{
                    headers:{
                        Authorization: `Beared ${token}`
                    }
                })

                onUpdate({_id: note._id, title, content})
                onClose()
        }catch(err){
                alert("save edit Problem: "+ err)
                
        }    
    }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Note</h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-3 rounded"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>

          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModelNote