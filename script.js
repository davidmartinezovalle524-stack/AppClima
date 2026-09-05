const formularioRegistro = document.getElementById("formRegistro");

if (formularioRegistro) {

    formularioRegistro.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (password.length < 2) {

            alert("La contraseña debe tener mínimo 2 caracteres.");

            return;
        }
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        alert("¡Registro exitoso!");

        window.location.href = "login.html";

    });
}

const formularioLogin = document.getElementById("formLogin");

if (formularioLogin) {

    formularioLogin.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const emailGuardado = localStorage.getItem("email");
        const passwordGuardada = localStorage.getItem("password");

        if (email === emailGuardado && password === passwordGuardada) {

            window.location.href = "clima.html";


        } else {

            document.getElementById("mensaje").textContent =
                "Revisa nuevamente";

        }

    });
}

const apiKey = "zpka_9a7c5abb54104cee8785fdbae4b39e3d_1834a946";

const mostrarBtn = document.getElementById("mostrarClima");
const climaInfo = document.getElementById("climaInfo");

if (mostrarBtn) {
  mostrarBtn.addEventListener("click", function() {
    const ciudadId = document.getElementById("ciudad").value;
    const fecha = document.getElementById("fecha").value;

    if (!fecha) {
      alert("Selecciona una fecha");
      return;
    }

    fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${ciudadId}?apikey=${apiKey}&language=es&details=true&metric=true`)
      .then(res => res.json())
      .then(data => {
        const pronostico = data.DailyForecasts.find(d => d.Date.startsWith(fecha));

        if (pronostico) {
          const manana = pronostico.Day.IconPhrase + " - Máx: " + pronostico.Temperature.Maximum.Value + "°C";
          const noche = pronostico.Night.IconPhrase + " - Mín: " + pronostico.Temperature.Minimum.Value + "°C";

          climaInfo.innerHTML = `
            <h3>Pronóstico para ${fecha}</h3>
            <p><strong>Mañana:</strong> ${manana}</p>
            <p><strong>Noche:</strong> ${noche}</p>
          `;
        } else {
          climaInfo.innerHTML = "No hay datos";
        }
      })
      .catch(err => {
        climaInfo.innerHTML = "ERROR" + err;
      });
  });
}
