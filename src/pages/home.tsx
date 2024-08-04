"use client"; // This is a client component 👈🏽
import { useState } from "react";
import axios from "axios";

type Recipe = {
  title: string;
  image: string;
  summary: string;
};

export default function IndexPage() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const searchRecipe = async () => {
    try {
      const response = await axios.get("/api/search", {
        params: { ingredients },
      });
      console.log("API Response:", response.data); // Add this for debugging
      setRecipe(response.data);
    } catch (error) {
      console.error("Error fetching the recipe <Client>", error);
    }
  };

  const regenerateRecipe = async () => {
    searchRecipe();
  };

  return (
    <div>
      <h1>Let Me Cook</h1>
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Masukkan bahan-bahan yang dimiliki"
      />
      <button onClick={searchRecipe}>Search</button>
      {recipe && (
        <div>
          <h2>{recipe.title}</h2>
          {recipe.image && <img src={recipe.image} alt={recipe.title} />}
          <p>{recipe.summary}</p>
          <button onClick={regenerateRecipe}></button>
        </div>
      )}
    </div>
  );
}
