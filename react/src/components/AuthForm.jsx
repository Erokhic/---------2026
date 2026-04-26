import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function AuthForm({getUser}) {

const [formData, setFormData] = useState({
    login: '',
    password: ''
})

const nav = useNavigate()

const onChange = (e)=>{
    const {name, value} = e.target 
    setFormData({...formData, [name]: value})
}



const onSubmit = async(e) => {
        e.preventDefault()
        try {
            const result = await getUser(formData) 
            console.log(result)
            if (result.length > 0) {
                const user = result[0] 
                alert(`Добро пожаловать, ${user.full_name}!`)
                nav('/requestions') 
                return 
            } else if(formData.login === 'beauty' && formData.password === 'pass'){
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
                <p onClick={()=>{nav('/reg')}}>зарегистрироваться</p>
            </form>
            </div>
        </>
    )

}