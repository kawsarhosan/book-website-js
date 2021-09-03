
const errorMessage = document.getElementById('error');
const bookShow = document.getElementById('book-show');

// onclick btn arrow function

const searchBook = () => {
    const searchBox = document.getElementById('search-field');
    const displayBook = document.getElementById('display-book');
    const searchBoxText = searchBox.value;
    

    if ( searchBoxText === ''){
        errorMessage.innerText = 'Please enter your book name!';
    }
    else{
        errorMessage.innerText= '';
        const url = `https://openlibrary.org/search.json?q=${searchBoxText}`;
   
        fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs))
    }

    bookShow.innerText = '';
    
    const divElement = document.getElementById('display-book');
    divElement.textContent = '';
    searchBox.value = '';
    
};

//show search results

const displayBooks = books =>{
    // console.log(books);
    const displayDiv = document.getElementById('display-book');
    
    if (books.length === 0) {
        error.innerText = 'No Result found';
    }

    else {
        const booksNum = books.slice(0, 30);


        bookShow.innerText = `Showing Top ${booksNum.length} Books`;

        booksNum.forEach(book => {
        
        const authorName = book?.author_name?.[0];
        const publisherName = book?.publisher?.[0];
    
        const cover_i = book.cover_i;
        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML= `
            
            <div class="card h-100">
                    <img  class="mx-auto" style="width: 150px;" src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body ">
                    <h5 class="card-title"><span class="fw-bold bg-suscess">Name:</span> ${book.title}</h5>
                    <p class="card-title"><span class="fw-bold bg-suscess">Author:</span> ${authorName?authorName:''}</p>
                    <p class="card-title"><span class="fw-bold bg-suscess">Publisher:</span> ${publisherName?publisherName: ''}</p>
                    <p class="card-title"><span class="fw-bold bg-suscess">First publish year:</span>${book.first_publish_year}</p>
                    
                </div>
            </div>
        `;
        
        displayDiv.appendChild(div);

    })
    
}
}
