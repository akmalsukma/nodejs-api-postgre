const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json());


app.get("/siswa", async (req, res) => {
    try {
        const siswa = await pool.query("SELECT * FROM siswa");

        res.json(siswa.rows);
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/siswa/:id", async (req, res) => {
    const {
        id
    } = req.params;
    try {
        // console.log(req.params);
        const siswas = await pool.query("SELECT * FROM siswa WHERE id = $1;", [id]);
        res.json(siswas.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
});

app.put("/siswa/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            nisn
        } = req.body;
        const {
            nama
        } = req.body;
        const {
            agama
        } = req.body;
        const {
            jenis_kelamin
        } = req.body;

        const updateSiswa = await pool.query("UPDATE siswa SET nisn = $2,nama = $3, agama = $4, jenis_kelamin = $5  WHERE id = $1", [id, nisn, nama, agama, jenis_kelamin])

        res.json("Todo was updated")

    } catch (error) {
        console.log(error.message);
    }
});
app.delete("/siswa/:id", async (req, res) => {
    const {
        id
    } = req.params;
    try {
        // console.log(req.params);
        const siswa = await pool.query("DELETE FROM siswa WHERE id = $1;", [id]);
        res.json("Siswa was deleted");

    } catch (error) {
        console.error(error.message);
    }
});



app.post('/siswa', async (req, res) => {
    try {
        const {
            nisn
        } = req.body;
        const {
            nama
        } = req.body;
        const {
            agama
        } = req.body;
        const {
            jenis_kelamin
        } = req.body;
        const siswa = await pool.query("INSERT INTO siswa (nisn,nama,agama,jenis_kelamin) VALUES ($1,$2,$3,$4) RETURNING *",
            [nisn, nama, agama, jenis_kelamin]
        );
        res.json(siswa);
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(3000, () => {
    console.log('server is listening on port 3000');
});