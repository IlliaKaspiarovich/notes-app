const fs = require('fs')
const chalk = require('chalk')

const getIsNoteExist = (notes, title) => (
    notes.some((note) => note.title === title)
)

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const addNote = (title, body) => {
    const notes = loadNotes()

    if (getIsNoteExist(notes, title)) {
        console.log(chalk.bold.inverse.red('Note title taken'))
    } else {
        notes.push({
            title: title,
            body: body,
        })
        saveNotes(notes)
        console.log(chalk.bold.inverse.green('New note added!'))
    }    
}

const removeNote = (title) => {
    const notes = loadNotes()

    if (getIsNoteExist(notes, title)) {
        const notesToKeep = notes.filter(note => note.title !== title)
        saveNotes(notesToKeep)
        console.log(chalk.bold.inverse.green('Note removed!'))
    } else {
        console.log(chalk.bold.inverse.red('No note found!'))
    }    
}

const listNotes = () => {
    const notes = loadNotes()
    
    notes.forEach(({ title }) => {
        console.log(title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    
    if (note) {
        console.log(chalk.inverse.bold(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse.bold('No note found'))
    }
}

module.exports = { addNote, removeNote, listNotes, readNote }