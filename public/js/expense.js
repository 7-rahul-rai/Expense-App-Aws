document.getElementById("expense").addEventListener("submit", addExpense);
var page = 1;
document.getElementById("nrows").value = localStorage.getItem("limit");

if (localStorage.getItem("limit") == null) {
  localStorage.setItem("limit", 5);
}

document.getElementById("nrows").addEventListener("change", function () {
  const selectedRows = this.value;

  localStorage.setItem("limit", selectedRows); // Update the limit variable
  window.location.reload();
});

async function addExpense(e) {
  e.preventDefault();
  let amount = document.getElementById("amount").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;

  try {
    const token = localStorage.getItem("token");
    const obj = { amount, description, category };
    const res = await axios.post("/addexpense", obj, {
      headers: { Authorization: token },
    });
    console.log("Expense added");
    console.log(res.data);
    window.location.reload();
    showExpense();
  } catch (err) {
    console.log(err);
    console.log("can't add expense");
  }
  document.getElementById("expense").reset();
}

function displayExpenses(expenses) {
  const tablebody = document.getElementById("tablebody");
  tablebody.innerHTML = "";

  expenses.forEach((element) => {
    tablebody.innerHTML += `<tr>
      <td>${element.amount}</td>
      <td>${element.description}</td>
      <td>${element.category}</td>
      <td>
        <button type="button" class="btn btn-danger btn-sm" onclick="deleteExpense(${element.id})">Delete</button>
      </td>
    </tr>`;
  });
}

async function showExpense() {
  const limit = localStorage.getItem("limit");
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("/getexpense/" + page + "/" + limit, {
      headers: { Authorization: token },
    });
    console.log(response);
    const nofdata = response.data.totalItems;
    const tpages = Math.ceil(nofdata / limit);

    pbutton(tpages);
    console.log(tpages);
    displayExpenses(response.data.expenses);
  } catch (err) {
    console.log(err);
  }
}

async function deleteExpense(id) {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`/deletex/${id}`, { headers: { Authorization: token } });
    console.log("del success");
    window.location.reload();
    showExpense();
  } catch (err) {
    console.log(err);
  }
}

function showPremiumMessage() {
  document.getElementById("rzp-button1").remove();
  document.getElementById(
    "message"
  ).innerHTML = `<span class="btn btn-light" id="message" style="color: rgb(216, 22, 8);">You are a Premium User</span>`;
}

function pbutton(pages) {
  for (var i = 1; i <= pages; i++) {
    const pagination1 = document.querySelector(".pagination");
    const but = document.createElement("button");
    but.innerHTML = i;
    but.value = i;
    pagination1.appendChild(but);
    but.addEventListener("click", pagei);
  }
}

async function pagei(e) {
  const pagination1 = document.querySelector(".pagination");
  const token = localStorage.getItem("token");
  const limit = localStorage.getItem("limit");

  pagination1.querySelectorAll("button").forEach((button) => {
    button.style.color = "";
    button.style.backgroundColor = "";
  });

  page = e.target.value;
  e.target.style.color = "white";
  e.target.style.backgroundColor = "#007bff";
  console.log(page);
  const response = await axios.get("/getexpense/" + page + "/" + limit, {
    headers: { Authorization: token },
  });
  console.log(response);
  displayExpenses(response.data.expenses);
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const limit = localStorage.getItem("limit");
  console.log("in window load");

  const decodeToken = parseJwt(token);
  console.log(decodeToken);
  const ispremiumuser = decodeToken.ispremiumuser;
  if (ispremiumuser) {
    console.log(ispremiumuser);
    showPremiumMessage();
    showLeaderboard();
    download();
  }
  const dbdata = await axios.get("/getexpense/" + page + "/" + limit, {
    headers: {
      Authorization: token,
    },
  });

  await showExpense();
});
document.getElementById("rzp-button1").onclick = async function (e) {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:3000/purchase/premium", {
    headers: {
      Authorization: token,
    },
  });
  console.log(response);
  // console.log('?>>>>',response.order.id)
  var options = {
    key: response.data.key_id,
    order_id: response.data.order.id,
    handler: async function (response) {
      const res = await axios.post(
        "http://localhost:3000/purchase/updatetransactionstatus",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );

      alert("You are a premium user");
      showPremiumMessage();
      showExpense();
      console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      window.location.reload();
    },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on("payment.failed", async function (response) {
    console.log(response);

    const resp = await axios.post(
      "http://localhost:3000/purchase/updatetransactionfail",
      {
        order_id: options.order_id,
      },
      { headers: { Authorization: token } }
    );

    console.log(resp);
    alert("something went wrong");
  });
};

function showLeaderboard() {
  var sboard = document.createElement("button");
  sboard.className = "btn btn-success mb-3";
  sboard.id = "sboard";
  sboard.innerHTML = "Show Leaderboard";

  sboard.onclick = async () => {
    console.log("in onclcik");
    const token = localStorage.getItem("token");
    const userLeaderBoardArray = await axios.get(
      "http://localhost:3000/premium/showleaderboard",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(">>>", userLeaderBoardArray.data[1]);

    var leaderboardElem = document.getElementById("leaderboard");
    leaderboardElem.innerHTML += "<h1> Leader Board</h1>";
    userLeaderBoardArray.data.forEach((userDetails) => {
      leaderboardElem.innerHTML += `<li>Name - ${
        userDetails.name
      } <b>Total Expense</b> - ${userDetails.totalexpenses || 0}</li>`;
    });
  };
  document.getElementById("leaderboard").appendChild(sboard);
}

function download() {
  const report1 = document.getElementById("report1");
  const butt3 = document.createElement("button");
  const butt4 = document.createElement("button");

  butt3.id = "down_report";
  butt3.innerHTML = "Generate And Download Report";
  butt3.className = "buypre-btn2,btn btn-primary";

  butt4.id = "pastrep";
  butt4.innerHTML = "Download Past Generated Report";
  butt4.className = "buypre-btn2,btn btn-warning";

  report1.appendChild(butt3);
  report1.appendChild(butt4);
  document.getElementById("down_report").addEventListener("click", downloadrep);
  document.getElementById("pastrep").addEventListener("click", pastreports);
}

async function downloadrep() {
  window.location.href = "./reports.html";
}
async function pastreports() {
  window.location.href = "./pastreports.html";
}
