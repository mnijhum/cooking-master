document.getElementById("search-btn").addEventListener("click", function () {
  const searchText = document.getElementById("search-field").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => retrieveMeal(data));
});

const retrieveMeal = (data) => {
    refresh();
  const meals = data.meals;
  meals.forEach((element) => {
    const name = element.strMeal;
    const img = element.strMealThumb;
    const id = element.idMeal;
    console.log(name, img);
    showMeal(name, img, id);
  });
};

const showMeal = (name, img, id) => {
  const mealDiv = document.getElementById("cards");

  const mealCard = `<div onclick="fetchById('${id}')" class="card" style="width: 18rem;">
    <img src="${img}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">${name}</p>
    </div>
  </div>`;
  const newMealDiv = document.createElement("div");
  mealDiv.appendChild(newMealDiv);
  newMealDiv.innerHTML = mealCard;
};

const fetchById = (id) => {
  console.log("entered showDetails");
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => showDetails(data));
};

const showDetails = (data) => {
  const divImg = document.getElementById("single-image-id");
  const divText = document.getElementById("title");
  const list = document.getElementById("list");
  const item = document.getElementById('Ingredients');
  list.innerHTML ="";

  const meal = data.meals[0];
  const name = meal.strMeal;
  const img = meal.strMealThumb;

  divImg.src = img;
  divText.innerText = name;
  item.innerText = "Ingredients: "


  for (let i = 1; i < 21; i++) {
    if (meal[`strIngredient${i}`]) {
      const ingredient = meal[`strIngredient${i}`];
      const li = document.createElement("li");
      list.appendChild(li);
      li.innerText = ingredient;
    }
  }
  document.documentElement.scrollTop = 0
};

const refresh = () => {
  const mealDiv = document.getElementById("cards");
  mealDiv.innerHTML = "";
  const divImg = document.getElementById("single-image-id");
  divImg.src = "";
  const divText = document.getElementById("title");
  divText.innerHTML = "";
  const list = document.getElementById("list");
  list.innerHTML = "";
  const item = document.getElementById('Ingredients');
  item.innerText = "";
};
