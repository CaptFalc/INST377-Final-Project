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

    recipeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        handleInput();
    })

    searchInput.addEventListener('input', debounce(handleInput, 3000));
    
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
                displayResults(data.hits);
            })
            .catch(error => console.error('Error Fetching Data!', error));
    }
}

    function displayResults(results) {
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = '';
        const ingredientNum = document.getElementById('num')

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
            document.getElementById('ingredients').innerHTML = ""

            const resultItem = document.createElement('div');
            const resultPic = document.createElement('img')
            resultItem.setAttribute("id", 'resultsContainer')
            resultItem.textContent = result.recipe.label;
            resultPic.src = result.recipe.image;
            resultItem.append(resultPic)

            resultItem.addEventListener('click', () => {
                document.getElementById('recipeName').innerHTML = result.recipe.label;
                document.getElementById('recipePic').src = result.recipe.image;
                createPieChart(getNutritionalValue(result.recipe))

                const ingredientsList = result.recipe.ingredientLines;
                const titleName = document.createElement('h3')
                titleName.textContent = 'Ingredient List'
                titleName.style.textAlign = "center"
                document.getElementById('ingredients').appendChild(titleName)

                ingredientsList.forEach(ingredient => {
                    const listItem = document.createElement('li');
                    listItem.textContent = ingredient;
                    document.getElementById('ingredients').appendChild(listItem);
                })

                resultsContainer.style.display = 'none';
            });

            resultsContainer.appendChild(resultItem);
        });
        resultsContainer.style.display = 'block';
    }

    function getNutritionalValue(recipe) {
        return {
            calories: recipe.calories,
            protein: recipe.totalNutrients.PROCNT.quantity,
            carbs: recipe.totalNutrients.CHOCDF.quantity,
            fat: recipe.totalNutrients.FAT.quantity,
        }
    }
    
    function createPieChart(nutritionValues) {
        const ctx = document.getElementById('nutrientPieChart').getContext('2d');
        const myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Protein', 'Carbs', 'Fat'],
                datasets: [{
                    data: [nutritionValues.protein, nutritionValues.carbs, nutritionValues.fat],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                }],
            },
            options: {
                responsive: false
            }
        });
    }
    
searchRecipes()