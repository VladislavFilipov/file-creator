require('dotenv').config();

const
    express = require('express'),
    app = express(),
    routes = require('./routes/index');

const host = process.env.CUR_SERVER_HOST;
const port = process.env.CUR_SERVER_PORT;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// app.get("/", function (req, res) {
//     res.send("<h2>Возможно здесь будет сервис для создания файлов</h2>");
// });
app.use('/api', routes);

app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
);