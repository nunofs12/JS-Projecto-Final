const nome = document.querySelector("#saudacao");
const nome1 = document.querySelector("#saudacao1");
const letter = document.querySelector("#letter");
const buttonLogIn = document.querySelector("#login");
const buttonLogOut = document.querySelector("#logout");
const data1 = document.querySelector("#data");
const dataEHora = document.querySelector("#DH");
const form = document.querySelector("#form");
const lista = document.querySelector("#lista");

////////////////////////////////////////////////////
//            MODO CLARO / ESCURO                 //
////////////////////////////////////////////////////

function night() {
  if (document.body.classList.contains("day")) {
    document.body.classList.remove("day");
    document.body.classList.add("night");

    localStorage.getItem("modo", noite);
  }
}
function day() {
  if (document.body.classList.contains("night")) {
    document.body.classList.remove("night");
    document.body.classList.add("day");
    localStorage.getItem("modo", dia);
  }
}

////////////////////////////////////////////////////
//                  LOGIN                         //
////////////////////////////////////////////////////

buttonLogIn.addEventListener("click", function login() {
  if (localStorage.getItem("utilizador")) {
    nome.innerText = "Olá " + localStorage.getItem("utilizador");
    nome1.innerText = "Olá " + localStorage.getItem("utilizador") + " 👋";
    letter.innerText = localStorage.getItem("utilizador").charAt(0);
  } else {
    let myUser = prompt("Qual é o seu nome?");
    localStorage.setItem("utilizador", myUser);
    nome.innerText = "Olá " + localStorage.getItem("utilizador");
    nome1.innerText = "Olá " + localStorage.getItem("utilizador") + " 👋";
    letter.innerText = localStorage.getItem("utilizador").charAt(0);
  }

  buttonLogIn.style.display = "none";
  buttonLogOut.style.display = "block";
});

////////////////////////////////////////////////////
//                  LOGOUT
////////////////////////////////////////////////////

buttonLogOut.addEventListener("click", function logOut() {
  localStorage.clear();
  buttonLogOut.style.display = "none";
  buttonLogIn.style.display = "block";
});

////////////////////////////////////////////////////
//               Data e Hora
////////////////////////////////////////////////////

function relogioAct() {
  const dataAtual = new Date();
  const dataHora = dataAtual.toLocaleDateString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  dataEHora.innerText = "Data e Hora: " + dataHora;
}

relogioAct();
setInterval(relogioAct, 1000);

////////////////////////////////////////////////////
//    Formulário adicionar/apresentar despesas
////////////////////////////////////////////////////
let data;
let description;
let amount;
let category;
let expenses = [];

function constroiDespesas() {
  console.log(expenses);
  expenses.forEach(function (expense, item) {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${expense.description}</td>
            <td><span class="category food">${expense.category}</span></td>
            <td>${expense.amount.toFixed(2)} €</td>
            <td><a href="#editar" class="edit">Editar</a><button onclick="removeItem(${item})">Apagar</button></td>
           
        `;

    lista.appendChild(row);
  });
}

function removeItem(item) {
  console.log(item);
  expenses.splice(item, 1);
  constroiDespesas();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  data = new FormData(this);
  expenses.push({
    description: data.get("description"),
    category: data.get("category"),
    amount: parseFloat(data.get("amount")),
  });

  console.log(expenses);
  this.reset();
  constroiDespesas();
});
