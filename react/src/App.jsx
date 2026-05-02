import { useState } from 'react'
import { RegForm } from './components/RegForm'
import {Routes, Route} from 'react-router-dom'
import { AuthForm } from './components/AuthForm'
import { AdminPanel } from './components/AdminPanel'
import { NewRequest } from './components/NewRequest'
import { PageRequestions } from './components/PageRequestions'
import { pushUser } from './fetch/pushUser.js'
import { getUser } from './fetch/getUser.js'
import { pushRequest } from './fetch/pushRequest.js'


function App() {
 
const [user, setUsers]= useState([])
const [request, setRequest] = useState([])

const addUser=(newUser)=>{
  setUsers({...user,newUser})
  pushUser(newUser)
}

const addRequest = (requestData)=>{
  setRequest({...request,requestData})
  pushRequest(requestData)
}

  return (
    <>
     <Routes>
      {/* <Route path="/" element={<RegForm addUser={addUser}/>}/> */}
      <Route path="/reg" element={<RegForm addUser={addUser}/>}/>
      <Route path="/auth" element={<AuthForm getUser={getUser}/>}/>
      <Route path="/adminPanel" element={<AdminPanel/>}/>
      <Route path="/newRequest" element={<NewRequest addRequest={addRequest}/>}/>
      <Route path="/requestions" element={<PageRequestions/>}/>
     </Routes>
    </>
  )
}

export default App
