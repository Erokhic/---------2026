import { useState } from 'react'
import { RegForm } from './components/RegForm'
import {Routes, Route} from 'react-router-dom'
import { AuthForm } from './components/AuthForm'
import { AdminPanel } from './components/AdminPanel'

function App() {
 
const [user, setUsers]= useState([])

const addUser=(newUser)=>{
  setUsers({...user,newUser})
}
  return (
    <>
     <Routes>
      <Route path="/" element={<RegForm addUser={addUser}/>}/>
      <Route path="/auth" element={<AuthForm/>}/>
      <Route path="/adminPanel" element={<AdminPanel/>}/>
     </Routes>
    </>
  )
}

export default App
