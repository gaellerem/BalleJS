import express from 'express';

const app = express();
const port = 3000;

app.listen(port, () => {
console.log(`Server listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.json({ message: 'Hello World JSON!' })
});