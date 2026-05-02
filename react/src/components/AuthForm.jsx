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
            const result = await getUser(formData) 
            console.log(result)
            if (result.length > 0) {
                const user = result[0] 
              const userData ={
                 id: user.id,
                role: user.id_role,
                login: user.login,
                password: user.password,
                full_name: user.full_name,
                phone: user.phone
              }
localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('userId', user.id)

                alert(`Добро пожаловать, ${user.full_name}!`)
                nav('/requestions') 
                return 
            } else if(formData.login === 'beauty' && formData.password === 'pass'){
                localStorage.setItem('userId', 'admin')
                localStorage.setItem('userName', 'Администратор')
                localStorage.setItem('userRole', 'admin')
                nav('/adminPanel')
                return 
            }else{
                alert('Неверный логин или пароль')
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