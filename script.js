const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const createCard = (title, author, pages, read) => {
    const cardHTML = `
      <div class="card">
        <button class="delete-button"><img src="images/close.svg"></button>
        <div class="book-header">
            <div class="title">${title}</div>
            <div class="author">${author}</div>
            <div class="pages">${pages} pp.</div>
        </div>
        <input type="checkbox" class="read-check"></input>
      </div>
    `; 

    document.querySelector(".card-container").insertAdjacentHTML("beforeend", cardHTML);

    const newCard = document.querySelector(".card-container").lastElementChild;
    const checkBox = newCard.querySelector(".read-check");
    const bookIndex = myLibrary.findIndex((book) => book.title === title);

    if (read === true) { 
        checkBox.checked = true;
    } else { 
        checkBox.checked = false;
    }
    
    const deleteButton = newCard.querySelector(".delete-button");

    deleteButton.addEventListener("click", e => { 
        const card = e.target.closest(".card");
        const title = card.querySelector(".title").textContent;
    
        console.log(title);
    
        card.remove()
        
        myLibrary.splice(bookIndex, 1);
        displayBooks();
    
    }); 

    checkBox.addEventListener("change", () => {
        if (checkBox.checked) { 
            myLibrary[bookIndex].read = true;
        } else { 
            myLibrary[bookIndex].read = false;
        }
    });

};


function displayBooks() { 

    document.querySelector(".card-container").innerHTML = "";   
    for (let i = 0; i < myLibrary.length; i++) { 
        createCard(myLibrary[i].title, myLibrary[i].author, myLibrary[i].pages, myLibrary[i].read);
    }
}

const addBookButton = document.querySelector(".new-book-button");
const addBookDialog = document.querySelector("#addBookDialog");
const cancelButton = document.querySelector("#cancel-button");
const addBookForm = document.querySelector("#confirm-book-button")

addBookButton.addEventListener("click", () => {
    addBookDialog.showModal(); 
});

cancelButton.addEventListener("click", () => {
    addBookDialog.close(); 
});


addBookForm.addEventListener("click", e => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    const newBook = {title, author, pages, read};
    addBookToLibrary(newBook);

    displayBooks();
    addBookDialog.close(); 

    const form = document.getElementById("add-book-form");

    form.querySelectorAll("input").forEach(input => {
        if (input.type == "checkbox") { 
            input.checked = false;
        } else { 
            input.value = "";
        }
            
    });

});

const newBook = new Book("Dune", "Frank Herbert", 800, true);
addBookToLibrary(newBook);
displayBooks();
