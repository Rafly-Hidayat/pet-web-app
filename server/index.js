// Import NPM
const express = require("express");
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');
const session = require('express-session');

// Import file
const { models: { DataUser, User, Vet, Chat }, sequelize } = require('./model/index');

const app = express(); // Create express app
const port = 8000; // port localhost
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ["polling", "websocket"],
    allowEIO3: true,
    maxHttpBufferSize: 1e8
});


// session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Middleware to update last activity timestamp and check for auto-logout
app.use(async (req, res, next) => {
    console.log('sessionnnn oii  11', req.session)
    if (req.session.user) {
        console.log('sessionnnn oii  22')

        const maxInactivity = 0.1 * 60 * 1000; // 30 minutes in milliseconds
        const elapsedTime = Date.now() - req.session.user.lastActivity;

        if (elapsedTime > maxInactivity && req.session.user.id) {
            console.log('sessionnnn oii  33')
            // Log out the user by updating isLogin to false in the database
            try {
                await User.update({ isLogin: false }, {
                    where: { id: req.session.user.id },
                });
            } catch (error) {
                console.error('Error updating user:', error);
                // Handle the error appropriately, maybe redirect to an error page
                res.status(500).send('Internal Server Error');
            }
        }
    }

    next();
});

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
        await User.create({ username: 'tesUsername', password: 'tesPassword', fullName: 'tesFullName', email: 'tesEmail@email.com', image: 'uploads/T.jpg' });
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
                    image: 'uploads/profile1.jpg'
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
                    image: 'uploads/profile2.jpg'
                },
            },
        ]

        await Vet.bulkCreate(defaultVet, {
            include: [DataUser]
        })
    }

})();

const rooms = new Map();
io.on('connection', (socket) => {
    console.info('A user connected');

    socket.on('joinRoom', async (room) => {
        // Create the room in the Map if it doesn't exist
        if (!rooms.has(room)) {
            rooms.set(room, []);
        }

        // Join the room
        socket.join(room);
        const historyChat = await Chat.findAll({
            where: {
                roomId: room
            }
        });

        if (historyChat.length) {
            io.to(room).emit('update', historyChat);
        }
    });

    socket.on('message', async ({ from, room, message, date, userId, vetId }) => {

        const roomMessages = rooms.get(room);
        if (roomMessages) {
            roomMessages.push({ from, message, date });

            await Chat.create({ roomId: room, from, message, date, userId, vetId })
            io.emit('vetMessage', { from, room, message, date, vetId })
            io.to(room).emit('message', { from, room, message, date, vetId });
        }
    });

    socket.on('disconnect', (reason) => {
        console.info('A user disconnected', reason);
    });
});

// import routes
const userRoutes = require('./routes/user.routes');
const vetRoutes = require('./routes/vet.routes');
const scheduleRoutes = require('./routes/schedule.routes');
const chatRoutes = require('./routes/chat.routes');

// use routes
app.use('/user', userRoutes);
app.use('/vet', vetRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/chat', chatRoutes);

server.listen(port, () => { console.info(`Server is running on port ${port}`) }); // listen port