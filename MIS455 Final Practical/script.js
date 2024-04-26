document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const mealResults = document.getElementById('mealResults');
    const showAllBtn = document.getElementById('showAllBtn');
    const pageTitle = document.querySelector('header h1');
  
    searchBtn.addEventListener('click', function () {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== '') {
        searchMeal(searchTerm);
      }
    });
  
 
  
    async function searchMeal(term) {
      mealResults.innerHTML = '';
      showAllBtn.classList.add('hide');
  
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
      const data = await response.json();
  
      if (data.meals) {
        for (let i = 0; i < Math.min(data.meals.length, 5); i++) {
          const meal = data.meals[i];
          const mealCard = createMealCard(meal);
          mealResults.appendChild(mealCard);
        }
  
        if (data.meals.length > 5) {
          showAllBtn.classList.remove('hide');
          showAllBtn.addEventListener('click', function () {
            for (let i = 5; i < data.meals.length; i++) {
              const meal = data.meals[i];
              const mealCard = createMealCard(meal);
              mealResults.appendChild(mealCard);
            }
            showAllBtn.classList.add('hide');
          });
        }
      } else {
        mealResults.innerHTML = '<p>No meals found</p>';
      }
    }
  
    function createMealCard(meal) {
      const mealCard = document.createElement('div');
      mealCard.classList.add('col-md-4', 'mb-3');
      mealCard.innerHTML = `
        <div class="card">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">Meal ID: ${meal.idMeal}</p>
            <p class="card-text">${meal.strInstructions}</p>
          </div>
        </div>
      `;
      return mealCard;
    }
  });
  
