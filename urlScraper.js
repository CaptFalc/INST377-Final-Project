const axios = require('axios');
const cheerio = require('cheerio');

export {
    scrapeRecipe
}

function findInstructions(obj) {
    for (const key in obj) {
        if (key === 'recipeInstructions') {
            return obj[key];
        } else if (typeof obj[key] === 'object') {
            const result = findInstructions(obj[key]);
            if (result) {
                return result;
            }
        }
    }
}

function instructionFormatter(obj) {
    formattedInstructions = []
    index = 1
    for (key in obj) {
        if(obj[key]['@type'] === 'HowToSection') {
            nestedInstructions = obj[key].itemListElement.map(item => item.text)
            formattedInstructions.push([
                obj[key].name,
                nestedInstructions
            ]);
        } else {
            formattedInstructions.push(obj[key].text);
        }
    }
    return formattedInstructions
}

async function scrapeRecipe (url){
    try {
        const resp = await axios.get(url);
        const html = resp.data;

        const $ = cheerio.load(html);
        const recipeScript = $('script[type="application/ld+json"]').first().html();
        if (!recipeScript) {
            throw new Error('No recipe information found on the page.');
        }
        const recipeData = JSON.parse(recipeScript);
        const recipeInstructions = instructionFormatter(findInstructions(recipeData));
        return recipeInstructions;
    } catch(error) {
        console.error('Error Scraping Recipe.')
        return []
    }
}

scrapeRecipe("https://cafedelites.com/butter-chicken/");