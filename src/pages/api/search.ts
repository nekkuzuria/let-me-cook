import type { NextApiRequest, NextApiResponse } from "next";
import got from "got";
import * as cheerio from "cheerio";

// Define the structure of the data to be returned by the API
type Data = {
  title?: string;
  image?: string;
  summary?: string;
  url?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Extract 'ingredients' query parameter from the request
  const { ingredients } = req.query;

  // Validate the 'ingredients' parameter
  if (typeof ingredients !== "string" || !ingredients.trim()) {
    return res.status(400).json({ error: "Invalid or missing ingredients" });
  }

  try {
    // Define the maximum number of pages to search
    const maxPages = 10;
    // Select a random page number
    const randomPage = Math.floor(Math.random() * maxPages) + 1;

    // Retrieve API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    // Construct the URL for the scraping API request
    const url = `https://cookpad.com/id/cari/${encodeURIComponent(
      ingredients
    )}?event=search.typed_query&page=${randomPage}`;

    // Perform the HTTP GET request to the scraping API
    const response = await got.get(url);
    const $ = cheerio.load(response.body);

    // Extract the list of recipes from the page
    const recipes = $('li[data-search-tracking-target="result"]').toArray();
    console.log(`Number of recipes found: ${recipes.length}`);

    // Check if recipes are found
    if (recipes.length > 0) {
      // Select a random recipe from the list
      const randomRecipeIndex = Math.floor(Math.random() * recipes.length);
      const randomRecipe = $(recipes[randomRecipeIndex]);

      // Extract the recipe title
      const title = $(randomRecipe).find("h2 a").text().trim();
      console.log(`Recipe title: ${title}`);

      // Extract the recipe summary
      const summary = $(randomRecipe)
        .find('[data-ingredients-highlighter-target="ingredients"]')
        .text()
        .trim();

      // Extract the recipe URL
      const url = $(randomRecipe).find("a.block-link__main").attr("href");
      const fullUrl = `https://cookpad.com${url}`;

      // Extract the recipe image
      const detailResponse = await got.get(fullUrl);
      const $$ = cheerio.load(detailResponse.body);
      const image = $$('img[alt^="Foto resep"]').attr("src");

      // Return the extracted recipe data as JSON response
      res.status(200).json({
        title,
        image,
        summary,
        url: fullUrl,
      });
    } else {
      res.status(404).json({ error: "No recipe found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes <Server>" });
  }
}
