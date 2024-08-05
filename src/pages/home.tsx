"use client"; // This is a client component 👈🏽
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

// Define the structure of the recipe data
type Recipe = {
  title: string;
  image: string;
  summary: string;
  url?: string;
};

export default function IndexPage() {
  // State to hold the user's input for ingredients
  const [ingredients, setIngredients] = useState("");
  // State to hold the fetched recipe data
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  // State to manage the loading state during API requests
  const [loading, setLoading] = useState(false);

  // Function to search for recipes based on ingredients
  const searchRecipe = async () => {
    setLoading(true); // Set loading to true before the request
    try {
      const response = await axios.get("/api/search", {
        params: { ingredients },
      });
      // Set the recipe state with the fetched data
      setRecipe(response.data);
    } catch (error) {
      console.error("Error fetching the recipe <Client>", error);
    } finally {
      setLoading(false); // Reset loading state after the request
    }
  };

  // Function to regenerate a new recipe (re-search)
  const regenerateRecipe = async () => {
    searchRecipe();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
        Let Me Cook
      </h1>
      <h2 className="text-xl font-semibold mb-8 text-gray-600">
        Bro mau masak apa hari ini? 😎🍳
      </h2>
      <div className="w-full max-w-md">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Bahan apa aja yang lo punya?"
          className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-800"
        />
        <button
          onClick={searchRecipe}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          Cari Resepnya!
        </button>
        {loading ? (
          <div className="mt-8 text-center text-gray-500">Loading...</div>
        ) : (
          recipe && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {recipe.title}
              </h2>
              {recipe.image && (
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  layout="responsive"
                  width={500}
                  height={300}
                  className="rounded mb-4"
                />
              )}
              <p className="text-gray-700 mb-4">{recipe.summary}</p>
              {recipe.url && (
                <a
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-center text-blue-500 hover:text-blue-700 underline rounded-lg border border-blue-500 hover:border-blue-700 px-4 py-2 transition-colors duration-300 mb-4"
                >
                  Cek di Cookpad
                </a>
              )}
              <button
                onClick={regenerateRecipe}
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Regenerate
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
