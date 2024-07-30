import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./sections/NavBar";
import HomePage from "./pages/HomePage";
import AddRecipe from "./pages/AddRecipe";
import Recipes from "./pages/Recipe";
import BlogPage from "./pages/BlogPage";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";
import RecipeDetails from "./pages/RecipeDetails";
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/AddRecipe" element={<AddRecipe />} />
          <Route path="/Recipes" element={<Recipes />} />
          <Route path="/Recipe/:id" element={<RecipeDetails />} />
          <Route exact path="/Blog" element={<BlogPage />} />
          <Route exact path="/About" element={<AboutUs />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/Chats" element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
