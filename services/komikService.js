async function createKomik(database, komikData) {
    // Gunakan destructuring field Bahasa Indonesia sesuai Postman & Model
    const { judul, deskripsi, penulis, imageType, imageName, imageData } = komikData;

    // Validasi input
    if (!judul || !deskripsi || !penulis) {
        throw new Error('Judul, deskripsi, dan penulis wajib diisi');
    }

    const newKomik = await database.Komik.create({
        judul,
        deskripsi,
        penulis,
        imageType: imageType || null,
        imageName: imageName || null,
        imageData: imageData || null,
    });

    return newKomik;
}

async function getAllKomik(database) {
    const komiks = await database.Komik.findAll();
    return komiks.map(k => {
        if (k.imageData) {
            k.imageData = k.imageData.toString('base64');
        }
        return k;
    });
}

// ... (Fungsi getKomikById, updateKomik, deleteKomik lainnya tetap sama, pastikan import module.exports benar)

async function getKomikById(database, id) {
    const komik = await database.Komik.findByPk(id);
    if (!komik) throw new Error('Komik tidak ditemukan');
    if (komik.imageData) komik.imageData = komik.imageData.toString('base64');
    return komik;
}

async function updateKomik(database, id, komikData) {
    const komik = await database.Komik.findByPk(id);
    if (!komik) throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
    await komik.update(komikData);
    return komik;
}

async function deleteKomik(database, id) {
    const komik = await database.Komik.findByPk(id);
    if (!komik) throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
    await komik.destroy();
    return { message: `Komik dengan ID ${id} berhasil dihapus` };
}

module.exports = {
    createKomik,
    getAllKomik,
    getKomikById,
    updateKomik,
    deleteKomik,
};