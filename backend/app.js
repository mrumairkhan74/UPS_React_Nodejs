const express = require('express');


// all router
const resultRouter = require('./routes/resultRouter');
const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/courseRouter');
const announcementRouter = require('./routes/announcementRouter');
const AssignmentRouter = require('./routes/AssignmentRouter');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const cors = require('cors')
const app = express();



app.use(cors({
    origin: "http://localhost:5173", // or the URL of your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// all Router
app.use('/user', userRouter); //  user Router
app.use('/course', courseRouter); // Course Router
app.use('/result',resultRouter); // Result Router
app.use('/announcement',announcementRouter); // Result Router
app.use('/assignment',AssignmentRouter); // Result Router

app.post('/logout',(req,res)=>{
    try {
        res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ error: "Internal server error" });
    }

})



app.listen(3000, () => {
    console.log('Server Running');
})