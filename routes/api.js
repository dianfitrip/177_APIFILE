const express = require('express');
const router = express.Router();
const multer = require('multer');
// Gunakan 'K' besar sesuai nama file fisik
const komikController = require('../controllers/KomikController');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/komik', upload.single('gambar'), komikController.createKomik);
router.get('/komik', komikController.getAllKomik);
router.get('/komik/:id', komikController.getKomikById);
router.put('/komik/:id', upload.single('gambar'), komikController.updateKomik);
router.delete('/komik/:id', komikController.deleteKomik);

module.exports = router;

//perpstakaan
