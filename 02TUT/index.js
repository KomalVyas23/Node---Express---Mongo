const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// fs.readFile('./files/lorem.txt', 'utf-8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// })

fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8', (err, data) => {
    if(err) throw err;
    console.log(data);
})

// Callback Hell
// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you.', (err) => {
//     if(err) throw err;
//     console.log("Write Complete");

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\n Yes it is.', (err) => {
//         if(err) throw err;
//         console.log("Append Complete");

//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
//             if(err) throw err;
//             console.log("Rename Complete");
//         })
//     })
// })

//Overcome Callback hell with promises
const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
        //Deleting a file
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'),data);
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'),data); 
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\n Nice to meet you!'); 
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf8');
        console.log(newData);
    }catch(err){
        console.log(err);
    }
}

fileOps();

//Node works asynchronously and hence o/p will be  Hello..  then file content
console.log("Hello.."); 

//exit on uncaught errors
process.on('uncaughtException', err => {
    console.error('There was an uncaught error: ' + err);
    process.exit(1);
})