import { useNavigate } from "react-router-dom"

export function PageRequestions(user) {

    const nav = useNavigate()



    return(
        <>
        <h1>Мои заявки</h1>
        <button onClick={()=> {nav('/newRequest')}}>Добавить новую заявку</button>
        </>

    )
}