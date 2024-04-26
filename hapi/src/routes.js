const {addNoteHandler, viewNotesHandler, deleteNoteHandler, updateNoteHandler} = require('./handler');

const routes = [
    {
        method: ['GET'],
        path: '/',
        handler: () => "Hello Hapi"
    },
    {
        method: ['POST'],
        path: '/notes',
        handler: addNoteHandler
    },
    {
        method: ['GET'],
        path: '/notes/{id?}',
        handler: viewNotesHandler
    },
    {
        method: ['PUT'],
        path: '/notes/{id}',
        handler: updateNoteHandler
    },
    {
        method: ['DELETE'],
        path: '/notes/{id}',
        handler: deleteNoteHandler
    }
];

module.exports = routes;
