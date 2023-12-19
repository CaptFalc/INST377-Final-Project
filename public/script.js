const edamamAppID = '2a44c43f'
const edamamAppKey = '0274ad830b2f31ef93004443ef6e46cb'
const apiSearchURL = 'https://api.edamam.com/search'


//Lowering API Requests
const debounce = (func, delay) => {
    let timeoutId;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
};


function searchRecipes() {
    const searchInput = document.getElementById('searchVal');
    const resultsContainer = document.getElementById('resultsContainer');
    const submitButton = document.getElementById('recipeForm')

    searchInput.addEventListener('input', debounce(handleInput, 3000));

    recipeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        handleInput();
    })

    function handleInput() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm.length === 0) {
            resultsContainer.style.display = 'none';
            return;
        }
        const builtURL = `${apiSearchURL}?q=${searchTerm}&app_id=${edamamAppID}&app_key=${edamamAppKey}`
        fetch(builtURL) 
            .then(response => response.json())
            .then(data => {
                dropdownResults(data.hits);
            })
            .catch(error => console.error('Error Fetching Data!', error));
    }
}

    function dropdownResults(results) {
        const resultsContainer = document.getElementById('resultsContainer');
        const ingredientNum = document.getElementById('num')
        resultsContainer.innerHTML = '';
        
        if(results.length === 0) {
            resultsContainer.style.display = 'none';
            return;
        }
        
        const filteredRecipes = []
        
        for(let i = 0; i < results.length; i++) {
            if (results[i].recipe.ingredientLines.length <= ingredientNum.value || ingredientNum.value >= '9') {
                filteredRecipes.push(results[i])
            }
        }

        filteredRecipes.forEach(result => {
            const resultItem = document.createElement('div');
            const resultPic = document.createElement('img')
            resultItem.setAttribute("id", 'resultsContainer')
            resultItem.textContent = result.recipe.label;
            resultPic.src = result.recipe.image;
            resultItem.append(resultPic)
            resultsContainer.appendChild(resultItem);

            resultItem.addEventListener('click', () => {
                resultsContainer.innerHTML = ""
                displayOnClick(result)
            });
        });
}

    function displayOnClick(result) {
        document.getElementById('resultsContainer').innerHTML = ""
        document.getElementById('recipeInstructions').innerHTML = "";
        document.getElementById('ingredients').innerHTML = "";

        document.getElementById('recipeName').innerHTML = result.recipe.label;
        document.getElementById('yield').innerHTML = "Serves " + result.recipe.yield;
        document.getElementById('recipePic').src = result.recipe.image;
        const ingredients = document.getElementById('ingredients');
        createPieChart(getNutritionalValue(result.recipe))
        mealTypes(result);

        const ingredientsList = result.recipe.ingredientLines;
        const titleName = document.createElement('h3')
        titleName.textContent = 'Ingredient List'
        titleName.style.textAlign = "center"
        ingredients.appendChild(titleName)

        const instructions = document.getElementById('recipeInstructions')
        var urlButton = document.createElement('button')
        urlButton.innerHTML = result.recipe.label + " Instructions"
        urlButton.addEventListener ("click", function() {
            window.open(result.recipe.url, "_blank");
          });
        urlButton.classList.add('greenbutton')
        instructions.append(urlButton)

        ingredientsList.forEach(ingredient => {
            const listItem = document.createElement('li');
            listItem.textContent = ingredient;
            ingredients.appendChild(listItem);
        })

    }

    function getNutritionalValue(recipe) {
        return {
            calories: recipe.calories,
            protein: recipe.totalNutrients.PROCNT.quantity,
            carbs: recipe.totalNutrients.CHOCDF.quantity,
            fat: recipe.totalNutrients.FAT.quantity,
        }
    }
    
    let myPieChart;
    function createPieChart(nutritionValues) {
        if (myPieChart) {
            myPieChart.destroy();
        }
        window.ctx = document.getElementById('nutrientPieChart').getContext('2d');
        myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Protein', 'Carbs', 'Fat'],
                datasets: [{
                    data: [nutritionValues.protein, nutritionValues.carbs, nutritionValues.fat],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

   
async function mealTypes(result) {

    console.log('Adding Meal type...')
    var test = fetch('/', {
        method: 'POST',
        body: JSON.stringify({
            cuisineType: result.recipe.cuisineType[0],
            mealType: result.recipe.mealType[0]
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    await test;
    console.log("Meal type added!")
}


 searchRecipes();
