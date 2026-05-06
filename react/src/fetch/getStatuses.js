export async function getStatuses() {
    let response = await fetch('http://localhost:3000/statuses')
    return await response.json()
}