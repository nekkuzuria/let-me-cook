# Let Me Cook

Let Me Cook is a web application that helps you find recipes based on the ingredients you have. It uses the AbstractAPI to scrape recipe data from Cookpad. The app allows users to search for recipes, view details, and regenerate results.
![image](https://github.com/user-attachments/assets/70a0934c-4e4e-4293-9f93-a0cecca4911e)


## Features

- **Search for Recipes**: Enter ingredients you have to search for recipes.
- **View Recipe Details**: See the title, image, and summary of a randomly selected recipe.
- **Regenerate Recipe**: Get a new recipe with the same ingredients.
- **Check on Cookpad**: View the full recipe on Cookpad with a direct link.

## Installation

To run this project locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/nekkuzuria/let-me-cook.git
   ```
2. **Navigate to the Project Directory**
   ```bash
   cd let-me-cook
   ```   
3. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```  
4. **Configure Environment Variables**
   - You need to generate an API key from [AbstractAPI](https://www.abstractapi.com/)
   - In the root directory of your project, create a file named .env.local
   - Open the .env.local file and add the following line, replacing your_abstractapi_key_here with the API key you obtained:
   ```bash
   NEXT_PUBLIC_API_KEY=your_abstractapi_key_here
   ```  
5. **Run the Development Server**
   ```bash
   npm run dev
   ```  
   Open http://localhost:3000 in your browser to view the application.

## Usage
- **Enter Ingredients:** Type the ingredients you have into the search box.
- **Search for Recipes:** Click the "Cari Resepnya!" button to find recipes.
- **View Recipe Details:** See the recipe details displayed on the page.
- **Regenerate Recipe:** Click the "Regenerate" button to get a new recipe with the same ingredients.
- **Check on Cookpad:** Click the "Cek di Cookpad" link to view the full recipe on Cookpad.

## Acknowledgements
- AbstractAPI for providing the API used to fetch recipe data.
- Next.js for the React framework used in this project.
- Tailwind CSS for the utility-first CSS framework.
