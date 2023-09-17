// Import NPM
const express = require("express");
const cors = require("cors");
const path = require("path");
const upload = require("express-fileupload");
const { faker } = require('@faker-js/faker/locale/id_ID');

// Import file
const db = require('./model/index');

const app = express(); // Create express app
const port = 8000; // port localhost

// use NPM
app.use("/public", express.static(path.join(__dirname, "/public"))); // Static folder for file public
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(upload({
    createParentPath: true
})); // use express-fileupload for upload file

// set up cors
// const whiteList = [ 'https://www.google.com/', 'http://localhost:3000/' ];
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};
app.use(cors(corsOptions));

// connecting route to database
(async () => {
    // syncrhonize the database with the defined models
    await db.sequelize.sync({ force: true });

    // set default vet table
    const specialties = [
        "Kesejahteraan Hewan",
        "Anesthesia and Analgesia",
        "Perilaku",
        "Kedokteran Gigi",
        "Dermatologi",
        "Perawatan Darurat dan Kritis",
        "Penyakit Dalam",
        "Laboratorium Kedokteran Hewan",
        "Mikrobiologi",
        "Nutrisi",
        "Oftalmologi",
        "Patologi",
        "Farmakologi",
        "Unggas",
        "Pengobatan Pencegahan",
        "Radiologi",
        "Kedokteran dan Rehabilitasi Olahraga",
        "Pembedahan",
        "Teriogenologi",
        "Toksikologi",
        "Praktisi Kedokteran Hewan",
        "Pengobatan Kebun Binatang"
    ];
    const animals = ['Kucing', 'Anjing', 'Kelinci', 'Burung', 'Reptil',
        'Hamster', 'Kuda', 'Sapi', 'Kambing', 'Bebek',]
    const rowVet = await db.models.Vet.count();
    if (rowVet === 0) {
        const defaultValues = [];

        while (defaultValues.length < specialties.length) {
            const randomNumber = Math.floor(Math.random() * 22);
            const randomValue = {
                address: faker.location.streetAddress(),
                specialist: specialties[defaultValues.length],
                experience: randomNumber,
                treatedAnimals: animals[Math.floor(Math.random() * 10)]
            };
            defaultValues.push(randomValue);
        }
        await db.models.Vet.bulkCreate(defaultValues)

    }

    // set default user
    const rowUsers = await db.models.User.count();
    if (rowUsers === 0) {
        // create a default user account
        await db.models.User.create({ username: 'tesUsername', password: 'tesPassword' });

        // create a default vet account
        const defaultValues = [];
        const uniqueUserNames = new Set();

        while (defaultValues.length < 100) {
            const fullName = faker.person.fullName();
            const randomValue = {
                username: fullName,
                password: fullName,
                fullName,
                email: faker.internet.email(),
                role: 'vet',
                idVet: Math.floor(Math.random() * 22),
            };
            if (!uniqueUserNames.has(randomValue.username)) {
                defaultValues.push(randomValue);
                uniqueUserNames.add(randomValue.username);
            }
        }

        await db.models.User.bulkCreate(defaultValues)
    }
})();

// import routes
const userRoutes = require('./routes/user');

// use routes
app.use('/user', userRoutes);

app.listen(port, () => { console.log(`Server is running on port ${port}`) }); // listen port