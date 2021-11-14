//Evelīna Frīdenberga - Tomaša
const nameV = document.querySelector("#name");
const surnameV = document.querySelector("#surname");
const numberV = document.querySelector("#number");
const button = document.querySelector("#button");
const table = document.querySelector("#table");

//funkcija, kas pārbauda, vai lauki aizpildīti
const check = function () {
  if (nameV.value === "") {
    nameV.style.borderColor = "red";
  } else {
    nameV.style.borderColor = "green";
  }
  if (surnameV.value === "") {
    surnameV.style.borderColor = "red";
  } else {
    surnameV.style.borderColor = "green";
  }
  if (numberV.value === "") {
    numberV.style.borderColor = "red";
  } else {
    numberV.style.borderColor = "green";
  }
};

//funkcija, kas ielādē programmu.
const load = async () => {
  table.innerHTML = "";
  numberV.classList.remove("your-class");
  numberV.value = "";
  nameV.value = "";
  surnameV.value = "";
  table.innerHTML =
    "<tr><th>Name</th><th>Surname</th><th>Phone</th><th>Delete</th></tr>";
  fetch("http://127.0.0.1:3000")
    .then((res) => res.json())
    .then((res) =>
      res.phone.map((e) => {
        table.innerHTML += `<tr><td>${e.name}</td><td>${e.surname}</td><td>${e.phone}</td><td><button class="delete">Delete</button></td></tr>`;
      })
    )
    .then((res) => {
      const del = document.querySelectorAll(".delete");
      del.forEach((element) => {
        element.addEventListener("click", (e) => {
          deleteF(element.parentElement.parentElement.childNodes[2].innerText);
        });
      });
    });
};

load();
//funkcija, kas datus nosūta uz DB
const send = () => {
  fetch("http://127.0.0.1:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameV.value,
      surname: surnameV.value,
      phone: numberV.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        numberV.value = "";
        numberV.placeholder = res.error;
        numberV.classList.add("your-class");
      } else {
        load();
      }
    });
};

//FUnkcija, kas dzēš elementu
const deleteF = (value) => {
  fetch(`http://127.0.0.1:3000/${value}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => load());
};

button.addEventListener("click", () => {
  check();
  send();
  load();
});
