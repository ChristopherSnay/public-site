const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const router = require('./router');

process.chdir(path.join(__dirname));
const port = process.env.PORT ?? 3001;

app.use(cors({
    origin: [
        'http://localhost:5173'
    ],
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use('/api', router);

// global error handling
app.use((err, _req, res, _next) => {
    console.error(err.stack); // Log the error
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});