const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//routes
const roleRoutes = require('./routes/role.routes');
const userRoutes = require('./routes/user.routes');
const kategoriSuratRoutes = require('./routes/kategori_surat.routes');
const klasifikasiDisposisiRoutes = require('./routes/klasifikasi_disposisi.routes');
const klasifikasiSuratRoutes = require('./routes/klasifikasi_surat.routes');
const sifatSuratRoutes = require('./routes/sifat_surat.routes');
const statusSuratRoutes = require('./routes/status_surat.routes');
const tindakanDisposisiRoutes = require('./routes/tindakan_disposisi.routes');
const pegawaiRoutes = require('./routes/pegawai.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/public', express.static(__dirname + '/uploads'))

app.get('/', (req,res)=> {
    res.send('welcome to api');
});

app.use('/role', roleRoutes);
app.use('/user', userRoutes);
app.use('/pegawai', pegawaiRoutes);
app.use('/kategori_surat', kategoriSuratRoutes);
app.use('/klasifikasi_disposisi', klasifikasiDisposisiRoutes);
app.use('/klasifikasi_surat', klasifikasiSuratRoutes);
app.use('/sifat_surat', sifatSuratRoutes);
app.use('/status_surat', statusSuratRoutes);
app.use('/tindakan_disposisi', tindakanDisposisiRoutes);

module.exports = app;