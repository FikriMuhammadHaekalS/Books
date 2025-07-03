const { addBooks, getAllBooks, getBookById, editBookById, deleteBookById } = require('./handler') 
const routes = [ {
  method: 'POST',
  path: '/books',
  handler: addBooks,
  options: {
    cors: {
      origin: ['*'],
    }
  }
},
{
  method: 'GET',
  path: '/books',
  handler: getAllBooks
},
{
  method: 'GET',
  path: '/books/{id}',
  handler: getBookById
},
{
  method: 'PUT',
  path: '/books/{id}',
  handler: editBookById
},
{
  method: 'DELETE',
  path: '/books/{id}',
  handler: deleteBookById
}
];

module.exports = routes;