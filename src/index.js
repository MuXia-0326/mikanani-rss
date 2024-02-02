/*
 * @Author: MuXia
 * @Date: 2024/02/02
 */
import express from 'express';

const app = express();

app.get('/RSS/Bangumi', async (req, res) => {
    let url = 'https://mikanani.me/RSS/Bangumi?' + new URLSearchParams(req.query).toString();

    await fetch(url)
        .then((response) => response.text())
        .then((data) => {
            let regex = /https:\/\/mikanani\.me(?!\/0\.1\/)/g;
            data = data.replace(regex, 'https://mikanani.mossia.top');

            res.type('application/xml; charset=utf-8');
            res.send(data);
        });
});

app.listen(9000, () => {
    console.log('Server running on port 9000');
});
