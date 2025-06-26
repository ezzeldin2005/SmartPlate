const getNutritionData = async (ingredient) => {
  // Encode the ingredient for URL safety (e.g., "1 apple" => "1%20apple")
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
    
    const result = await response.json(); // Parse as JSON (not text)
    console.log(result);
    return result;
    
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    return null;
  }
};

// Example: Get data for 1 apple
getNutritionData("1 apple");