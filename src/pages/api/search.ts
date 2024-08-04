import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";

type Data = {
  title?: string;
  image?: string;
  summary?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { ingredients } = req.query;

  if (typeof ingredients !== "string" || !ingredients.trim()) {
    return res.status(400).json({ error: "Invalid or missing ingredients" });
  }

  try {
    const maxPages = 10;
    const randomPage = Math.floor(Math.random() * maxPages) + 1;

    // Construct the URL for scraping
    const url = `https://cookpad.com/id/cari/${encodeURIComponent(
      ingredients
    )}?event=search.typed_query&page=${randomPage}`;

    const $ = cheerio.load(url);

    // Scrape recipes
    const recipes = $(
      'li[id^="recipe_"][data-search-tracking-target="result"]'
    ).toArray();

    if (recipes.length > 0) {
      const randomRecipeIndex = Math.floor(Math.random() * recipes.length);
      const randomRecipe = $(recipes[randomRecipeIndex]);

      const title = $(randomRecipe).find("h2 a").text().trim();

      const imageSrcSet = $(randomRecipe)
        .find('source[type="image/webp"]')
        .attr("srcset");

      let image;
      if (imageSrcSet) {
        const imageUrls = imageSrcSet.split(", ");
        const bestQualityImageUrl =
          imageUrls[imageUrls.length - 1].split(" ")[0];
        image = bestQualityImageUrl;
      }

      const summary = $(randomRecipe)
        .find('[data-ingredients-highlighter-target="ingredients"]')
        .text()
        .trim();

      res.status(200).json({
        title,
        image,
        summary,
      });
    } else {
      res.status(404).json({ error: "No recipe found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes <Server>" });
  }
}
