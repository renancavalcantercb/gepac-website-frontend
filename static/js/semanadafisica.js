function countdown_timer() {
    // Set the date we're counting down to
    var countDownDate = new Date("Sep 1, 2023 18:00:0").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = Date.now();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));


        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "Semana da Física já começou!";
        } else {
            // Display the result in the element with id="demo"
            document.getElementById("demo").innerHTML = `Contagem regressiva para a Semana da Física: ${days} dias ${hours} horas ${minutes} minutos`;
        }

    }, 1000);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const options = {
        method: 'POST',
        body: data
    };

    fetch('https://gepac-backend.herokuapp.com//register', options)
        .then(response => {
            if (response.status !== 200) {
                return response.json().then(data => {
                    throw new Error(data);
                });
            }
            return response.json();
        })
        .then(data => {
            const [{ category, message }, statusCode] = data;
            if (statusCode === 200) {
                document.getElementById('result').innerHTML = `<div class="alert alert-${category}">${message}</div>`;
            }
            const errorMessage = `${message}`;
            document.getElementById('result').innerHTML = `<div class="alert alert-${category}">${errorMessage}</div>`;
        })
        .catch(error => {
            document.getElementById('result').innerHTML = `<div class="alert alert-danger">${error}</div>`;
        });
    document.getElementById('form').addEventListener('submit', handleFormSubmit);
}

