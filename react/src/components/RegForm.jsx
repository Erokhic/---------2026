import { useNavigate } from "react-router-dom"
import { useState } from "react"


export function RegForm({ addUser }) {

    const nav = useNavigate()

    const [formData, setFormData] = useState({
        full_name:'',
        phone:'',
        login :'',
        password:''
    })

const onChange= (e)=>{
    const {name, value}= e.target
    setFormData({...formData,[name]: value})
}

const onSubmit = (e)=>{
    e.preventDefault()
    if (!formData.full_name || !formData.phone || !formData.login || !formData.password) {
        alert('Заполните все поля')
        return
    }
     if(formData.phone.length < 11){
        alert('Неправильно набран номер телефона, телефон начинается с 8')
        return
    }
    if(formData.password.length < 6){
        alert('Пароль должен быть больше 6 символов')
        return
    }
    else{
        const newUser={
        full_name: formData.full_name,
        phone: formData.phone,
        login:formData.login,
        password: formData.password
        }

        addUser(newUser)
        alert(`${newUser.full_name},вы успешно зарегистрировались!`)
        setFormData({
        full_name:'',
        phone:'',
        login :'',
        password:''
        })
        nav('/auth')
    }
}


    return (
        <>
        <div className="form-container">
<form className="form" onSubmit={onSubmit}>
                <h1>Регистрация</h1>
                <span>ФИО пользователя</span><br/>
                <input type="text" name="full_name" onChange={onChange}/><br />
                <span>Номер телефона</span><br/>
                <input type="tel" name="phone" onChange={onChange}/><br />
                <span>Логин</span><br/>
                <input type="text" name="login" onChange={onChange}/><br />
                <span>Пароль</span><br/>
                <input type="password" name="password" onChange={onChange}/> <br />

                <button type="submit">Зарегистрировать</button>
                <p onClick={()=> {nav('/auth')}}>войти</p>
            </form>
        </div>
            
        </>
    )
}