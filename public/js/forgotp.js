document.getElementById("forgotp").addEventListener("submit", forgotp);

async function forgotp(e) {
  e.preventDefault();
  var email = document.getElementById('email').value
  try {
    const res = await axios.post(
      "http://16.16.87.135:3300:3000/password/forgotpassword/",
      {
        email: email,
      }
    );
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}
