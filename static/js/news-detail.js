function newsDetail() {
    let urlParams = new URLSearchParams(window.location.search);
    let slug = urlParams.get("slug");
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/news/" + slug,
        dataType: "json",
        success: function (data) {
            let news = data;
            console.log(news)
            let news_table = $('#news-table');
            news_table.append(`
                <h1>${news.title}</h1> 
                <p>${news.resume}</p> 
                <div class="d-flex justify-content-center"> 
                <img src="${news.img_url}" alt="Imagem da notícia"> 
                </div> 
                <p style="margin-top:2%">${news.content}</p>`
            )
        }
    });
}
