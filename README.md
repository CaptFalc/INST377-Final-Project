# **Title: Recipes Only, Please!**
## Project Group 16 - Wadi Ahmed, Manpreet Kaur, Sky Reed
## Description: 
Our application is meant to help users easily access recipes when searching online. There can be a lack of access when they are faced with numerous amount of ads and other content such as the author's life story, which impedes the ability to easily have accesss to the recipe. Our goal is to make the process of looking for recipes online easier and more efficient. 

### Target Audience
Our target audience is any food enjoyer who wants to get some meals without the back and forth of navigating through thousands of other things before they get their recipe! In terms of users, our goal was making this site friendly for all browsers, so it should be applicable for any browser.

## Dev & User Manual
### Prereqs
+ [Node.js](https://nodejs.org/en/download) - a JS runtime environment allowing for execution outside a web browser, needed for commands!
# Installs and Configs
## For the Users....
1. First off, either download the zip or clone the repository to a directory.
2. Navigate (cd) into the directory
3. Run ```node app.js```
4. The server will then run on http://localhost:3000!
5. Type in a type of dish you want to eat and it'll pop up with its ingredients and nutrient content in a nice and shiny Pi chart.
## For the Devs...
#### _Supabase Connection_
Currently, the project uses Supabase to store search entries from the server(meal types and cuisines.) It also uses an API key in the file that connects to a personal Supabase database to store those values.  \

If you want to change the API key and URL to use for your own needs, navigate to ```app.js``` and change the supabaseURL and supabaseKey variables. \

If you want to change the variables RETURNED to the Supabase database, then go to the ```mealTypes``` function in ```public/script.js``` and change up some of the variables based on the API return values. Make sure those columns are in Supabase! 

#### _APIs Used_
Aside from a POST database connection w/Supabase, we used [Edamam's Recipe API](https://developer.edamam.com/food-database-api) to fetch recipes from its "Food Database", as well as to pull information regarding its nutrients!

_GET Requests_: Used during fetching 

### _Future Work_
Inside the directory is a file ```urlScraper.js```. The function takes in an input of a recipe website's URL, fetches the JSON data, formats it, and returns the recipe instructions back. The original plan was implementing it into the final product to return the instructions, due to limitations with Edamam's API, however, it's a very daunting task to implement webscraping due to CORS limitations (more information on that in the Docs on the website.) The file imports [Puppeteer](https://pptr.dev), a node.js library able to run a developer version of Chromium, and [Cheerio](https://cheerio.js.org), a jQuery subset to parse HTML.

Future work is to build upon this and hopefully implement it onto the website.
  
