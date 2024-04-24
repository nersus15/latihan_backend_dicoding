const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const writer = fs.createWriteStream(path.resolve(__dirname,'output.txt'));
// Read File 
const readStream = fs.createReadStream(path.resolve(__dirname, 'input.txt'), {highWaterMark: 15, encoding: 'utf-8'});

const chunks = []

readStream.on('readable', () => {
    // Write stream
    try{
        const buffer = readStream.read();
        if(buffer == null)
            throw new Error('Null');
        writer.write(`${buffer.trim()}\n`)
    }catch(err){
        writer.end();
    }
});
