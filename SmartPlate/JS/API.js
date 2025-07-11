const getNutritionData = async (ingredient) => {
  const url = `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=${encodeURIComponent(ingredient)}&nutrition-type=cooking`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '1cfbd088a9msh490a3a8017fa725p160693jsn6de1529cff4e',
      'x-rapidapi-host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
  
    // Get raw values in grams and cal
    const calories = result.totalNutrients?.ENERC_KCAL?.quantity || 0; // in kcal
    

    const protein = result.totalNutrients?.PROCNT?.quantity?.toFixed(1) || "0.0"; // in g
    const fat = result.totalNutrients?.FAT?.quantity?.toFixed(1) || "0.0";       // in g
    const carbs = result.totalNutrients?.CHOCDF?.quantity?.toFixed(1) || "0.0"; // in g
    const fiber = result.totalNutrients?.FIBTG?.quantity?.toFixed(1) || "0.0";  // in g

    // Inject into HTML elements
    document.getElementById("meal-total").textContent = `${calories} cal`;
    document.getElementById("protein-cal").textContent = `${protein} g`;
    document.getElementById("fat-cal").textContent = `${fat} g`;
    document.getElementById("carbs-cal").textContent = `${carbs} g`;
    document.getElementById("fiber-cal").textContent = `${fiber} g`;


  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    return null;
  }
};

const btn = document.getElementById("btn");

btn.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission
  const ingredient = document.getElementById("bar").value;
  getNutritionData(ingredient);
});

//-----------------------------------------------------------------------------------------//

const analyzeRecipeWithNinjas = async () => {
  const textarea = document.querySelector(".recipe-textarea");
  const ingredientsRaw = textarea.value.trim();

  if (!ingredientsRaw) {
    alert("Please enter a recipe.");
    return;
  }

  const url = 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=1lb%20brisket%20with%20fries';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '1cfbd088a9msh490a3a8017fa725p160693jsn6de1529cff4e',
      'x-rapidapi-host': 'nutrition-by-api-ninjas.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const result = await response.json();
    
    // Sum totals from all items
    let totalCalories = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    let totalFiber = 0;

    result.forEach(item => {
      const fat = Number(item.fat_total_g) || 0;
      const carbs = Number(item.carbohydrates_total_g) || 0;
      const fiber = Number(item.fiber_g) || 0;

      totalFat += fat;
      totalCarbs += carbs;
      totalFiber += fiber;

      totalCalories += (fat * 9) + (carbs * 4);
    });

    // Update HTML values (round or fix to 1 decimal)
    document.getElementById("recipe-total").textContent = `${Math.round(totalCalories)} cal`;
    document.getElementById("recipe-fat-cal").textContent = `${totalFat.toFixed(1)} g`;
    document.getElementById("recipe-carbs-cal").textContent = `${totalCarbs.toFixed(1)} g`;
    document.getElementById("recipe-fiber-cal").textContent = `${totalFiber.toFixed(1)} g`;

  } catch (error) {
    console.error("Nutrition API error:", error);
    alert("Failed to analyze recipe. Please try again.");
  }
};

// Connect button
document.querySelector(".recipe-btn").addEventListener("click", (event) => {
  event.preventDefault();
  analyzeRecipeWithNinjas();
});
