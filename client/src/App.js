import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Landing,Error,ProtectedRoute,Home,UploadBlog,Details,Users,CurrentUser,Chats} from  "./components/index.js"
import "./App.css"
import io from "socket.io-client"
let socket=io.connect("http://localhost:5000")




function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/Home" element={
            <ProtectedRoute>
                <Home/>
            </ProtectedRoute>
          }/>
          <Route path="*" element={<Error/>}/>
          <Route path="/uploadBlog" element={<UploadBlog/>}/>
          <Route path="/blogDetails/:blogId" element={<Details/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/currentUser" element={<CurrentUser/>}/>
          <Route path="/chats"  element={<Chats socket={socket}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
