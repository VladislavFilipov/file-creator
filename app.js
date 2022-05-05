const express = require("express");
const app = express();

app.get("/", function (request, response) {
    response.send("<h2>Возможно здесь будет сервис для создания файлов</h2>");
});

app.listen(1234);