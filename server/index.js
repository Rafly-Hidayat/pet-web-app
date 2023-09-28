// Import NPM
const express = require("express");
const cors = require("cors");
const path = require("path");
const { faker } = require('@faker-js/faker/locale/id_ID');
const moment = require("moment/moment");

// Import file
const { models: { DataUser, User, Vet }, sequelize } = require('./model/index');

const app = express(); // Create express app
const port = 8000; // port localhost

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// set up cors
// const whiteList = [ 'https://www.google.com/', 'http://localhost:3000/' ];
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};
app.use(cors(corsOptions));

// syncrhonize database and set default values
(async () => {
    // syncrhonize the database with the defined models
    await sequelize.sync();

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

    // set default user
    const rowUsers = await User.count();
    if (rowUsers === 0) {
        // create a default user account
        await User.create({ username: 'tesUsername', password: 'tesPassword', fullName: 'tesFullName', email: 'tesEmail' });
    }
    const rowVet = await Vet.count();
    if (rowVet === 0) {
        // create a default vet account
        const defaultValues = [];
        const uniqueUserNames = new Set();

        while (defaultValues.length < 10) {
            const randomNumber = Math.floor(Math.random() * 22);
            const fullName = faker.person.fullName();
            const randomValue = {
                address: faker.location.streetAddress(),
                specialist: specialties[defaultValues.length],
                experience: randomNumber,
                treatedAnimals: animals[Math.floor(Math.random() * 10)],
                operationHours: '08:00 - 17:00',
                user: {
                    username: fullName,
                    password: fullName,
                    fullName,
                    email: faker.internet.email(),
                    role: 'vet',
                },
            };
            if (!uniqueUserNames.has(randomValue.user.username)) {
                defaultValues.push(randomValue);
                uniqueUserNames.add(randomValue.user.username);
            }
        }

        await Vet.bulkCreate(defaultValues, {
            include: [DataUser]
        })
    }

})();
console.log(path.join(__dirname, ''))
// import routes
const userRoutes = require('./routes/user.routes');
const vetRoutes = require('./routes/vet.routes');
const scheduleRoutes = require('./routes/schedule.routes');

// use routes
app.use('/user', userRoutes);
app.use('/vet', vetRoutes);
app.use('/schedule', scheduleRoutes);

app.listen(port, () => { console.log(`Server is running on port ${port}`) }); // listen port