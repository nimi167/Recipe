import React from "react";
import VerticalCard from "../components/VerticalCard";
import { Link } from "react-router-dom";

export default function CardSection({ title, data }) {
  const maxItems = 6;
  return (
    <>
      <section className="py-1">
        <div className="container">
          <div className="row my-md-5 my-4">
            <div className="col-8 headingText fw-bold">{title}</div>
            <div
              className="col-4 cardName colorRed text-end"
              style={{ fontSize: "15px" }}
            >
              <Link className="text-decoration-none colorRed" to="/Recipes">
                View more
              </Link>
            </div>
          </div>
          <div className="row">
            {data && Array.isArray(data) ? (
              data
                .slice(0, maxItems)
                .map((recipe) => (
                  <VerticalCard key={recipe._id} recipe={recipe} />
                ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
