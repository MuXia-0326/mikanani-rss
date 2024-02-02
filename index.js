/*
 * @Author: MuXia
 * @Date: 2024/02/02
 */
import express from 'express';
import querystring from 'querystring';
import Parser from 'rss-parser';

let parser = new Parser();
const app = express();

app.get('/RSS/Bangumi', async (req, res) => {
    console.log(req.query);

    let url = 'https://mikanani.me/RSS/Bangumi?' + querystring.stringify(req.query);
    let feed = await parser.parseURL(url);

    console.log(feed);

    feed.items.forEach((item) => {
        item.link = item.link.replace('https://mikanani.me', 'http://mikanani.mossia.top');
        item.enclosure.url = item.enclosure.url.replace('https://mikanani.me', 'http://mikanani.mossia.top');
    });

    feed.link = feed.link.replace('https://mikanani.me', 'http://mikanani.mossia.top');

    res.json(feed);
});

app.listen(9000, () => {
    console.log('Server running on port 8000');
});
