import express from 'express';
import path from 'path';
const log = console.log;

const app = express();
app.use(express.static('public'));
app.get('/', (req, res) => {
    let fname = path.join(process.cwd, 'public', 'index.html');
    res.sendFile(fname);
});

app.listen(3000, () => {
    log('server listen', 3000);
});