let loginForm = document.getElementById("loginForm");
let loginMessage = document.getElementById("loginMessage");
let dataButton = document.getElementById("getData");
let wrapper = document.getElementById("wrapper");

dataButton.addEventListener("click", () => {
  getData();
});

loginForm.addEventListener("submit", (e) => {
  login(e);
});

function login(e) {
  e.preventDefault();
  console.log(e.target.email.value);

  let url = "http://localhost:8081/sign-in";
  let email = e.target.email.value;
  let password = e.target.password.value;

  let body = new URLSearchParams();
  body.append("email", email);
  body.append("password", password);

  let options = {
    body: body,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      if (data.name) {
        console.log(data);
        loginForm.style.display = "none";
        loginMessage.innerText = `Welcome ${data.name}`;
        localStorage.setItem("token", JSON.stringify(data.accessToken));
        let btn = document.getElementById("getData");
        btn.style.display = "block";
      }
    });
}

function getData() {
  let url = "http://localhost:8081/getAll";
  let headers = {
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
  };
  let options = {
    headers: headers,
    method: "GET",
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        let card = document.createElement("div");
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                </div>
            </div>`;
        wrapper.appendChild(card);
      });
    });
}
