import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getMasters } from "../fetch/getMasters"
import { getStatuses } from "../fetch/getStatuses"
import { getUserRequests } from "../fetch/getUserRequests"
import { getRequests } from "../fetch/getRequests"

export function AdminPanel() {
    const nav = useNavigate()
    const [requests, setRequests] = useState([])
    const [statuses , setStatuses] = useState([])

    const handleLogout = () => {
       localStorage.removeItem('user')
        nav('/auth')
    }

 const getStatusName = (statusId) => {
        if (!statusId) return 'Неизвестно'
        const status = statuses.find(s => s.id === Number(statusId))
    return status?.name || 'Неизвестно'
}

const updateRequestStatus =  async (requestId, newStatusId) => {
     const statusId = Number(newStatusId)
    const newStatusName = getStatusName(newStatusId)
  const updatedRequests = requests.map(request => {
    if (request.id === requestId) {
      return {
        ...request,     
        id_status: newStatusId,      
        status: newStatusName   
      };
    }
    return request;
  });
  
  setRequests(updatedRequests);
try {
            const response = await fetch(`http://localhost:3000/api/requests/${requestId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_status: Number(newStatusId) })
            })
            
            if (response.ok) {
                console.log('Статус сохранен в базе данных')
            }
        } catch (error) {
            console.error('Ошибка:', error)
            alert('Не удалось сохранить статус')
            const requestData = await getRequests()
            setRequests(requestData)
        }
    }

    useEffect(() => {
        const loadData = async () => {
            const requestsData = await getRequests()
            setRequests(requestsData)
            const statusData = await getStatuses()
            setStatuses(statusData)
        }
        loadData()
    }, [])


    return (
        <>
            <h1>Панель админа</h1>
            <div><button onClick={handleLogout}>Выйти</button></div>
            <table> <h2>Все заявки</h2>
                <tbody>
                       <tr>
                            <td>ФИО клиента </td>
                            <td>Телефон</td>
                            <td>Дата и время записи</td>
                            <td>Мастер</td>
                            <td>Статус</td>
                        </tr>
                    {requests.map((request, index) => (
                     
                        <tr key={index}>
                            <td>{request.full_name}</td>
                            <td>{request.phone}</td>
                            <td>{new Date(request.booking_datetime).toLocaleString()}</td>
                            <td>{request.master_name}</td>
                            <td>
                                <select value={request.id_status} onChange={(e)=> updateRequestStatus(request.id, e.target.value)}>
                                   {statuses.map((status)=>(
                                    <option key={status.id} value={status.id}>
                                       {status.name}
                                    </option>
                                   ))}
                                   
                                    </select>
                                    </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}