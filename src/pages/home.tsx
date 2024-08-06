"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";

// Define the structure of the recipe data
type Recipe = {
  title: string;
  image: string;
  summary: string;
  url?: string;
};

export default function IndexPage() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to search for recipes based on ingredients
  const searchRecipe = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/search", {
        params: { ingredients },
      });
      if (response.status === 200) {
        setRecipe(response.data);
      }
    } catch (error) {
      console.error("Error fetching the recipe <Client>", error);

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response;
        if (errorResponse) {
          if (errorResponse.status === 404) {
            setError("Waduh, resepnya ga ada chef!");
          } else if (errorResponse.status === 500) {
            setError("Sistemnya error chef, coba lagi nanti!");
          } else {
            setError("Terjadi kesalahan, coba lagi nanti!");
          }
        }
      }
    } finally {
      setLoading(false);
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
        Chef mau masak apa hari ini? 😎🍳
      </h2>
      <div className="w-full max-w-md">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Bahan apa aja yang chef punya?"
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
        ) : error ? (
          <div className="mt-8 text-center text-red-500">{error}</div>
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
      <a
        href="https://github.com/nekkuzuria/let-me-cook"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center mt-24 text-white bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-800 hover:border-gray-700 px-4 py-2 transition-colors duration-300 "
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.418 2.867 8.164 6.84 9.486.5.092.68-.216.68-.48v-1.76c-2.835.615-3.433-1.318-3.433-1.318-.464-1.175-1.134-1.486-1.134-1.486-.927-.637.071-.625.071-.625 1.024.072 1.563 1.048 1.563 1.048.905 1.586 2.373 1.133 2.95.87.092-.656.353-1.133.64-1.394-2.245-.253-4.605-1.123-4.605-4.989 0-1.102.393-2.002 1.042-2.71-.104-.253-.452-1.272.096-2.647 0 0 .845-.272 2.766 1.04A9.606 9.606 0 0 1 12 7.557a9.606 9.606 0 0 1 2.698.373c1.92-1.312 2.765-1.04 2.765-1.04.549 1.375.201 2.394.097 2.647.65.708 1.043 1.608 1.043 2.71 0 3.872-2.367 4.735-4.617 4.983.36.31.683.921.683 1.855v2.743c0 .266.182.575.686.48C19.133 20.163 22 16.418 22 12c0-5.52-4.48-10-10-10z"></path>
        </svg>
        GitHub
      </a>
    </div>
  );
}
