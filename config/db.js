const db = require('../models');

async function connectDatabase(){
    try {
        await db.sequelize.authenticate();
        console.log('Database conected successfully');

        // GANTI 'force: true' JADI 'alter: true' agar tabel tidak dihapus terus
        await db.sequelize.sync({ alter: true }); 
        console.log('Database synchronized');

    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
}

module.exports = connectDatabase;