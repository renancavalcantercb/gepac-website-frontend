function parseJWT(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

function getStudentData() {
    const jwt = localStorage.getItem('token');
    const student = parseJWT(jwt);
    $.getJSON('https://gepac.netlify.app/subscribed/admin/' + student.id + '/view', function (data) {
        console.log(data);
    });
}


function disabledCPFandCourse() {
    var cpf = document.getElementById("cpf");
    var course = document.getElementById("course");
    cpf.disabled = true;
    course.disabled = true;
    cpf.style.backgroundColor = "#262626";
    course.style.backgroundColor = "#262626";
}