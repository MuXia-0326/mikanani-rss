/*
 * @Author: MuXia
 * @Date: 2024/02/02
 */
import express from 'express';
import Parser from 'rss-parser';
import builder from 'xmlbuilder';

let parser = new Parser();
const app = express();

app.get('/RSS/Bangumi', async (req, res) => {
    let url = 'https://mikanani.me/RSS/Bangumi?' + new URLSearchParams(req.query).toString();
    let feed = await parser.parseURL(url);

    feed.items.forEach((item) => {
        if (!item.link) {
            return;
        }
        if (!item.enclosure || !item.enclosure.url) {
            return;
        }

        item.link = item.link.replace('https://mikanani.me', 'https://mikanani.mossia.top');

        item.enclosure.url = item.enclosure.url.replace('https://mikanani.me', 'https://mikanani.mossia.top');
    });

    if (feed.link) {
        feed.link = feed.link.replace('http://mikanani.me', 'https://mikanani.mossia.top');
    }

    let newFeed = builder
        .create('rss', { version: '1.0', encoding: 'UTF-8' })
        .att('version', '2.0')
        .ele('channel')
        .ele('title', {}, feed.title)
        .up()
        .ele('link', {}, feed.link)
        .up()
        .ele('description', {}, feed.description)
        .up();

    feed.items.forEach((item) => {
        if (!item.enclosure) {
            return;
        }

        let itemEle = newFeed.ele('item');
        itemEle
            .ele('guid', { isPermaLink: 'false' }, item.title)
            .up()
            .ele('link', {}, item.link)
            .up()
            .ele('title', {}, item.title)
            .up()
            .ele('description', {}, item.description)
            .up()
            .ele('torrent', { xmlns: 'https://mikanani.me/0.1/' })
            .ele('link', {}, item.link)
            .up()
            .ele('contentLength', {}, item.contentLength)
            .up()
            .ele('pubDate', {}, item.pubDate)
            .up()
            .up()
            .ele('enclosure', { type: item.enclosure.type, length: item.enclosure.length, url: item.enclosure.url })
            .up();
    });

    let xml = newFeed.end({ pretty: true });

    res.type('application/xml; charset=utf-8');
    res.send(xml);
});

app.listen(9000, () => {
    console.log('Server running on port 9000');
});
