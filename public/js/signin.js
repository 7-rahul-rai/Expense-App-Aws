document.getElementById("signin").addEventListener("submit", loginUser);

async function loginUser(e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const obj = {email,password}
    const res = await axios.post("/signin",obj);
        console.log('successful user login');
  } catch (err) {
    console.log("user doesn't exist signup");
  }
  document.getElementById("signin").reset();
}
