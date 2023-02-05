function handleFormSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const options = {
        method: 'POST',
        body: data
    };

    fetch('https://gepac-backend.herokuapp.com/login', options)
        .then(response => {
            if (response.status !== 200) {
                return response.json().then(data => {
                    throw new Error(data);
                });
            }
            return response.json();
        })
        .then(data => {
            const [{ category, message, token }, statusCode] = data;
            if (statusCode === 200) {
                localStorage.setItem('token', token);
                return window.location.href = 'index.html';
            }
            const errorMessage = `${message}`;
            document.getElementById('result').innerHTML = `<div class="alert alert-${category}">${errorMessage}</div>`;
        })
        .catch(error => {
            document.getElementById('result').innerHTML = `<div class="alert alert-danger">${error}</div>`;
        });
    document.getElementById('form').addEventListener('submit', handleFormSubmit);
}

