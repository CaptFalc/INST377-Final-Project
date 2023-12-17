import axios from 'axios';
import cheerio from 'cheerio';

async function scrapeRecipe (url){
    try {
        const resp = await axios.get(url);
        const html = resp.data;

        const $ = cheerio.load(html);

        return html
    } catch(error) {
        console.error('Error Scraping recipe.')
        return []
    }

}