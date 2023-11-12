document.getElementById('signup').addEventListener("submit",addeUser)


async function addeUser(e){
    e.preventDefault()
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    const congfig = {name,email,password}
   await axios.post('/signup',congfig)
    .then((res)=>{console.log(res.data)})

    document.getElementById('signup').reset()
}
