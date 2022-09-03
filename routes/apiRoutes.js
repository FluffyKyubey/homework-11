const { json } = require('express')
const fs = require('fs')
const path = require('path')
const uuid = require('../helpers/uuid')
const router = require('express').Router()

router.get('/api/notes', (req,res) => {
    const notesData = fs.readFileSync(path.join(process.cwd(), "db/db.json"), "utf8");
    const parseData = JSON.parse(notesData)
    res.json(parseData)
})

router.post('/api/notes', (req,res)=> {
    console.log(`${req.method} added to notes`)

    const {title, text} = req.body

    if (title && tex) {
        const newNote = {
            title,
            text,
            id: uuid(),
        }

        const readNotes = fs.readFileSync(path.join(process.cwd(), '/db/db.json'), 'utf8')

        const parsedNotes = JSON.parse(readNotes);

        parsedNotes.push(newNote);

        fs.writeFileSync(
            path.join(process.cwd(), "db/db.json"),
            JSON.stringify(parsedNotes),
        );

        const respone = {
            status: 'Sucess',
            body: newNote,
        }
        res.status(201).json(respone)
    }else{
        res.status(500).json('Error in POST')
    }
})

router.delete('api/notes/:id', (req,res)=> {
    const deleteID = req.params.id
    const readNotes = fs.readFileSync(path.join(process.cwd(), db/db.json),  'utf8');
    const parsedNotes = JSON.parse(readNotes);

    console.log('Requested deleted id is', deleteID)

    if(deleteID) {
        for (let i = 0; i < parsedNotes.length; i++) {
            const currentID = parsedNotes[i]
            if (currentID === deleteID){
                const indexID = parsedNotes.indexOf(currentID)
                parsedNotes.splice(indexID, 1)
                fs/fs.writeFileSync(
                    path.join(process.cwd(), "db/db.json"),
                    JSON.stringify(parsedNotes),
                );
            }
        }
    }
    return res.json('note deleted')
})

module.exports = router