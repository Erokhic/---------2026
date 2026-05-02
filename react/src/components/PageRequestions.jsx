import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getMasters } from "../fetch/getMasters"

export function PageRequestions({requests}) {

    const nav = useNavigate()
const [userName, setUserName]= useState('')
const [masters, setMasters]= useState([])

useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
        setUserName(user.full_name)
    }
     const mastersData = getMasters() 
    setMasters(mastersData)
}, [])

//   const getMasterName = (masterId) => {
//         const master = masters.find(m => m.id === masterId)
//         return  master?.name || 'Не назначен'
//     }
       const getStatusName = (statusId) => {
        const statuses = {
            1: 'Новая',
            2: 'В работе',
            3: 'Завершена'
        }
        return statuses[statusId] || 'Неизвестно'
    }

  const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('userId')
        localStorage.removeItem('userRole')
        nav('/auth')
    }

    return(
        <>
           <div style={{ textAlign: 'right', padding: '10px' }}>
                <span>Привет, {userName}! </span>
                <button onClick={handleLogout}>Выйти</button>
            </div>
        <div>
        <h1>Мои заявки</h1>
        <button onClick={()=> {nav('/newRequest')}}>Добавить новую заявку</button>
{requests.map((request, index)=>(
    <div key={request.id || index}>
        <p><b>Мастер:</b> {request.id_master}<b>Время:</b> {request.booking_datetime} <b>Статус:</b> {getStatusName(request.id_status)}</p>
    </div>
    
))}


        </div>
        </>

    )
}