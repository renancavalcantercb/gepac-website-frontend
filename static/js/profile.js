function parseJWT(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

const API_URL = 'https://gepac-backend.herokuapp.com';

function getStudentData() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token not found');
        return;
    }

    const studentId = parseJWT(token).id;
    fetch(`${API_URL}/subscribed/admin/${studentId}/view`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updateStudentInfo(data);
        })
        .catch(error => {
            console.error('There was a problem fetching the data:', error);
        });
}

function updateStudentInfo(student) {
    document.getElementById('name').value = student.name;
    document.getElementById('email').value = student.email;
    document.getElementById('phone').value = student.phone;
    document.getElementById('birthdate').value = formatBirthdate(student.birthdate);
    document.getElementById('cpf').value = student.cpf;
    document.getElementById('course').value = getCourseValue(student.course);
}

function getCourseValue(course) {
    if (course === 1) {
        return "Selenografia - Prof. Heliomarzio"
    } else if (course === 2) {
        return "Física Estatística - Prof. Mairton"
    } else if (course === 3) {
        return "Python para Física - Prof. Renan Cavalcante"
    } else {
        return "Nenhum curso selecionado"
    }
}

function formatBirthdate(date) {
    const dateArray = date.split('-');
    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
}

function disabledCPFandCourse() {
    var cpf = document.getElementById("cpf");
    var course = document.getElementById("course");
    cpf.disabled = true;
    course.disabled = true;
    cpf.style.backgroundColor = "#262626";
    course.style.backgroundColor = "#262626";
}