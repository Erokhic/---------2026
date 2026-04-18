import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function RegForm({ addUser }) {

    const nav = useNavigate()

    const [formData, setFormData] = useState({
        fio_user:'',
        tel:'',
        login :'',
        password:''
    })

const onChange= (e)=>{
    const {name, value}= e.target
    setFormData({...formData,[name]: value})
}

const onSubmit = (e)=>{
    e.preventDefault()
    if (!formData.fio_user || !formData.tel || !formData.login || !formData.password) {
        alert('Заполните все поля')
        return
    }
     if(formData.tel.length < 11){
        alert('Неправильно набран номер телефона')
        return
    }
    if(formData.password.length < 6){
        alert('Пароль должен быть больше 6 символов')
        return
    }
    else{
        const newUser={
        fio_user:formData.fio_user,
        tel:formData.tel,
        login :formData.login,
        password:formData.password
        }

        addUser(newUser)
        alert(`${newUser.fio_user},вы успешно зарегистрировались!`)
        setFormData({
        fio_user:'',
        tel:'',
        login :'',
        password:''
        })
        nav('/auth')
    }
}





    return (
        <>
            <form onSubmit={onSubmit}>
                <h1>Регистрация</h1>
                <span>ФИО пользователя</span><br/>
                <input type="text" name="fio_user" onChange={onChange}/><br />
                <span>Номер телефона</span><br/>
                <input type="number" name="tel" onChange={onChange}/><br />
                <span>Логин</span><br/>
                <input type="text" name="login" onChange={onChange}/><br />
                <span>Пароль</span><br/>
                <input type="password" name="password" onChange={onChange}/> <br />

                <button type="submit">Зарегистрировать</button>
                <p onClick={()=> {nav('/auth')}}>войти</p>
            </form>
        </>
    )
}