import { useState } from 'react'
import { RegForm } from './components/RegForm'
import { Routes, Route } from 'react-router-dom'
import { AuthForm } from './components/AuthForm'
import { AdminPanel } from './components/AdminPanel'
import { NewRequest } from './components/NewRequest'
import { PageRequestions } from './components/PageRequestions'
import { pushUser } from './fetch/pushUser.js'
import { getUser } from './fetch/getUser.js'
import { pushRequest } from './fetch/pushRequest.js'


function App() {

  const [users, setUsers] = useState([])
 

  const addUser = (newUser) => {
    setUsers([...users, newUser])
    pushUser(newUser)
  }

  const addRequest = async (requestData) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const newRequest = {
      ...requestData,
      userId: currentUser?.id
    }
    try {
      await pushRequest(requestData)
      return true
    } catch (error) {
      console.error('Ошибка:', error)
      throw error
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<RegForm addUser={addUser} />} />
        <Route path="/reg" element={<RegForm addUser={addUser} />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/newRequest" element={<NewRequest addRequest={addRequest} />} />
        <Route path="/requestions" element={<PageRequestions />} />
      </Routes>
    </>
  )
}

export default App
