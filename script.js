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
        resultsContainer.innerHTML = '';
        const ingredientNum = document.getElementById('num')

        if(results.length === 0) {
            resultsContainer.style.display = 'none';
            return;
        }
        
        const filteredRecipes = []
        
        for(let i = 0; i < results.length; i++) {
            if (results[i].recipe.ingredientLines.length <= ingredientNum.value) {
                filteredRecipes.push(results[i])
            }
        }

        filteredRecipes.forEach(result => {
            document.getElementById('ingredients').innerHTML = ""
            const resultItem = document.createElement('div');
            resultItem.textContent = result.recipe.label;

            resultItem.addEventListener('click', () => {
                document.getElementById('recipeName').innerHTML = result.recipe.label;
                document.getElementById('recipePic').src = result.recipe.image;

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
    
    
searchRecipes()
ingredientsDropdown()