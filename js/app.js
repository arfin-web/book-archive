//add click handler to search button and fetch data from API
document.getElementById('search-button').addEventListener('click', () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;

    if (searchText.length == '') {
        alert('Please Enter Something for search');
    } else {
        searchBox.value = '';
        const url = `https://openlibrary.org/search.json?q=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data.docs))
    }
})

//display search result 
const displayResult = (books) => {
    const resultContainer = document.getElementById('show-result');
    resultContainer.textContent = '';
    const bookCount = document.getElementById('book-count');
    bookCount.innerHTML = `<span class="fs-3 fw-bold text-success">Show Result:</span> ${books.length} Books Found`;

    books?.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                 <div class="card border-0 shadow-lg rounded-3">
                    <div class="card-header">
                    <img src="${`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}" class="card-img-top" alt="...">
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item fs-2"><span class="text-success fs-1">Name:</span> ${book.title ? book.title : ''}</li>
                        <li class="list-group-item fs-3"><span class="text-success fs-2">Author:</span> ${book.author_name ? book.author_name : ''}</li>
                        <li class="list-group-item fs-4"><span class="text-success fs-3">Published:</span> ${book.publish_date ? book.publish_date : ''}</li>
                    </ul>
                </div>
        `;
        resultContainer.appendChild(div);
    })
}