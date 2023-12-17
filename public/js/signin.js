document.getElementById("signin").addEventListener("submit", loginUser);
document.getElementById('uname')


async function loginUser(e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const obj = {email,password}
    const res = await axios.post("/signin",obj);
        console.log('successful user login');
        console.log(res.data.token);
        localStorage.setItem('token', res.data.token)
        window.location.href = "./expense.html"
  } catch (err) {
    console.log("user doesn't exist signup");
  }
  document.getElementById("signin").reset();
}
