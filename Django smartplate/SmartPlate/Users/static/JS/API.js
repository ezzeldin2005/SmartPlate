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

const analyzeRecipeWithAINutrition = async () => {
  const textarea = document.querySelector(".recipe-textarea");
  const inputText = textarea.value.trim();

  if (!inputText) {
    alert("Please enter a recipe.");
    return;
  }

  const url = 'https://ai-nutritional-facts.p.rapidapi.com/getNutritionalInfo';
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': '1cfbd088a9msh490a3a8017fa725p160693jsn6de1529cff4e',
      'x-rapidapi-host': 'ai-nutritional-facts.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input: inputText
    })
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const result = await response.json();

    console.log(result);

    const nutrition = result.totalNutrition || result.nutritionInfo || result;

    if (nutrition && nutrition["calories in kcal"]) {
  document.getElementById("recipe-total").textContent =
    `${Math.round(nutrition["calories in kcal"])} cal`;

  document.getElementById("recipe-fat-cal").textContent =
    `${Number(nutrition["total fat in g"]).toFixed(1)} g`;

  document.getElementById("recipe-carbs-cal").textContent =
    `${Number(nutrition["total carbohydrate in g"]).toFixed(1)} g`;

  document.getElementById("recipe-fiber-cal").textContent =
    `${Number(nutrition["dietary fiber in g"]).toFixed(1)} g`;

  document.getElementById("recipe-protein-cal").textContent =
    `${Number(nutrition["protein in g"]).toFixed(1)} g`;
} else {
  alert("Nutrition info is unavailable or incomplete.");
}


  } catch (error) {
    console.error("AI Nutrition API error:", error);
    alert("Failed to analyze recipe. Please try again.");
  }
};

// Button listener
document.querySelector(".recipe-btn").addEventListener("click", (event) => {
  event.preventDefault();
  analyzeRecipeWithAINutrition();
});

