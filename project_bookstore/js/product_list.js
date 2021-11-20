// For banner Carousel
let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((el) => {
    const minPerSlide = 6
    let next = el.nextElementSibling
    for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})


//For book search
const row = document.getElementById('book-search')
const key = "AIzaSyDgRDYqwNBJPN87HDc87Hkcs5gb00fe0uw"   
const resultsNum = document.getElementById('result-num')
const searchForm = document.querySelector('#search-bar-input')
const searchText = document.querySelector('#search-bar-input > input')
const searchResults = document.querySelector('.book-list')
resultsNum.innerText = 0

searchText.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        event.preventDefault();
        // Do more work
        // create a function to remove all child nodes
        function removeAllChildNodes(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }

        // call function to remove child nodes from previous search
        removeAllChildNodes(row);
        resultsNum.innerText = 0

        // construct query text using form data from search bar
        let queryText = ""
        queryText = searchText.value.replace(/\s/g, '+')

        getData(queryText);

        searchResults.scrollIntoView(); // {block:"nearest", behavior:"smooth"}
    }
});


async function getData(queryText) {
    // const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=' + key)
    // queryText = searchText.value.replace(/\s/g, '+')
    console.log('queryText =' + queryText)

    const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + queryText + '&key=' + key)
    const data = await response.json();
    const books = data.items;
    let resultsCount = books.length
    resultsNum.innerText = resultsCount
    console.log(resultsNum)


    // console.log(data)
    console.log(books);

    books.forEach(book => {

        const title = book.volumeInfo.title
        console.log(title)

        const authors = book.volumeInfo.authors
        console.log(authors.join(", "))

        // console.log(book.contributor[1])

        // const isbn = book.volumeInfo.industryIdentifiers.find(identifier => identifier.type == "ISBN_10").identifier;
        // console.log(isbn)

        // const bookCoverUrl = "https://covers.openlibrary.org/b/isbn/" + isbn + "-S.jpg"
    });

    // if fetch is successful
    if (response.status >= 200 && response.status < 400) {

        books.forEach(book => {
            // Create a div for each column
            const column = document.createElement('div')
            column.setAttribute('class', 'col-md-4 col-lg-3')

            // Create a div for each card
            const card = document.createElement('div')
            card.setAttribute('class', 'card')

            // Create a div for each card-img
            const cardImg = document.createElement('div')
            cardImg.setAttribute('class', 'card-img')

            // Create a div for each card-body
            const cardBody = document.createElement('div')
            cardBody.setAttribute('class', 'card-body')

            const authors = book.volumeInfo.authors
            const authorName = authors.join(", ")
            // const isbn = book.volumeInfo.industryIdentifiers.find(identifier => identifier.type == "ISBN_10").identifier;

            // create bookCover and set cover imageurl
            const bookCover = document.createElement('img')
            bookCover.setAttribute('class', 'img-fluid')

            // const bookCoverUrl = "https://covers.openlibrary.org/b/isbn/" + isbn + "-M.jpg"

            try{
            const bookCoverUrl = book.volumeInfo.imageLinks.thumbnail
            bookCover.src = bookCoverUrl
            } catch (error) {
                console.error(error)
            }

            // Create an h4 and set the text content to the title
            const title = book.volumeInfo.title
            const bookTitle = document.createElement('h5')
            bookTitle.setAttribute('class', 'card-title')
            bookTitle.textContent = title

            // Create a p and set the text content to the authors name
            const bookAuthors = document.createElement('p')
            bookAuthors.setAttribute('class', 'card-text')
            bookAuthors.innerText = `Author: ${authorName}`

            // Append the cards to the container element
            row.appendChild(column)
            column.appendChild(card)
            card.appendChild(cardImg)
            card.appendChild(cardBody)

            // Each card will contain an h1 and a p
            cardBody.appendChild(bookTitle)
            cardImg.appendChild(bookCover)
            cardBody.appendChild(bookAuthors)

        })
    } else {
        console.log('error')
    }

}
// getData();





