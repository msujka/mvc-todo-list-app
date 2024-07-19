const formidable = require('formidable');
const todo = require('../model/todo.js');

const create = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields) => {
        if (err) {
            res.status(400).json({ error: 'Error parsing form data' });
            return;
        }

        const { description } = fields;

        if (!description) {
            res.status(400).json({ error: 'Description is required' });
            return;
        }

        try {
            const newTask = await todo.create(description);
            return res.status(201).send({ data: newTask });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    });
};

const read = async (req, res) => {

    try {
        const tasks = await todo.get();
        return res.json({ data: tasks });
    } catch (error) {
        res.status(500).json({ error: 'Error reading tasks' });
    }
};

const removeTodo = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await todo.remove(id);
        return res.status(200).send({ data: id });
    } catch (error) {
        res.status(500).json({ error: 'Error removing task' });
    }
};

module.exports = {
    create,
    read,
    removeTodo
};