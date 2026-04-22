import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function AuthForm() {

const [formData, setFormData] = useState({
    login: '',
    password: ''
})

const nav = useNavigate()

const onChange = (e)=>{
    const {name, value} = e.target 
    setFormData({...formData, [name]: value})
}

const onSubmit=(e)=>{
e.preventDefault()

if(!formData.login || !formData.password){
    alert('Заполните поля')
    return
}

if(formData.login === 'beauty' && formData.password === 'pass'){
    nav('/adminPanel')
    return
}else{
    alert('неправильный логин или пароль')
}

}

    return (
        <>
            <form onSubmit={onSubmit}>
                <h1>Вход</h1><br />
                <span>Логин</span><br/>
                <input type="text" id="login" name="login" onChange={onChange}/><br/>
                <span>Пароль</span><br/>
                <input type="password" id="password" name="password" onChange={onChange}/><br/>
                <button type="submit">Войти</button>
                <p onClick={()=>{nav('/')}}>зарегистрироваться</p>
            </form>


        </>
    )
}
