const searchResult = document.getElementById('search-result');
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const singleMeal = document.getElementById('single-meal');
const meals = document.getElementById('meals');


function updateDOM(meal) {
    const ingredients = [];
    for(let i=1;i<=20;i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`);
        }
        else{
            break;
        }
    }

    singleMeal.innerHTML = `
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}"/>
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>( ${meal.strArea} )</p>` : ''} 
        </div>
        <p class="instructions">${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
            ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
    `;
}

function randomMeal() {
    searchResult.innerHTML = '';
    meals.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];

        updateDOM(meal);
    });
}

function fetchMeal(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];

        updateDOM(meal);
    });
}

function searchMeal(evt) {
    evt.preventDefault();
    singleMeal.innerHTML = '';
    const term = search.value;

    if(!term.trim()){
        alert('Please enter a search term');
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(resonse => resonse.json())
    .then(data => {
        searchResult.innerHTML = `<h2>Search results for '${term}' : </h2>`;
        if(data.meals === null){
            searchResult.innerHTML = `<p>No search result found! Try Again!!</p>`;
            meals.innerHTML = '';
        }
        else{
            meals.innerHTML = data.meals.map(item => `
                    <div class="meal">
                        <img src="${item.strMealThumb}">
                        <div class="meal-info" data-mealid="${item.idMeal}">
                            <h3>${item.strMeal}</hr>
                        </div>
                    </div>
                `).join('');
        }

        search.value = '';
    });

}


submit.addEventListener('submit',searchMeal);
random.addEventListener('click',randomMeal);

meals.addEventListener('click', evt => {
    const mealInfo = evt.path.find(item => {
        if(item.classList){
            return item.classList.contains('meal-info');
        }
        else{
            return false;
        }
    });
    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid');
        fetchMeal(mealID);
    }
});