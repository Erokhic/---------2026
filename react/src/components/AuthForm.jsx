import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUser } from "../fetch/getUser.js"

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






const onSubmit = async (e) => {
    e.preventDefault()
    try {
           const isBazeAdmin = formData.login === 'beauty' && formData.password === 'pass'
        
        if (isBazeAdmin) {
            localStorage.setItem('userId', 'admin')
            localStorage.setItem('userName', 'Администратор')
            localStorage.setItem('userRole', 'admin')
            alert('Добро пожаловать, Администратор!')
            nav('/adminPanel')
            return
        }
        const result = await getUser(formData)
        if (result.length === 0) {
            alert('Неверный логин или пароль')
            return
        }

        const user = result[0]
        const isAdmin = user.id_role === 2
     
        const userData = {
            id: user.id,
            role: user.id_role,
            login: user.login,
            full_name: user.full_name,
            phone: user.phone
        }

        if (!isAdmin) userData.password = user.password
        
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('userId', user.id)
        
        if (isAdmin) {
            localStorage.setItem('userRole', 'admin')
            localStorage.setItem('userName', user.full_name)
            alert(`Добро пожаловать, администратор ${user.full_name}!`)
            nav('/adminPanel')
        } else {
            alert(`Добро пожаловать, ${user.full_name}!`)
            nav('/requestions')
        }
    } catch (error) {
        alert('Ошибка при авторизации')
    }
}










   return (
        <>
        <div className="form-container">
            <form  className="form" onSubmit={onSubmit}>

                <h1>Вход</h1><br/>
                <span>Логин</span><br/>
                <input type="text" id="login" name="login" value={formData.login} onChange={onChange}/><br/>
                <span>Пароль</span><br/>
                <input type="password" id="password" name="password" value={formData.password} onChange={onChange}/><br/>
                <button type="submit">Войти</button>
                <p onClick={()=>{nav('/')}}>зарегистрироваться</p>
            </form>
            </div>
        </>
    )

}