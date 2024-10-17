require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const app = express();
const dbConnect = require("./db/dbConnect");
const { scheduleDailyReminders } = require('./services/notificationService');

const authRoutes = require('./routes/auth.route');
const habitRoutes = require('./routes/habit.route');
const notificationRoutes = require('./routes/notification.route');
const adminRoutes = require('./routes/admin.route');



//body
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

//cookie
app.use(cookieParser());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

// Start daily reminder scheduler
scheduleDailyReminders();

//database connect
dbConnect();

// swagger Ui
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: ' Habit_Tracker_Application  API',
        version: '1.0.0',
        description: 'API for managing Habit_Tracker_Application',
    },
    servers: [
        {
            url: 'http://localhost:5000/api', // Replace with your API base URL
        },
    ],
};

// Options for Swagger JSDoc
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/admin.route.js', './routes/auth.route.js', './routes/habit.route.js', './routes/notification.route.js'], // Path where API routes are defined
};

// Initialize SwaggerJSDoc
const swaggerSpec = swaggerJsdoc(options);

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// get
app.get("/", (req, res) => {
    res.send(
        "<center><h1>Habit Tracker Application</h1><br>Get Habit-Tracker Api <a href=https://github.com/yashika277/habit_tracker_application.git target=_blank>Repository :Habit Tracker Application</a></center>"
    );
});



//server
app.listen(process.env.PORT, () => {
    console.log(`server listening on port : ${process.env.PORT}`);

})