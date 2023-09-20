// Import NPM
const express = require("express");
const cors = require("cors");
const path = require("path");
const { faker } = require('@faker-js/faker/locale/id_ID');
const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');


// Import file
const { models: { DataVet, User }, sequelize } = require('./model/index');

const app = express(); // Create express app
const port = 8000; // port localhost

// use NPM
// app.use("/public", express.static(path.join(__dirname, "/public"))); // Static folder for file public
// app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); // Static folder for file public
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
        await User.create({ username: 'tesUsername', password: 'tesPassword' });

        // create a default vet account
        const defaultValues = [];
        const uniqueUserNames = new Set();

        while (defaultValues.length < 10) {
            const randomNumber = Math.floor(Math.random() * 22);
            const fullName = faker.person.fullName();
            const randomValue = {
                username: fullName,
                password: fullName,
                fullName,
                email: faker.internet.email(),
                role: 'vet',
                dataVet: {
                    address: faker.location.streetAddress(),
                    specialist: specialties[defaultValues.length],
                    experience: randomNumber,
                    treatedAnimals: animals[Math.floor(Math.random() * 10)]
                },
            };
            if (!uniqueUserNames.has(randomValue.username)) {
                defaultValues.push(randomValue);
                uniqueUserNames.add(randomValue.username);
            }
        }

        await User.bulkCreate(defaultValues, {
            include: [DataVet]
        })
    }
})();
console.log(path.join(__dirname, ''))
// import routes
const userRoutes = require('./routes/user.routes');

// use routes
app.use('/user', userRoutes);

async function generateProfileImage(outputFilePath) {
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');

    // Background color and size
    ctx.fillStyle = '#3498db';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text color and font
    ctx.fillStyle = '#ffffff';
    ctx.font = '36px "Your Font Family"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Get the initials
    const initials = 'R';

    // Draw the initials
    ctx.fillText(initials, canvas.width / 2, canvas.height / 2);

    // Save the image to a file
    const imageStream = canvas.createPNGStream();
    const writeStream = fs.createWriteStream(outputFilePath);
    imageStream.pipe(writeStream);

    await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
}

generateProfileImage('uploads/tes.jpg')
    .then(() => {
        console.log('Profile image generated successfully.');
    })
    .catch((error) => {
        console.error('Error generating profile image:', error);
    });

app.listen(port, () => { console.log(`Server is running on port ${port}`) }); // listen port