function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newErrors = [];

    // Валідація email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.push("Email не є валідною електронною адресою.");
    }

    // Валідація пароля
    const password = data.password;
    if (password.length < 8) {
      errors.push("Пароль повинен містити щонайменше 8 символів.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Пароль повинен містити хоча б одну велику літеру.");
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      errors.push("Пароль повинен містити хоча б один спецсимвол.");
    }
    if (/[а-яА-ЯЁёЇїІіЄєҐґ]/.test(password)) {
      errors.push("Пароль не повинен містити кириличні символи.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("/form-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Помилка");
    } catch (err) {
      console.error("Помилка");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container">
        <img
          src="https://via.placeholder.com/300x120"
          alt="img"
          style={{ width: "300px", height: "120px", marginBottom: "10px" }}
        />

        {errors.length > 0 && (
          <div
            id="error-box"
            style={{
              backgroundColor: "#FF6C55",
              color: "white",
              padding: "4px",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            {errors.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="email" style={{ width: "25%" }}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              style={{ width: "75%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="password" style={{ width: "25%" }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              style={{ width: "75%" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <a href="#">Forgot your password?</a>
          </div>

          <div>
            <button
              type="submit"
              style={{
                backgroundColor: "#3fff5a",
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                padding: "5px 10px",
                border: "none",
                borderRadius: "4px",
                width: "100%",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function WeatherFetcher() {
  const [weather, setWeather] = React.useState({});

  async function fetchWeatherData() {
    await fetch(
      "https://samples.openweathermap.org/data/2.5/weather?q=London&appid=b1b15e88fa797225412429c1c50c122a1"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return "";
      })
      .then((weather) => {
        setWeather({ ...weather });
        console.log("Отримані дані:", weather);
      })
      .catch((err) => console.error(err));
  }

  React.useEffect(() => {
    fetchWeatherData();
  }, []);

  return <div>{JSON.stringify(weather)}</div>;
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(<LoginForm />);
// root.render(<WeatherFetcher />);
