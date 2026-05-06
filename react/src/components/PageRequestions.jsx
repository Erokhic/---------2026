import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getMasters } from "../fetch/getMasters"
import { getStatuses } from "../fetch/getStatuses"
import { getUserRequests } from "../fetch/getUserRequests"

export function PageRequestions() {

    const nav = useNavigate()
    const [userName, setUserName] = useState('')
    const [masters, setMasters] = useState([])
    const [statuses, setStatuses] = useState([])
    const [requests, setRequests] = useState([])


    useEffect(() => {
        const loadData = async () => {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user) {
                setUserName(user.full_name)
            }
            const requestData = await getUserRequests()
            setRequests(requestData)

            const mastersData = await getMasters()
            setMasters(mastersData)

            const statusData = await getStatuses()
            setStatuses(statusData)
            console.log('Загруженные статусы из БД:', statusData)


        }

        loadData()
    }, [])

    const getMasterName = (masterId) => {
        if (!masterId) return 'Не назначен'
        const master = masters.find(m => m.id === masterId)
        return master?.name || 'Не назначен'
    }
    const getStatusName = (statusId) => {
        if (!statusId) return 'Неизвестно'
        const status = statuses.find(s => s.id === Number(statusId))
        return status?.name || 'Неизвестно'
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('userId')
        localStorage.removeItem('userRole')
        nav('/auth')
    }

    return (
        <>
            <div style={{ textAlign: 'right', padding: '10px' }}>
                <span>Привет, {userName}! </span>
                <button onClick={handleLogout}>Выйти</button>
            </div>
            <div>
                <h1>Мои заявки</h1>
                <button onClick={() => { nav('/newRequest') }}>Добавить новую заявку</button>
                {requests.map((request, index) => (
                    <div key={request.id || index}>
                        <p><b>Мастер:</b> {getMasterName(request.id_master)}<b>Время:</b> {request.booking_datetime} <b>Статус:</b> {getStatusName(request.id_status)}</p>
                    </div>

                ))}


            </div>
        </>

    )
}