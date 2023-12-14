document.getElementById("expense").addEventListener("submit", addExpense);
const token = localStorage.getItem('token');

async function addExpense(e) {
  e.preventDefault();
  let amount = document.getElementById("amount").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;

  try {
    // const decodeToken = parseJwt(token)
    const obj = { amount, description, category };
    const res = await axios.post("/addexpense", obj,{ headers: { "Authorization":token} });
    console.log("Expense added");
    console.log(res.data);
    showExpense();
  } catch (err) {
    console.log(err);
    console.log("can't add expense");
  }
  document.getElementById("expense").reset();
}

async function showExpense() {
  const tablebody = document.getElementById("tablebody");
  try {
    tablebody.innerHTML = "";
    const response = await axios.get("/getexpense",{ headers: { "Authorization":token} });
      console.log(response.data);
        response.data.forEach((element) => {
        tablebody.innerHTML += `<tr>
     <td>${element.amount}</td>
     <td>${element.description}</td>
     <td>${element.category}</td>
     <td>
       <button type="button" class="btn btn-warning btn-sm" onclick="editExpense(${element.id})">Edit</button>
       <button type="button" class="btn btn-danger btn-sm ml-2" onclick="deleteExpense(${element.id})">Delete</button>

     </td>
   </tr>`;
      });
  } catch (err) {
    console.log(err);
  }
}

async function deleteExpense(id){
  try{
    await axios.delete(`/deletex/${id}`,{ headers: { "Authorization":token} })
    console.log('del success');
    showExpense()
  }
  catch(err){
    console.log(err);
  }
}

showExpense()

function showPremiumMessage() {
  document.getElementById('rzp-button1').style.visibility = 'hidden'
  document.getElementById('message').innerHTML = `<span class="btn btn-primary" id="message">You are a Premium User</span>`
}

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

window.addEventListener('DOMContentLoaded', async () => {


  console.log('in window load')
  const decodeToken = parseJwt(token)
  console.log(decodeToken)
  const ispremiumuser = decodeToken.ispremiumuser
  if (ispremiumuser) {
      showPremiumMessage()
  }
 

})
document.getElementById('rzp-button1').onclick = async function (e) {
  const response = await axios.get('http://localhost:3000/purchase/premium', {
      headers: {
          Authorization: token
      }
  })
  console.log(response)
  console.log('?>>>>',response.razorpay_payment_id)
  var options = {
      "key": response.data.key_id,
      "order_id": response.data.order.id,
      "handler": async function (response) {
          const res = await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
          }, { headers: { Authorization: token } })

          alert('You are a premium user')
          showPremiumMessage()
          localStorage.setItem('token', res.data.token)

      }
  }
  const rzp1 = new Razorpay(options)
  rzp1.open()
  e.preventDefault()

  rzp1.on('payment.failed', async function (response) {
      console.log(response)

      const resp = await axios.post('http://localhost:3000/purchase/updatetransactionfail', {
          order_id: options.order_id
      }, { headers: { Authorization: token } })

      console.log(resp)
      alert('something went wrong')
  })
}
