import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Footer from "../sections/Footer";

export default function AddRecipe() {
  const BaseURL = process.env.REACT_APP_BASE_URL;
  const [formData, setFormData] = useState({
    title: "",
    images: [], // Ensure that images is always initialized as an array
    description: "",
    ingredients: [],
    instruction: [],
    servings: "",
    cookingTime: { hrs: 0, min: 0 },
    prepTime: { hrs: 0, min: 0 },
    cuisine: "",
    collections: "",
  });
  const [selectedImages, setSelectedImages] = useState(null);
  const [newIngredient, setNewIngredient] = useState("");
  const [newInstruction, setNewInstruction] = useState("");
  const [cuisineOptions] = useState({
    Italian: ["Italian Pizza", "Italian Pasta", "Italian Risotto"],
    Indian: ["Punjabi Dish", "Gujarati Full Dish", "South Indian Dosa"],
    Chinese: ["Szechuan Chicken", "Dim Sum", "Hot Pot"],
    French: ["French Onion Soup", "Coq au Vin", "Croissant"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cookingTimeHrs" || name === "cookingTimeMin") {
      setFormData((prevState) => ({
        ...prevState,
        cookingTime: {
          ...prevState.cookingTime,
          [name === "cookingTimeHrs" ? "hrs" : "min"]: parseInt(value) || 0,
        },
      }));
    } else if (name === "prepTimeHrs" || name === "prepTimeMin") {
      setFormData((prevState) => ({
        ...prevState,
        prepTime: {
          ...prevState.prepTime,
          [name === "prepTimeHrs" ? "hrs" : "min"]: parseInt(value) || 0,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const handleImageChange = (e) => {
    const files = e.target.files;
    console.log("files ::: ");
    console.log(files);
    setSelectedImages(e.target.files);
    const selectedImagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const imageURL = URL.createObjectURL(files[i]);
      selectedImagesArray.push(imageURL);
      console.log("imageURL ::::");
      console.log(imageURL);
    }

    setFormData((prev) => {
      return {
        ...prev,
        images: [...(prev.images || []), ...selectedImagesArray], // Ensure prev.images is an array
      };
    });

    setSelectedImagePreview(selectedImagesArray[0]);
  };

  const handleImagePreview = (image) => {
    setSelectedImagePreview(image);
  };

  const handleAddIngredient = () => {
    console.log(newIngredient);
    if (newIngredient.trim() !== "") {
      setFormData((prevState) => ({
        ...prevState,
        ingredients: [...prevState.ingredients, newIngredient],
      }));
      setNewIngredient("");
    }
  };

  const handleAddInstruction = () => {
    if (newInstruction.trim() !== "") {
      setFormData((prevState) => ({
        ...prevState,
        instruction: [...prevState.instruction, newInstruction],
      }));
      setNewInstruction("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "cookingTime" || key === "prepTime") {
          formDataObj.append(key, JSON.stringify(formData[key]));
        } else if (key === "images") {
          for (let i = 0; i < selectedImages.length; i++) {
            formDataObj.append("images", selectedImages[i]);
          }
        } else {
          formDataObj.append(key, formData[key]);
        }
      });

      const response = await fetch(`${BaseURL}/api/recipes`, {
        method: "POST",
        body: formDataObj,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        console.log("Recipe saved successfully!");
        window.location.reload();
      } else {
        console.error("Failed to save recipe.");
        alert("Please Login First!");
      }
    } catch (error) {
      console.error("Error during recipe save:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="border border-start-0 border-end-0">
          <div className="container">
            <div className="row py-4">
              <div className="col-10 fs-3 fw-semibold">Create new Recipe</div>
              <div className="col-2  d-flex justify-content-end">
                <button className="btn btnTheme px-sm-5 px-4 fw-medium rounded">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container my-5">
          <div className="row my-3">
            <div className="  ms-auto me-auto col-sm-12 col-md-9 col-lg-6 col-xl-6 col-xxl-6 m-1">
              <div className="col-12 fs-5 fw-normal">Recipe Title:</div>
              <div className="col-12 ">
                <input
                  type="text"
                  placeholder="Enter Recipe Title"
                  className="px-2 py-2 rounded w-100 fs-6"
                  name="title"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="  ms-auto me-auto col-sm-12 col-md-9 col-lg-6 col-xl-6 col-xxl-6 m-1">
              <div className="col-12 fs-5 fw-normal">Recipe Image:</div>
              <div
                className={`col-12 previewImage ${
                  selectedImagePreview ? "d-block" : "d-none"
                }`}
              >
                {selectedImagePreview && (
                  <img
                    src={selectedImagePreview}
                    alt="Selected Preview"
                    className="PreviewImage"
                    required
                  />
                )}
              </div>
              <br />
              <div className="col-12 d-flex flex-wrap align-items-center">
                <div className="upload-btn-wrapper me-1">
                  <button className="inputBtn">
                    <i className="fas fa-camera"></i>
                    <br />
                    Add Photo
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="form-control"
                    id="inputGroupFile"
                    name="images"
                    onChange={handleImageChange}
                    required
                    style={{
                      width: "120px",
                      height: "100px",
                      margin: "5px",
                      cursor: "pointer",
                      objectFit: "cover",
                      outline: "3px solid #b55d51",
                    }}
                  />
                </div>

                {formData.images &&
                  formData.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: "120px",
                        height: "100px",
                        margin: "5px",
                        cursor: "pointer",
                        objectFit: "cover",
                        outline: "3px solid #b55d51",
                        borderRadius: "5px",
                      }}
                      className="notify-badge m-2"
                      onClick={() => handleImagePreview(image)}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="row my-4">
            <div className="ms-auto me-auto col-sm-12 col-md-9 col-lg-6 col-xl-6 col-xxl-6 m-1">
              <div className="col-12 fs-5 fw-normal">description:</div>
              <div className="col-12 ">
                <input
                  type="text"
                  placeholder="Introduce your recipe"
                  className="px-2 py-2 rounded w-100 fs-6"
                  name="description"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="  ms-auto me-auto col-sm-12 col-md-9 col-lg-6 col-xl-6 col-xxl-6 m-1">
              <div className="col-12 fs-5 fw-normal">Ingredients:</div>
              <div className="col-12">
                <ul>
                  {formData.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="ingredientList px-2 py-2 rounded w-100 my-2"
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-12">
                <input
                  type="text"
                  placeholder="Add Ingredients"
                  className="px-2 py-2 rounded w-100 fs-6"
                  value={newIngredient}
                  name="ingredients"
                  onChange={(e) => setNewIngredient(e.target.value)}
                />
              </div>
              <div className="col-12 px-0 py-2">
                <button
                  type="button"
                  className="btn colorRed px-1 py-2"
                  onClick={handleAddIngredient}
                >
                  <FaPlus color="#b55d51" /> Add Ingredients
                </button>
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="  ms-auto me-auto col-sm-12 col-md-9 col-lg-6 col-xl-6 col-xxl-6 m-1">
              <div className="col-12 fs-5 fw-normal">Instruction:</div>
              <div className="col-12">
                {formData.instruction.map((ingredient, index) => (
                  <div
                    className="row d-flex justify-content-start ms-1"
                    key={index}
                  >
                    <div className="col-12 p-0 fw-bold">Step {index + 1}</div>
                    <div className="col-2 p-0 my-2">
                      <i className="fas fa-camera  cameraIcon"></i>
                    </div>
                    <div className="col-10 py-1">{ingredient}</div>
                  </div>
                ))}
              </div>
              <div className="col-12 py-2">
                <input
                  type="text"
                  placeholder="Write Instruction"
                  className="px-2 py-2 rounded w-100 fs-6"
                  value={newInstruction}
                  name="instruction"
                  onChange={(e) => setNewInstruction(e.target.value)}
                />
              </div>
              <div className="col-12 px-0 py-2">
                <button
                  type="button"
                  className="btn colorRed px-1 py-2"
                  onClick={handleAddInstruction}
                >
                  <FaPlus color="#b55d51" /> Write Instruction
                </button>
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="  ms-auto me-auto col-sm-12 col-md-9 col-lg-6 col-xl-6 col-xxl-6 m-1">
              <div className="col-12 fs-5 fw-normal">Servings:</div>
              <div className="col-12">
                <input
                  type="text"
                  placeholder="#Servings"
                  className="px-2 py-2 rounded w-100 fs-6"
                  name="servings"
                  onChange={handleChange}
                  required
                />
              </div>
              <small className="colorGray">
                How many portion does this recipe make?
              </small>
            </div>
          </div>

          <div className="row my-3">
            <div className="  ms-auto me-auto col-sm-12 col-md-9 col-lg-6 col-xl-6 col-xxl-6 m-1">
              <div className="col-12 fs-5 fw-normal">Cooking Time:</div>
              <div className="row d-flex justify-content-between">
                <div className="col-6 ">
                  <input
                    type="number"
                    min={0}
                    placeholder="Hours 0"
                    className="px-2 py-2 rounded fs-6 w-100"
                    name="cookingTimeHrs"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    min={0}
                    max={60}
                    placeholder="Minutes 0"
                    className="px-2 py-2 rounded fs-6 w-100"
                    name="cookingTimeMin"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <small className="colorGray">
                How long does it take to cook this recipe?
              </small>
            </div>
          </div>
          <div className="row my-3">
            <div className="ms-auto me-auto col-sm-12 col-md-9 col-lg-6 col-xl-6 col-xxl-6 m-1 ">
              <div className="col-12 fs-5 fw-normal">Prep Time:</div>
              <div className="row d-flex justify-content-between">
                <div className="col-6 ">
                  <input
                    type="number"
                    min={0}
                    placeholder="Hours 0"
                    className="px-2 py-2 rounded w-100 fs-6"
                    name="prepTimeHrs"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-6 ">
                  <input
                    type="number"
                    min={0}
                    max={60}
                    placeholder="Minutes 0"
                    className="px-2 py-2 rounded w-100 fs-6"
                    name="prepTimeMin"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <small className="colorGray">
                How long does it take to cook this recipe?
              </small>
            </div>
          </div>

          <div className="row my-3">
            <div className="ms-auto me-auto col-sm-12 col-md-9 col-lg-6 col-xl-6 col-xxl-6 m-1">
              {/* <div className="col-12 fs-5 fw-normal">Cuisine:</div> */}
              <label className="col-12 fs-5 fw-normal" htmlFor="cuisine">
                Cuisine
              </label>
              <div className="row d-flex justify-content-between">
                <div className="col-6">
                  <select
                    className="px-2 py-2 rounded w-100 fs-6"
                    id="cuisine"
                    name="cuisine"
                    onChange={handleChange}
                    value={formData.cuisine}
                  >
                    <option value="">Select Cuisine</option>
                    {Object.keys(cuisineOptions).map((cuisine) => (
                      <option key={cuisine} value={cuisine}>
                        {cuisine}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="ms-auto me-auto col-sm-12 col-md-9 col-lg-6 col-xl-6 col-xxl-6 m-1">
              <label className="col-12 fs-5 fw-normal" htmlFor="collection">
                Collection
              </label>
              <div className="row d-flex justify-content-between">
                <div className="col-6">
                  <select
                    className="px-2 py-2 rounded w-100 fs-6"
                    id="collection"
                    name="collections"
                    onChange={handleChange}
                    value={formData.collections}
                  >
                    <option value="">Select Collection</option>
                    {formData.cuisine &&
                      cuisineOptions[formData.cuisine].map(
                        (collections, index) => (
                          <option key={index} value={collections}>
                            {collections}
                          </option>
                        )
                      )}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
}
