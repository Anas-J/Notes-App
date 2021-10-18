const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter( (note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title);
    
    debugger
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes);
        console.log(chalk.green.inverse('Note was added'));
    } else {
        console.log(chalk.red.inverse('Note already exists'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    if (notes.length === 0) {
        console.log('Empty notes list!');
    } else {
        const newList = notes.filter((note) => note.title !== title);
        saveNotes(newList);
        if (newList.length === notes.length) {
            console.log(chalk.bgRed('No note found!'));
        } else {
            console.log(chalk.bgGreen("Note Removed!"));
        }
    }
}

const exportList = () => {
    const notes = loadNotes();
    console.log(chalk.bold.red('Your Notes'));
    notes.forEach(element => {
        console.log(element.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const getNote = notes.find((note) => note.title === title);

    if (getNote) {
        console.log(chalk.inverse.green(title));
        console.log(getNote.body);
    } else {
        console.log(chalk.inverse.red('Note not found!'))
    }
}

module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    exportList: exportList,
    readNote: readNote
}