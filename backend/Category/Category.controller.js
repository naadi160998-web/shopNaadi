const express = require('express');
const router = express.Router();
const categoryService = require('./Category.services');

router.post('/', async (req, res) => {
    try {
        const data = await req.body;
        const category = await categoryService.createCategory(data);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const category = await categoryService.getCategory();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;