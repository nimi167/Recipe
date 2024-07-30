import React from "react";
import SignupForm from "../components/SignupForm";

export default function SignUp() {
  return (
    <>
      <div className="container sectionMargin">
        <div className="row">
          <div className="col-lg-6 col-12 p-5 position-relative">
            <img
              src="images/shareRecipe.jpeg"
              alt=""
              className="w-100 rounded-top-4"
            />
          </div>
          <SignupForm />
        </div>
      </div>
    </>
  );
}
