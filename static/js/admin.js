function parseJWT(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

function checkIfAdmin() {
    const jwt = localStorage.getItem('token');
    if (jwt == null) {
        return false;
    }
    const user = parseJWT(jwt);
    if (user.admin !== true) {
        return false;
    }
    return true;
}

if (!checkIfAdmin()) {
    window.location.href = '/login.html';
}

function get_data() {
    $.getJSON("https://gepac-backend.herokuapp.com/user/admin", function (data) {
        students_data(data);
        users_data(data);
        news_data(data);
    });
}


function students_data(data) {
    let students = data.students;
    let table = $('#students-table');
    for (let i in students) {
        let student = students[i];
        table.append(`
<tr>
<td>${parseInt(i) + 1}</td>
<td>${student.name}</td>
<td>${student.email}</td>
<td>${student.course}</td>
<td>
                        <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                            data-bs-target="#edit_${student._id.$oid}">
                            Editar
                        </button>
                        <!-- The Modal -->
                        <div class="modal" id="edit_${student._id.$oid}">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <!-- Modal Header -->
                                    <div class="modal-header">
                                        <h4 class="modal-title">Editar Usuário</h4>
                                        <button type="button" class="btn btn-primary"
                                            data-bs-dismiss="modal">X</button>
                                    </div>

                                    <!-- Modal body -->
                                    <div class="modal-body">
                                        <form id="edit_${student._id.$oid}" onsubmit="editReq(event, 'subscribed/admin','${student._id.$oid}', 'student')">
                                        <div id="student_result"></div>
                                            <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label">Name:</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1"
                                                    aria-describedby="emailHelp" name="name"
                                                    value="${student['name']}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleInputEmail1"
                                                    class="form-label">Email:</label>
                                                <input type="email" class="form-control" id="exampleInputEmail1"
                                                    aria-describedby="emailHelp" name="email"
                                                    value="${student['email']}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label">Data de
                                                    Nascimento:</label>
                                                <input type="date" class="form-control" id="exampleInputEmail1"
                                                    aria-describedby="emailHelp" name="birthdate"
                                                    value="${student['birthdate']}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleInputEmail1"
                                                    class="form-label">Telefone:</label>
                                                <input type="tel" class="form-control" id="exampleInputEmail1"
                                                    aria-describedby="emailHelp" name="phone"
                                                    value="${student['phone']}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleInputEmail1"
                                                    class="form-label">Minicurso:</label>
                                                <select class="form-control mb-4" name="course" id="pass"
                                                    required>
                                                    <option value="0">Nenhum</option>
                                                    <option value="1">Selenografia - Prof. Heliomarzio</option>
                                                    <option value="2">Física Estatística - Prof. Mairton
                                                        Cavalcante
                                                    </option>
                                                    <option value="3">Python para física - Prof. Renan
                                                        Cavalcante
                                                    </option>
                                                </select>
                                            </div>

                                            <!-- Modal footer -->
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">
                                                    Fechar
                                                </button>
                                                <form id="subscribed-edit">
                                                    <input type="submit" value="Editar" class="btn btn-danger">
                                                </form>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Button to Open the Modal -->
                        <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                            data-bs-target="#del_${student._id.$oid}">
                            Deletar
                        </button>
                        <!-- The Modal -->
                        <div class="modal" id="del_${student._id.$oid}">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <!-- Modal Header -->
                                    <div class="modal-header">
                                        <h4 class="modal-title">Deletar usuário</h4>
                                        <button type="button" class="btn btn-primary"
                                            data-bs-dismiss="modal">X</button>
                                    </div>

                                    <!-- Modal body -->
                                    <div class="modal-body">
                                        Você tem certeza que deseja deletar o usuário ${student.email}?
                                    </div>

                                    <!-- Modal footer -->
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Fechar
                                        </button>
                                        <form id="subscribed-delete" onsubmit="deleteReq(event,'subscribed/admin' , '${student._id.$oid}')">
                                            <input type="submit" value="Deletar" class="btn btn-danger">
                                         </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </td>
</tr>
`);
    }
};

function searchBar(event) {
    event.preventDefault();
    var searchTerm = document.getElementById('search-bar')

    if (searchTerm.value === '') {
        location.reload();
    }

    const term = searchTerm.value;
    const apiUrl = `https://gepac-backend.herokuapp.com/subscribed/admin/search=${term}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let table = $('#students-table');
            table.empty();
            students_data(data);
        })
        .catch(error => {
            console.error(error);
        });
}

function users_data(data) {
    let users = data.users;
    let table = $('#users-table');
    for (let i in users) {
        let user = users[i];
        table.append(`
        <tr>
        <td>${parseInt(i) + 1}</td>
<td>${user.email}</td>
<td>${user.admin}</td>
        <td>
            <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                data-bs-target="#edit_${user._id.$oid}">
                Editar
            </button>
            <!-- The Modal -->
            <div class="modal" id="edit_${user._id.$oid}">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Editar Usuário</h4>
                            <button type="button" class="btn btn-primary"
                                data-bs-dismiss="modal">X</button>
                        </div>
                        <!-- Modal body -->
                        <div class="modal-body">
                            <form id="edit-user" onsubmit="editReq(event, 'user/admin', '${user._id.$oid}', 'user')">
                            <div id="user_result"></div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1"
                                        class="form-label">Email:</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" name="email"
                                        value="${user['email']}">
                                </div>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" name="admin" class="form-check-input"
                                        id="exampleCheck1" ${user['admin'] === 'Admin' ? 'checked' : ''}>
                                    <label class="form-check-label"
                                        for="exampleCheck1">Admin</label>
                                </div>


                                <!-- Modal footer -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">
                                        Fechar
                                    </button>
                                    <input type="submit" value="Salvar" class="btn btn-primary">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Button to Open the Modal -->
            <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                data-bs-target="#del_${user._id.$oid}">
                Deletar
            </button>
            <!-- The Modal -->
            <div class="modal" id="del_${user._id.$oid}">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Deletar usuário</h4>
                            <button type="button" class="btn btn-primary"
                                data-bs-dismiss="modal">X</button>
                        </div>

                        <!-- Modal body -->
                        <div class="modal-body">
                            Você tem certeza que deseja deletar o usuário ${user['email']}?
                        </div>

                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success"
                                data-bs-dismiss="modal">Fechar
                            </button>
                                <form id="user-delete" onsubmit="deleteReq(event, 'user/admin', '${user._id.$oid}')">
                                    <input type="submit" value="Deletar" class="btn btn-danger">
                                 </form>
                        </div>
                    </div>
                </div>
            </div>
        </td>
    </tr>
    `);

    }
}

function editReq(event, from, id, result) {
    event.preventDefault();

    const data = new FormData(event.target);
    const options = {
        method: 'POST',
        body: data
    };

    const apiUrl = `https://gepac-backend.herokuapp.com/${from}/${id}/edit`;
    result = `${result}_result`;
    fetch(apiUrl, options)
        .then(response => {
            if (response.status !== 200) {
                return response.json().then(data => {
                    throw new Error(data);
                });
            }
            return response.json();
        })
        .then(data => {
            const [{category, message}, statusCode] = data;
            if (statusCode === 200) {
                document.getElementById(result).innerHTML = `<div class="alert alert-${category} col-12">${message}</div>`;
                setTimeout(function () {
                        location.reload();
                    }
                    , 2000);
            }
            const errorMessage = `${message}`;
            document.getElementById(result).innerHTML = `<div class="alert alert-${category} col-12">${errorMessage}</div>`;
        })
        .catch(error => {
            document.getElementById(result).innerHTML = `<div class="alert alert-danger col-12">${error}</div>`;
        });
}

function createReq(event, from, result) {
    event.preventDefault();

    const data = new FormData(event.target);
    const options = {
        method: 'POST',
        body: data
    };

    const apiUrl = `https://gepac-backend.herokuapp.com/${from}/create`;
    result = `${result}_result`;
    fetch(apiUrl, options)
        .then(response => {
            if (response.status !== 200) {
                return response.json().then(data => {
                    throw new Error(data);
                });
            }
            return response.json();
        })
        .then(data => {
            const [{category, message}, statusCode] = data;
            if (statusCode === 200) {
                document.getElementById(result).innerHTML = `<div class="alert alert-${category} col-12">${message}</div>`;
                setTimeout(function () {
                        location.reload();
                    }
                    , 2000);
            }
            const errorMessage = `${message}`;
            document.getElementById(result).innerHTML = `<div class="alert alert-${category} col-12">${errorMessage}</div>`;
        })
        .catch(error => {
            document.getElementById(result).innerHTML = `<div class="alert alert-danger col-12">${error}</div>`;
        });
}

function news_data(data) {
    let news = data.posts;
    let table = $('#news-table');
    for (let i in news) {
        let newss = news[i];
        table.append(`
        <tr>
                            <td>${parseInt(i) + 1}</td>
                            <td>${newss.title}</td>
                            <td>${newss.author}</td>
                            <td>${newss.resume}</td>
                            <td>
                                <a href="https://gepac.netlify.app/news-detail?slug=${newss.slug}" target="_blank" class="btn btn-primary">Visualizar</a>
                                <div>
                                    <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                                        data-bs-target="#edit_${newss['_id']}">
                                        Editar
                                    </button>
                                    <!-- The Modal -->
                                    <div class="modal" id="edit_${newss['_id']}">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <!-- Modal Header -->
                                                <div class="modal-header">
                                                    <h4 class="modal-title">Editar Notícia</h4>
                                                    <button type="button" class="btn btn-primary"
                                                        data-bs-dismiss="modal">X
                                                    </button>
                                                </div>
                                                <!-- Modal body -->
                                                <div class="modal-body">
                                                    <form onsubmit="editReq(event, 'news', '${newss['_id']}', 'news')">
                                                    <div id="news_result"></div>
                                                        <div class="text-center pt-3">
                                                            <p class="display-7 fw-bold">Visualizar/Editar Notícia</p>
                                                        </div>
                                                        <div class="row px-md-4 px-1 m-0">
                                                            <div class="col-12">
                                                                <div>
                                                                    <p class="pb-1 username"></p>
                                                                    <input type="text" class=" name form-control mb-4"
                                                                        placeholder="Title" name="title" required
                                                                        value="${newss['title']}">
                                                                </div>
                                                            </div>
                                                            <div class="col-12">
                                                                <input type="text" class="form-control mb-4"
                                                                    name="resume" placeholder="Resumo"
                                                                    value="${newss['resume']}" required>
                                                            </div>
                                                            <div class="col-12">
                                                                <textarea class="form-control mb-4" name="content"
                                                                    rows="5" placeholder="Conteúdo"
                                                                    required>${newss['content']}</textarea>
                                                            </div>
                                                            <div class="col-12">
                                                                <input type="text" class="form-control mb-4"
                                                                    name="img_url" placeholder="Link da Imagem"
                                                                    value="${newss['img_url']}" required>
                                                            </div>
                                                            <div class="col-12"><input type="text"
                                                                    class="form-control mb-4" name="author"
                                                                    placeholder="Author" value="${newss['author']}"
                                                                    required>
                                                            </div>
                                                            <div class="col-12"
                                                                style="display: flex; justify-content: center; padding-top: 10px;">
                                                            </div>
                                                        </div>
                                                        <div class="text-center">
                                                            <input type="submit" value="Salvar" class="btn btn-primary">
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <!-- Button to Open the Modal -->
                                <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                                    data-bs-target="#del_${newss['_id']}">
                                    Deletar
                                </button>
            </div>
            <!-- The Modal -->
            <div class="modal" id="del_${newss['_id']}">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Deletar Notícia</h4>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">X</button>
                        </div>

                        <!-- Modal body -->
                        <div class="modal-body">
                            Você tem certeza que deseja deletar essa notícia?
                        </div>

                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar
                            </button>
                            <form onsubmit="deleteReq(event, 'news','${newss['_id']}')">
                                <input type="submit" value="Deletar" class="btn btn-danger">
                             </form>
                        </div>

                    </div>
                </div>
            </div>

            </td>
            </tr>
    `);

    }
}

function deleteReq(event, from, id, result) {
    event.preventDefault();
    let apiUrl = `https://gepac-backend.herokuapp.com/${from}/${id}/delete`;


    const data = new FormData(event.target);
    const options = {
        method: 'POST',
        body: data
    };
    result = `${result}_result`;
    fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            const [{category, message}, statusCode] = data;
            if (statusCode === 200) {
                document.getElementById(result).innerHTML = `<div class="alert alert-${category} col-12">${message}</div>`;
                setTimeout(function () {
                        location.reload();
                    }
                    , 2000);
            }
            const errorMessage = `${message}`;
            document.getElementById(result).innerHTML = `<div class="alert alert-${category} col-12">${errorMessage}</div>`;
        }).catch(error => {
            console.log(error);
        }
    );
}
