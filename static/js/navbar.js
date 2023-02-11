function parseJWT(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

const jwt = localStorage.getItem('token')
if (jwt == null){
    const active = window.location.pathname === '/login' ? 'active' : '';
    $('.navbar-nav.ms-auto').append(`
    <li class="nav-item">
        <a class="nav-link mx-2 ${active}" href="login">Login</a>
    </li>
`);
}

else {
    const user = parseJWT(jwt);
    admin_page = (user.admin === true) ? '<li><a class="dropdown-item" href="/admin">Admin</a></li>' : '';
    $('.navbar-nav.ms-auto').append(`
            <li class="nav-item dropdown">
                <a class="nav-link mx-2 dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                   data-bs-toggle="dropdown" aria-expanded="false">
                   ${user.name}
                </a>    
                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="profile">Perfil</a></li>
                ${admin_page}
                <li><a class="dropdown-item" onClick=logout()>Logout</a></li>
                </ul>
            </li>
    `);
}

function logout() {
    event.preventDefault();
    localStorage.removeItem('token');
    const options = {
        method: 'POST'
    };

    fetch('https://gepac-backend.herokuapp.com/logout', options)
        .then(
            response => response.json(),
            window.location.href = '/'
            )
        }