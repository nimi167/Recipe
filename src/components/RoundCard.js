import React from "react";
import { Link } from "react-router-dom";

export default function RoundCard({ recipe }) {
  const BaseURL = process.env.REACT_APP_BASE_URL;
  return (
    <div className="col-md-3 col-6">
      <Link className="text-decoration-none" to={`/Recipe/${recipe._id}`}>
        <div className="card my-3 align-center border-0">
          <img
            src={`${BaseURL}/uploads/${recipe.images[0]}`}
            className="card-img-top cardRoundImg mx-auto"
            alt="..."
          />
          <div className="card-body pt-1 pb-2">
            <p className="card-title my-2 text-center">{recipe.title}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
