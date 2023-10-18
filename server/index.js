// Import NPM
const express = require("express");
const cors = require("cors");
const path = require("path");

// Import file
const { models: { DataUser, User, Vet }, sequelize } = require('./model/index');

const app = express(); // Create express app
const port = 8000; // port localhost

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// set up cors
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};
app.use(cors(corsOptions));

// syncrhonize database and set default values
(async () => {
    await sequelize.sync();
    // set default user
    const rowUsers = await User.count();
    if (rowUsers === 0) {
        // create a default user account
        await User.create({ username: 'tesUsername', password: 'tesPassword', fullName: 'tesFullName', email: 'tesEmail@email.com' });
    }

    // set default vet
    const rowVet = await Vet.count();
    if (rowVet === 0) {
        // create a default vet account
        const defaultVet = [
            {
                experience: Math.floor(Math.random() * 22),
                operationHours: '08:00 - 17:00',
                operationDays: JSON.stringify(['Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu', 'Minggu']),
                user: {
                    username: 'Puji',
                    password: 'Puji321',
                    fullName: 'Drh. Puji hertina ika wahyuni',
                    role: 'vet',
                },
            },
            {
                experience: Math.floor(Math.random() * 22),
                operationHours: '08:00 - 17:00',
                operationDays: JSON.stringify(['Rabu']),
                user: {
                    username: 'Margaret',
                    password: 'Margaret321',
                    fullName: 'Drh. Margaret danik gultom',
                    role: 'vet',
                },
            }
        ]

        await Vet.bulkCreate(defaultVet, {
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