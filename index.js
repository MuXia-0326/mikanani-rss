/*
 * @Author: MuXia
 * @Date: 2024/02/02
 */
import express from 'express';
import Parser from 'rss-parser';

let parser = new Parser();
const app = express();

app.get('/RSS/Bangumi', async (req, res) => {
    let url = 'https://mikanani.me/RSS/Bangumi?' + new URLSearchParams(req.query).toString();
    let feed = await parser.parseURL(url);

    feed.items.forEach((item) => {
        item.link = item.link.replace('https://mikanani.me', 'https://mikanani.mossia.top');
        item.enclosure.url = item.enclosure.url.replace('https://mikanani.me', 'https://mikanani.mossia.top');
    });

    feed.link = feed.link.replace('http://mikanani.me', 'https://mikanani.mossia.top');

    res.json(feed);
});

app.listen(9000, () => {
    console.log('Server running on port 8000');
});
