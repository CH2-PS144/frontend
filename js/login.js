// You can remove the DOMContentLoaded event listener if the script is placed just before </body>

document.getElementById('loginButton').addEventListener('click', validateLogin);

function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check if both username and password are provided
    if (!username || !password) {
        alert('Data harus diisi!');
        return;
    }

    if (username === 'admin' && password === 'admin') {
        window.location.href = "../inputData.html";
    } else {
        alert('Password atau username salah, yuk coba lagi');
    }
}