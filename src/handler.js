const {nanoid} = require('nanoid');
const books = require('./books')

const addBooks = (request, h) => {
const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
const id = nanoid(16);
const insertedAt = new Date().toISOString();
const updatedAt = insertedAt;
let finished = false;
if(pageCount === readPage){
  finished =  true
}
const newBookShelf = {
  id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
}
books.push(newBookShelf);
const isSuccess = books.filter((item) => item.id === id).length > 0;
if(isSuccess){
  if(!newBookShelf.name){
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku"
    }
    )
    response.code(400);
    return response;
  }
  if(newBookShelf.readPage > newBookShelf.pageCount){
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    })
    response.code(400);
    return response;
  }
    
  const response = h.response({
  status: 'success',
  message: 'Buku berhasil ditambahkan',
  data: {
    bookId: id
  }
  })
  response.code(201);
  return response;
}
const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};


const getAllBooks = (request, h) => {
  const booksList = books.map(({ id, name, publisher}) => ({ id, name, publisher }));
  const {nama, reading, finished} = request.query;
  let filterBook = booksList;
  if(nama){
    const search = name.toLowerCase();
    filterBook = filterBook.filter((book) => book.nama.toLowerCase().includes(search));
  }
  if(reading === 0){
    filterBook = filterBook.filter((book) => book.reading.includes(search))
  }else if(reading === 1){
    filterBook = filterBook.filter((book) => book.reading.includes(search))
  }
  if(finished === 0){
    filterBook = filterBook.filter((book) => book.finished.includes(search))
  }else if(finished === 1){
    filterBook = filterBook.filter((book) => book.finished.includes(search))
  }

  return h.response({
  status: 'success',
  data:{
    books: filterBook
  }
  }).code(200);
};

const getBookById = (request, h) => {
  const {id} = request.params;

  const book = books.filter((n) => n.id === id)[0];
  if(book !== undefined){
    return h.response({
      status: 'success',
      data: { book }
    }) .code(200);
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak di temukan'
  })
  response.code(404);
  return response
}

const editBookById = (request, h) => {
  const {id} = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();
  let finished = false;
  const index = books.findIndex((book) => book.id === id);
      if(!name){
          const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
      response.code(400);
      return response;
      }
      if(readPage === pageCount){
        finished = true;
      }
      if(readPage > pageCount){
          const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari readCount'
        });
      response.code(400);
      return response;
      }
    
      if (index !== -1){
      books[index] ={
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished
    }

      const response = h.response({
          status: 'success',
          message: 'Buku berhasil diperbarui'
        });
      response.code(200);
      return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku id tidak ditemukan'
  });
  response.code(404);
  return response;
}

const deleteBookById = (request, h) => {
  const {id} = request.params;
  const index = books.findIndex((book) => book.id === id);

  if(index !== -1){
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapuss'
    })
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404);
  return response;
}



module.exports =  { addBooks, getAllBooks, getBookById, editBookById, deleteBookById } ;