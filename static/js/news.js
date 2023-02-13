function get_news_data() {
    $.getJSON("https://gepac-backend.herokuapp.com/news", function (data) {
        let news_table = $('#news-table');
        for (let i = 0; i < data.length; i++) {
            let news = data[i];
            news_table.append(`
<div class="card p-3 mb-4">
   <div class="row">
      <div class="col-md-4">
         <div class="position-relative snipimage">
            <a
               href="news-detail?slug=${news.slug}"
               target="_blank">
            <img src=${news.img_url} class="rounded img-fluid w-100 img-responsive"></a>
         </div>
      </div>
      <div class="col-md-8">
         <div class="mt-2">
            <a>
               <div class="d-flex justify-content-between align-items-center">
                  <h5 class="mb-1">${news.title}</h5>
               </div>
            </a>
            <p class="mb-1">${news.resume}</p>
            <div class="d-flex flex-row mt-3 align-items-center">
               <img src="https://avatars.githubusercontent.com/u/78670350?s=400&u=ef6b8b8f8ddbbd11311adbe8be5b6c24f5556ec0&v=4" width="50" class="rounded-circle">
               <div class="ms-2 d-flex flex-column">
                  <div class="d-flex flex-row align-items-center">
                     <h6>${news.author}</h6>
                  </div>
                  <span class="days-ago">${news.date_posted}</span>
               </div>
               <div class="ms-auto">
                  <span><i class="bi-heart" data-news-id="${news._id}"></i> ${news.likes}</span>
                  <span><i class="bi-eye-fill" id="views-count" data-news-id="${news._id}"></i> ${news.views}</span>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
            `);
        }
        like();
        view();
    });
}

function parseJWT(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

function isLogged() {
    const jwt = localStorage.getItem('token')
    if (jwt == null) {
        return false
    } else {
        return true
    }
}

function like() {
    let heart_icons = document.querySelectorAll('.bi-heart');
    heart_icons.forEach((heart_icon) => {
        let like_count = heart_icon.nextSibling.textContent.trim();
        heart_icon.addEventListener('click', function () {
            if (isLogged()) {
                const newsId = $(this).data("news-id");
                const token = localStorage.getItem('token');
                const studentId = parseJWT(token).id;
                $.post(`https://gepac-backend.herokuapp.com/news/${newsId}/like`, {student_id: studentId}, function (data) {
                    like_count++;
                    heart_icon.nextSibling.textContent = like_count;
                });
                $(this).toggleClass("bi-heart bi-heart-fill");
            } else {
                alert("Você precisa estar logado para curtir esta notícia.");
            }
        });
    });
}


function view() {
    let newsLinks = document.querySelectorAll('.snipimage a');
    newsLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            const newsId = $(this).parents('.card').find('#views-count').data('news-id');
            $.post(`https://gepac-backend.herokuapp.com/news/${newsId}/views`, function (data) {
            });
        });
    })
}