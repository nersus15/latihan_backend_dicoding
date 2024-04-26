const { nanoid } = require('nanoid');
const {validator} = require('./utils');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const _posts = request.payload;
    //Validate Input
    const config = {
        "title": [
            {
                type: 'required'
            }
        ],
        "tags": [
            {
                type: 'required'
            }
        ],
        "body": [
            {
                type: 'required'
            }
        ]
    }
    const resJson = {};
    try {
        validator(_posts, config);

        let nid = nanoid(16);
        const currentDateTime =  new Date().toISOString();
        notes.push({..._posts, id: nid, createdAt: currentDateTime, updateAt: currentDateTime});

        resJson.status = 'success';
        resJson.message = 'Catatan berhasil ditambahkan';
        resJson.data = {
            noteId: nid
        }
    } catch (error) {                
        resJson.status = 'error';
        resJson.message = 'Catatan gagal ditambahkan';
        resJson.error = error.message;
    }

    const response = h.response(resJson).type('application/json');
    response.statusCode = resJson.status == 'error' ? 500 : 201;
    return response
}

const viewNotesHandler = (req, h) => {

    const resJson = {
        status: 'success',
        data: {

        }
    }
    let statusCode = 200;

    if(req.params.id){
        const filtered = notes.filter( a => a.id = req.params.id);
        if(filtered.length == 0){
            resJson.status = 'fail';
            statusCode = 404;
            resJson.message = `Catatan dengan id '${req.params.id}' tidak ditemukan`
        }else{
            resJson.data['note'] = filtered[0];
        }


    }else{
        resJson.data['notes'] = notes;
    }
    const response = h.response(resJson).type('application/json');
    response.statusCode = 200;
    return response;
}

const updateNoteHandler = (request, h) => {
    const _posts = request.payload;
    const {id} = request.params;

    //Validate Input
    const config = {
      
    }
    const resJson = {};

    let statusCode = 200;
    try {
        validator(_posts, config);
        const index = notes.findIndex(note => note.id == id)
       
        if(index == -1){
            throw new Error(`Catatan dengan id '${id}' tidak ditemukan`);
        }
        const note = notes[index];

        notes.splice(index, 1, {...note, ..._posts});

        resJson.status = 'success';
        resJson.message = `Catatan dengan id '${id}' berhasil diperbarui`;
       
    } catch (error) {
        if(error.name == 'InvalidInput')
            statusCode = 500;
        else
            statusCode = 404;
                    
        resJson.status = 'error';
        resJson.message = 'Catatan gagal diperbarui';
        resJson.error = error.message;
    }

    const response = h.response(resJson).type('application/json');
    response.statusCode = statusCode;
    return response
}
const deleteNoteHandler = (request, h) => {
    const {id} = request.params;
    const index = notes.findIndex(note => note.id == id);

    const responseJson = {}
    let statusCode;


    if(index == -1){
        statusCode = 404;
        responseJson.status = 'error',
        responseJson.message = `Catatan dengan id '${request.params.id}' tidak ditemukan`;
    }else{
        notes.splice(index, 1);
        statusCode = 200;
    }

    responseJson.status = 'success';
    responseJson = `Catatan dengan id '${request.params.id}' berhasil dihapus`;

    const response = h.response(responseJson).type('application/json');
    response.statusCode = statusCode;

    return response;
}


module.exports = {addNoteHandler, viewNotesHandler, updateNoteHandler, deleteNoteHandler};