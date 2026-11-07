//constantes log in
const nome = document.querySelector("#saudacao");
const nome1 = document.querySelector("#saudacao1");
const letter = document.querySelector("#letter");
const buttonLogIn = document.querySelector("#login");
const buttonLogOut = document.querySelector("#logout");
//constante data e hora
const dataEHora = document.querySelector("#DH");
//constante despesas
const form = document.querySelector("#form");
const lista = document.querySelector("#lista");
const buttonEdit = document.querySelector("#btn-primary");
const total1 = document.querySelector("#totalH2");
const total2 = document.querySelector("#total2");
const nDespesas = document.querySelector("#nDespesas");
//constante api
const celsius = document.querySelector("#temperatura");
//constantes temas
const claro = document.querySelector("#dia");
const escuro = document.querySelector("#escuro");

////////////////////////////////////////////////////
//            MODO CLARO / ESCURO                 //
////////////////////////////////////////////////////

escuro.addEventListener("click", function () {
  if (document.body.classList.contains("day")) {
    document.body.classList.remove("day");
    document.body.classList.add("night");

    localStorage.setItem("modo", "noite");
  }
});
claro.addEventListener("click", function () {
  if (document.body.classList.contains("night")) {
    document.body.classList.remove("night");
    document.body.classList.add("day");
    localStorage.setItem("modo", "dia");
  }
});

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
  //console.log(dataAtual);
  const dataHora = dataAtual.toLocaleDateString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  dataEHora.innerText = "Data e Hora: " + dataHora;
}
//repetir a chamada da função relogioAct, de 1 em 1 segundo.

setInterval(relogioAct, 1000);

////////////////////////////////////////////////////
//    variáveis para as despesas
////////////////////////////////////////////////////
let data;
let description;
let amount;
let category;
let expenses = [];

////////////////////////////////////////////////////
//     adicionar despesas
////////////////////////////////////////////////////

function constroiDespesas() {
  lista.innerHTML = "";

  let total = 0;
  total.innerHTML = "";
  expenses.forEach(function (expense, item) {
    total += Number(expense.amount);

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${expense.description}</td>
            <td><span class="category food">${expense.category}</span></td>
            <td>${expense.amount.toFixed(2)} €</td>
            <td><a href="#editar" class="edit">Editar</a><button onclick="removeItem(${item})">Apagar</button></td>`;

    lista.appendChild(row);
  });
  total1.innerText = total + " €";
  total2.innerText = total + " €";
  nDespesas.innerText = expenses.length;
}

////////////////////////////////////////////////////
//     filtrar despesas
////////////////////////////////////////////////////
let listaCategorias = document.querySelector("#filter");

listaCategorias.addEventListener("change", function ncategoria() {
  const categoriasFiltradas = expenses.filter(
    (categoria) =>
      listaCategorias.value === "todas" ||
      categoria.category === listaCategorias.value,
  );
  constroiDespesas(categoriasFiltradas);
});

////////////////////////////////////////////////////
//     apagar despesas
////////////////////////////////////////////////////

function removeItem(item) {
  expenses.splice(item, 1);
  constroiDespesas();
}

////////////////////////////////////////////////////
//     botão submeter
////////////////////////////////////////////////////

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

////////////////////////////////////////////////////
//    editar despesas
////////////////////////////////////////////////////

// {description: 'sss', category: 'alimentacao', amount: 33}

////////////////////////////////////////////////////
//    API
////////////////////////////////////////////////////

function api() {
  const apiURL =
    "https://api.open-meteo.com/v1/forecast?latitude=38.7251&longitude=-9.1498&hourly=temperature_2m";

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let currentHour = new Date().toISOString().slice(0, 13);
      console.log(currentHour);

      let index = data.hourly.time.findIndex((time) =>
        time.startsWith(currentHour),
      );

      console.log(index);

      let temperatura = data.hourly.temperature_2m[index];
      console.log(temperatura);

      celsius.innerText = temperatura + "° C";
    });
}
api();
