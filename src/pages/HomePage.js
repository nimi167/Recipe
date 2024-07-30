import React, { useState, useEffect } from "react";
import CardSection from "../sections/CardSection";
import BlogSection from "../sections/BlogSection";
import Footer from "../sections/Footer";
import RoundCard from "../components/RoundCard";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const BaseURL = process.env.REACT_APP_BASE_URL;
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTrendingRecipes = async () => {
      try {
        const response = await fetch(`${BaseURL}/Get/Trending/Recipes`);
        if (!response.ok) {
          throw new Error("Failed to fetch trending recipes");
        }
        const data = await response.json();
        setTrendingRecipes(data.Data);
      } catch (error) {
        console.error("Error fetching trending recipes:", error);
      }
    };
    const fetchRecentRecipes = async () => {
      try {
        const response = await fetch(`${BaseURL}/Get/Random/Recipes`);
        if (!response.ok) {
          throw new Error("Failed to fetch trending recipes");
        }
        const data = await response.json();
        setRandomRecipes(data.Data);
      } catch (error) {
        console.error("Error fetching trending recipes:", error);
      }
    };
    const fetchPopularRecipes = async () => {
      try {
        const response = await fetch(`${BaseURL}/Get/Popular/recipes`);
        const data = await response.json();
        setPopularRecipes(data.Data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTrendingRecipes();
    fetchRecentRecipes();
    fetchPopularRecipes();
  }, []);
  const handleAddRecipe = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/AddRecipe");
    } else {
      navigate("/Login");
    }
  };
  return (
    <>
      {/* hero section */}
      <section>
        <div
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'><path fill='%23FFF0ED' fill-opacity='1' d='M0,96L48,80C96,64,192,32,288,42.7C384,53,480,107,576,154.7C672,203,768,245,864,272C960,299,1056,309,1152,272C1248,235,1344,149,1392,106.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'></path></svg>")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="container py-5">
            <div className="row py-3">
              <div className="col-md-6 col-12 d-flex align-items-center mt-5">
                <div className="mt-5">
                  <div className="fs-1 fw-bold mt-5">Your Daily Dish</div>
                  <div className="fs-1 fw-bold">
                    A <span className="colorRed fw-bold">Food</span> Journey{" "}
                  </div>
                  <div className="colorGray">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Deserunt asperiores optio amet magnam obcaecati sequi
                    dolores. Itaque iste iusto, et omnis tempore est dignissimos
                    nulla natus assumenda ipsum beatae harum.
                  </div>
                  <Link
                    className="nav-link colorWhite fw-medium "
                    to="/SignUp"
                    style={{ color: "white" }}
                  >
                    <button className="btn bgRed colorWhite mx-1 boxShadowRed px-5 my-3 border-0">
                      Sign Up
                    </button>
                  </Link>
                  <p className="colorGray">
                    Do you have an account?{" "}
                    <span className="colorRed">Log in</span>
                  </p>
                </div>
              </div>
              <div className="col-6 d-lg-block d-none d-flex justify-content-end mt-5">
                <img
                  src="images/restaurant-food-restaurant-food-top-view-ai-generative-free-png.webp"
                  className="BlackFoodDishImg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* share recipe section */}
      <section className="sectionMargin">
        <div className="container my-4">
          <div className="row d-flex justify-content-between">
            <div className="col-md-4 col-12 d-flex align-items-center">
              <img
                src="images/shareRecipe.jpeg"
                className="shareRecipeImg w-100 object-fit-cover"
                alt=""
              />
            </div>
            <div className="col-md-7 col-12 d-flex align-items-center ">
              <div className="text-center my-4">
                <div className="fs-2 fw-semibold">
                  Share Your{" "}
                  <span className="colorRed fw-semibold">Recipes</span>
                </div>
                <div className="colorGray my-3 mx-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquam laudantium reiciendis consequatur corporis a nobis
                  fugit optio adipisci aliquid beatae.{" "}
                </div>
                <button
                  className="btn bgRed colorWhite mx-1 boxShadowRed px-5 my-3 boder-0"
                  onClick={handleAddRecipe}
                >
                  Create New Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* trending recipe */}
      <CardSection title="Trending Recipes" data={trendingRecipes} />

      {/* Blog section */}
      <BlogSection />

      {/* Explore recipe */}
      <CardSection title="Explore Recipes" data={randomRecipes} />

      {/* Lets stay in touch */}
      <section className="sectionMargin  bgPink py-5 text-center">
        <div className="container">
          <div className="row ">
            <div className="col-12">
              <h2>Let's Stay In Touch</h2>
            </div>
            <div className="col-12">
              <p className="colorGray">
                Join our newsletter, so that we reach out to you with our news
                and offers
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 col-0 "></div>
            <div className="col-sm-8 col-11 mx-auto">
              <div className="row">
                <div className="col-md-9 col-12 my-1">
                  <input
                    type="email"
                    className="bgWhite border-0 rounded px-3 py-2 pe-5 w-100"
                    placeholder="Enter Your Email"
                  />
                </div>
                <div className="col-md-3 col-12 my-1">
                  <button
                    type="submit"
                    className="bgRed colorWhite border-0 rounded px-3 py-2  w-100 boxShadowRed"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-2 col-0"></div>
          </div>
        </div>
      </section>

      {/* trending recipe */}

      <section className="sectionMargin">
        <div className="container">
          <div className="row my-md-5 my-4">
            <div className="col-8 headingText fw-bold">Popular Category</div>
            <div
              className="col-4 cardName colorRed text-end"
              style={{ fontSize: "15px" }}
            >
              <Link className="text-decoration-none colorRed" to="/Recipe">
                View more
              </Link>
            </div>
          </div>
          <div className="row">
            {popularRecipes.slice(0, 8).map((recipe) => (
              <RoundCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
