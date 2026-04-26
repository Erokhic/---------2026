export async function getMasters() {
let response = await fetch('http://localhost:3000/masters') ;
return await response.json()
}