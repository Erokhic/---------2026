export async function getUser(formData) {
const url = 'http://localhost:3000/auth';
const response = await fetch(url , {
   method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(formData)  
})
 return await response.json();
}