/*
* Implementation of the module design pattern to build a book lending app.
* By Chidiebere Ekennia
* Use any of the public methods to interact with the book store.
* The first attempt to access the store is to demonstrate encapsulation done with this design pattern
*/

let bookLender = (function () {
	let privateStore = [
		{name:'Da Vinci Code',author:"Dan Brown"},
		{name:'48 Laws of Power',author:"Robert Greene"},
		{name:'Digital Fortress',author:"Dan Brown"},
		{name:'The Art of Seduction',author:"Robert Greene"},
	];
	let privateLentBooks = [];
	let privateAddBook = function (book) {
		privateStore.push(book);
	};
	let privateFindBook = function (name) {
		let availableBook = privateStore.find(x=>x.name.toLowerCase() === name.toLowerCase());
		if (!availableBook) {
			let result = privateLentBooks.find(x=>x.name.toLowerCase() === name.toLowerCase());
			if (result) return {status:false,message:'Lent out'};
			return {status:false,message:'Unavailable'}
		}
		return {status:true,message:availableBook};
	}
	let privateLendBook = function (name) {
		let bookIndex = privateStore.findIndex(x=>x.name.toLowerCase() === name.toLowerCase());
		privateLentBooks.push(privateStore[bookIndex]);
		privateStore.splice(bookIndex,1); 
		return true;
	}
	let privateReturnBook = function (name) {
		let bookIndex = privateLentBooks.findIndex(x=>x.name.toLowerCase() === name.toLowerCase());
		if (bookIndex === -1) return console.log('This book has not been burrowed');
		privateStore.push(privateLentBooks[bookIndex]);
		privateLentBooks.splice(bookIndex,1); 
		console.log(`Successfully returned ${name}`);
	}
	return {
		publicListAvailableBooks : function () {
			console.log('Here are the available books:');
			privateStore.forEach( function(element) {
				console.log(`${element.name} by ${element.author}`);
			});
			console.log('\n');
		},
		publicListLentOutBooks : function () {
			console.log('Here are the lent out books:');
			privateLentBooks.forEach( function(element) {
				console.log(`${element.name} by ${element.author}`);
			});
			console.log('\n');
		},
		publicAddBook : function (name,author) {
			privateAddBook({name,author});
			console.log(`Successfully added ${name} by ${author}\n`);
		},
		publicRequestBook : function (name) {
			if (!privateFindBook(name).status) return console.log("This book is",privateFindBook(name).message);
			console.log('Here is your book: ',privateFindBook(name).message,"\n");
			privateLendBook(name);
		},
		publicReturnBook : function (name) {
			privateReturnBook(name);
			console.log('')
		}
	}
})();
// bookLender.publicAddBook('stars','chidi');
console.log(bookLender.privateStore);
bookLender.publicRequestBook('Da Vinci Code');
bookLender.publicListLentOutBooks();
