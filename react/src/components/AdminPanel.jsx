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

    const currentUser =JSON.parse(localStorage.getItem('user')) 

//   if (!currentUser || currentUser.login !== 'beauty') {
//     alert('Доступ запрещен');
//     nav('/auth');
//     return
//   }

    const handleLogout = () => {
       localStorage.removeItem('user')
        nav('/auth')
    }

    useEffect(() => {
        const loadData = async () => {
            const requestData = await getRequests()
            setRequests(requestData)

            const statusData = await getStatuses()
            setStatuses(statusData)
        }

        loadData()
    }, [])
 const getStatusName = (statusId) => {
        if (!statusId) return 'Неизвестно'
        const status = statuses.find(s => s.id === Number(statusId))
    return status?.name || 'Неизвестно'
}


const updateRequestStatus = (requestId, newStatusId) => {
    const newStatusName = getStatusName(newStatusId)
  const updatedRequests = requests.map(request => {
    if (request.id === requestId) {
      return {
        ...request,     
        id_ststus: newStatusId,      
        status: newStatusName   
      };
    }
    return request;
  });
  
  setRequests(updatedRequests);
}



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
                            <td>{request.booking_datetime}</td>
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