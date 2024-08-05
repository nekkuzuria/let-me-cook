import IndexPage from "../pages/home";

export const metadata = {
  title: "Let Me Cook",
  description:
    "Discover new recipes based on the ingredients you have at home. Input ingredients and get suggestions from Cookpad.",
};

export default function Home() {
  return (
    <>
      <IndexPage />
    </>
  );
}
