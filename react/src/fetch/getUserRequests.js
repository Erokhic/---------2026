export async function getUserRequests() {
    try{
        const userId = localStorage.getItem('userId')
         if (!userId) {
            console.error('userId не найден')
            return []
        }

           let response = await fetch(`http://localhost:3000/requests/${userId}`)
    return await response.json()
    }
 catch (err){
console.log(err)
 }
}