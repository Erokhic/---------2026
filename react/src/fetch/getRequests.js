export async function getRequests() {
    let response = await fetch('http://localhost:3000/allRequests')
    return await response.json()
}