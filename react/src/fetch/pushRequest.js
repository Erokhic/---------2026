export async function pushRequest(requestData) {
  let response = await fetch('http://localhost:3000/newRequest', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(requestData)
});

 return await response.json();
}
