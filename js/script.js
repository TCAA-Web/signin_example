let form = document.getElementById("loginForm");
let getDataButton = document.getElementById("getDataButton");
let loginMessage = document.getElementById("loginMessage");
let wrapper = document.getElementById("wrapper");
/**
 * This function is an event listener for the submit event of the login form.
 * It is used to submit the form data to the sign-in endpoint of the server.
 * If the sign-in is successful, the user is redirected to the home page and a welcome message is displayed.
 * @param {Event} e - The event object
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  /**
   * Get the values of the email and password fields
   */
  let email = e.target.email.value;
  let password = e.target.password.value;

  /**
   * The URL of the sign-in endpoint
   */
  let url = "http://localhost:8081/sign-in";

  /**
   * Create a new URLSearchParams object and add the email and password to it
   */
  let body = new URLSearchParams();
  body.append("email", email);
  body.append("password", password);

  /**
   * The options object for the fetch method
   */
  let options = {
    method: "POST",
    body: body,
  };

  /**
   * Make a POST request to the sign-in endpoint with the email and password
   */
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      /**
       * Display the getDataButton and hide the form and login message
       */
      getDataButton.style.display = "block";
      form.style.display = "none";
      loginMessage.innerText = `Welcome ${data.name}`;
      /**
       * Store the access token in local storage
       */
      localStorage.setItem("token", JSON.stringify(data.accessToken));
    });
});

/**
 * This function is used to fetch all the data from the server and display it on the page
 */
getDataButton.addEventListener("click", () => {
  /**
   * The URL of the endpoint that will be called to fetch the data
   */
  let url = "http://localhost:8081/getAll";

  /**
   * The options that will be passed to the fetch method
   */
  let options = {
    method: "GET",
    headers: {
      /**
       * The authorization header that will be sent with the request.
       * The value of the header will be a bearer token that is obtained from the local storage.
       */
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };

  /**
   * The fetch method is used to make an HTTP request to the specified URL.
   * The options parameter is used to specify the HTTP method, headers, and other details of the request.
   * The response from the server is parsed as JSON and the data is displayed on the page.
   */
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      /**
       * The data received from the server is an array of objects.
       * Each object represents a single item and contains two properties - title and description.
       * A div element is created for each item and its title and description are displayed inside it.
       */
      data.forEach((item) => {
        let container = document.createElement("div");
        let h4 = document.createElement("h4");
        let p = document.createElement("p");
        h4.innerText = item.title;
        p.innerText = item.description;
        container.appendChild(h4);
        container.appendChild(p);
        wrapper.appendChild(container);
      });
    });
});
