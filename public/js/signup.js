document.getElementById("signup").addEventListener("submit", addeUser);

async function addeUser(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const congfig = { name, email, password };

  try {
    const res = await axios.post("/signup", congfig);
    console.log(res.data);
    alert("user created");
  } catch (err) {
    console.log('user already exists');
  }

  document.getElementById("signup").reset();
}
