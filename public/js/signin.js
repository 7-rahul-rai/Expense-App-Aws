document.getElementById("signin").addEventListener("submit", loginUser);

async function loginUser(e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const res = await axios.get("/signin");
    if (res.status == "200") {
        console.log('successful user login');
    }
  } catch (err) {
    console.log("user doesn't exist signup");
  }

  document.getElementById("signin").reset();
}
