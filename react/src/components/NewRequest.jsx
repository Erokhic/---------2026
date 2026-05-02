import { useNavigate } from "react-router-dom"
import { useState , useEffect } from "react"
import { getMasters } from "../fetch/getMasters.js"

export function NewRequest({addRequest}) {
    

const nav = useNavigate()
 const [masters, setMasters]= useState([])
 const [availableTimes, setAvailableTimes] = useState([])
const [formData, setFormData]= useState({
    id_user:'',
    id_master: '',
    booking_date:'',
    booking_time:''
})

    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const userId = user.id

const generateTimeSlots =()=>{
    const slots = []
    for (let hour = 8; hour <= 18; hour++) {
        slots.push(`${hour.toString().padStart(2,'0')}:00`)
    }
    return slots
}

useEffect(() =>{
if(formData.booking_date){
let times = generateTimeSlots()

const today = new Date().toDateString().split('T')[0]
if (formData.booking_date === today) {
    const currentHour = new Date().getHours()
    times = times.filter(time=>{
        const hour = parseInt(time.split(':')[0])
        return hour> currentHour
    })
}
setAvailableTimes(times)
    setFormData(prev =>({...prev, booking_time: ''}))
}
 
},[formData.booking_date])



 useEffect(() => {
       const fetchMasters = async ()=>{
        try{
            const data = await getMasters()
            setMasters(data)
        }catch (error){
console.error('Ошибка:', error)
        }
       }
  fetchMasters()
}, [])

const onChange =(e)=>{
    const {name, value}= e.target 
    setFormData({...formData, [name]: value})
}

const onSubmit = async (e)=>{
   e.preventDefault()

        if (!userId) {
            alert('Ошибка: пользователь не авторизован')
            nav('/auth')
            return
        }
    if(!formData.id_master){
        alert('Выберите мастера')
        return
    }
    if (!formData.booking_date) {
            alert('Укажите дату')
            return
    }

    if (!formData.booking_time) {
           alert('Укажите время')
            return
    }

const booking_datetime = `${formData.booking_date} ${formData.booking_time}:00`

const requestData ={
    id_user: parseInt(userId),
    id_master: parseInt(formData.id_master),
    id_status: 1,
    booking_datetime: booking_datetime
}
 console.log('Отправляемые данные:', requestData)
addRequest(requestData)
alert('Ваша заявка отправлена!')
nav('/requestions')
}


    return(
        <>
        <div className="form-container">
<form className="form" onSubmit={onSubmit}>
    <h1>Создать заявку</h1>
<span>Выберите мастера</span>
<select name="id_master" id="id_master" value={formData.id_master} onChange={onChange}>
    <option value="">-Выберите-</option>
    {
        masters.map(master=>(
            <option key={master.id} value={master.id}>
                {master.name}
            </option>
        ))
    }
</select>


<span>Укажите дату</span>
<input type="date" name="booking_date" value={formData.booking_date} onChange={onChange}/>

<span>Выберите время (с 8:00 до 18:00)</span>
<select type="datetime" name="booking_time" value={formData.booking_time} onChange={onChange}>

<option value="">Выберите время</option>
{availableTimes.map(time=>(
    <option key ={time} value={time}>{time}</option>
))}
</select>
    <button type="submit">Отправить заявку</button>
</form>
        </div>
        
        
        </>
    )
}