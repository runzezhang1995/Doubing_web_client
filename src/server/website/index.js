import express from 'express';
import fs from 'fs';

const router = express.Router();


// only one page is required 
router.get('/demo/:config', (req, res) => {
    res.render('react', {
        js_host: global.jsHost,
        name: 'demo',
        title: 'Facial Emotion Detection',
    });
});


router.get('/demo', (req, res) => {
    res.redirect('/demo/home');
});

export default router;