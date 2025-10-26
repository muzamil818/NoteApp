import Nav from "./components/Nav"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Notes from "./pages/Notes"

const App = () => {
  return (
    <div className="w-full h-screen bg-[#758A93]">
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path="/" element={<Notes/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App