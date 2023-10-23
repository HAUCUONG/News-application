'use strict';

const newsContainer = document.querySelector('#news-container');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');
const pageNum = document.querySelector('#page-num');
let totalResults;

// Hàm ẩn các nút chuyển trang
const checkBtnPrev = function () {
  if (pageNum.textContent === '1') btnPrev.style.display = 'none';
  else {
    btnPrev.style.display = 'block';
  }
};

const checkBtnNext = function () {
  if (
    pageNum.textContent ===
    String(Math.ceil(totalResults / currentUser.pageSize))
  )
    btnNext.style.display = 'none';
  else {
    btnNext.style.display = 'block';
  }
};

// Hàm lấy dữ liệu theo quốc gia
const getNewsData = async function (country, page) {
  try {
    pageNum.textContent = page;

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=c8e894d0f842405994a1d20ee7f1d3d4`
    );
    const data = await response.json();

    if (data.status === 'error' && data.code === 'corsNotAllowed')
      throw new Error('Request phải được thực hiện trên localhost!');

    displayNewsList(data);
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
};

// Hàm hiển thị tin tức
const displayNewsList = function (data) {
  let html = '';
  totalResults = data.totalResults;

  checkBtnPrev();
  checkBtnNext();

  data.articles.forEach(article => {
    html += `
        <div class="flex-row flex-wrap">
          <div class="card mb-3">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src=${
                  article.urlToImage
                    ? article.urlToImage
                    : '/scripts/no-image-found.jpg'
                }
                  class="card-img" style='height: 100%'>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${article.title}</h5>
                  <p class="card-text">${article.description}</p>
                  <a href=${article.url} target='_blank'
                    class="btn btn-primary">View</a>
                </div>
              </div>
            </div>
          </div>
        </div>`;
  });

  newsContainer.innerHTML = html;
};

getNewsData('us', 1);

// Bắt sự kiện vào nút Next
btnNext.addEventListener('click', function () {
  getNewsData('us', ++pageNum.textContent);
});

// Bắt sự kiện vào nút Previous
btnPrev.addEventListener('click', function () {
  getNewsData('us', --pageNum.textContent);
});
