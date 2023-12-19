document.getElementById('resetp').addEventListener('submit',async function(e) {
    e.preventDefault();

    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;

    await axios.post('http://localhost:3000/password/update', {
        password: password , email : email
    })
    .then(function (response) {
        console.log('res>>',response);    
    })
    .catch(function (error) {
        console.log(error);
    });
});