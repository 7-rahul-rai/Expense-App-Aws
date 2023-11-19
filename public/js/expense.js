document.getElementById("expense").addEventListener("submit", addExpense);


async function addExpense(e) {
  e.preventDefault();
  let amount = document.getElementById("amount").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;

  try {
    const obj = { amount, description, category };
    const res = await axios.post("/addexpense", obj);
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
    const response = await axios.get("/getexpense");
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
    await axios.delete(`/deletex/${id}`)
    console.log('del success');
    showExpense()
  }
  catch(err){
    console.log(err);
  }
}

showExpense()
