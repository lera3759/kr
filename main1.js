const form = document.querySelector("form");
const emailInput = form.querySelector("#email");
const errorBox = document.getElementById("error-box");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const errors = [];

  // Валідація email
  if (!emailInput.checkValidity()) {
    errors.push("Email не є валідною електронною адресою.");
  }

  // Валідація пароля
  const password = data.password;
  if (password.length < 8) {
    errors.push("Пароль повинен містити щонайменше 8 символів.");
  }

  //   if (errors.length > 0) {
  //     alert("Помилки валідації:\n- " + errors.join("\n- "));
  //     return;
  //   }

  if (errors.length > 0) {
    errorBox.innerHTML = errors.map((err) => `<p>${err}</p>`).join("");
    errorBox.style.display = "block";
    return;
  } else {
    errorBox.style.display = "none";
    errorBox.innerHTML = "";
  }

  fetch("/form-api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Помилка");
      }
    })
    .then(() => {
      //   alert("Форма успішно відправлена");
      errorBox.innerHTML = "<p>Форма успішно відправлена!</p>";
      errorBox.style.backgroundColor = "green";
      errorBox.style.display = "block";
    })
    .catch((err) => {
      console.error(err);
      //   alert("Помилка");
      errorBox.innerHTML = "<p>Помилка.</p>";
      errorBox.style.backgroundColor = "#FF6C55";
      errorBox.style.display = "block";
    });
});
