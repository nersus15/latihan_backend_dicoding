const fs = require('fs');

const readableStream = fs.createReadStream('./article.txt', {highWaterMark: 5});

readableStream.on('readable', () => {
    try{
        process.stdout.write(`[${readableStream.read()}]`);
    }catch(err){
        process.stdout.write(err.message);
    }
});

readableStream.on('end', () => {
    console.log('Done');
})