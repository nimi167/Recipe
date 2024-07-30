import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <div className="bgGray py-sm-5 px-sm-5 py-4 px-2">
        <div className="container">
          <div className="row ">
            <div className="col-lg-4 col-md-6  ">
              <div className="logo">
                <Link className="navbar-brand fw-semibold NavLogo" to="/">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    fontSize="30"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="m8.1 13.34 2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"></path>
                  </svg>
                  Perfect<span className="colorRed">Recipies</span>
                </Link>
              </div>
              <div className="colorGray1">
                The Purpose of Lorem ipsum dolor sit amet, consectetur adipisicing elit. A error cupiditate autem ea
                reiciendis, hic, adipisci ipsam temporibus.
              </div>
            </div>
            <div className="col-lg-4  mt-5  mt-md-0 col-md-6  ">
              <div className="row">
                <div className="col-4 fw-bold">Quick Links</div>
                <div className="col-4 fw-bold">Quick Links</div>
                <div className="col-4 fw-bold">Legal</div>
              </div>
              <div className="row my-3">
                <div className="col-4">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </div>
                <div className="col-4">Share Recipe</div>
                <div className="col-4">Terms of Use</div>
              </div>
              <div className="row">
                <div className="col-4">
                  <Link className="nav-link" to="/Recipe">
                    Recipe
                  </Link>
                </div>
                <div className="col-4">
                  <Link className="nav-link" to="/About">
                    About us
                  </Link>
                </div>
                <div className="col-4">Privacy &amp; Cookies</div>
              </div>
              <div className="row">
                <div className="col-4">
                  <Link className="nav-link" to="/Blog">
                    Blog
                  </Link>
                </div>
                <div className="col-4">Contact</div>
              </div>
            </div>
            <div className="col-lg-4  col-md-6 d-none d-lg-block">
              <div className="row">
                <div className="col-12 fw-bold fs-4 text-center">Newsletter</div>
                <div className="col-12 text-center my-1">
                  Subscribe to our newsletter to get more free tip
                </div>
                <form>
                  <div className="col-12 px-4 my-2">
                    <input
                      type="email"
                      className="bgWhite border-0 rounded px-3 py-2 w-100"
                      placeholder="Enter Your Email"
                    />
                  </div>
                  <div className="col-12 px-4 my-3">
                    <button
                      type="submit"
                      className="bgRed colorWhite border-0 rounded px-3 py-2 w-100 boxShadowRed"
                      onClick={e => e.preventDefault()}
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <hr className="my-3  order-sm-1 order-2" />
              <div className="col-sm-7 col-12 text-sm-start text-center order-2">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 256 256"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218ZM94,128a34,34,0,0,0,61.2,20.4,6,6,0,0,1,9.6,7.21,46,46,0,1,1,0-55.22,6,6,0,0,1-9.6,7.21A34,34,0,0,0,94,128Z">
                  </path>
                </svg>{' '}
                RecipeLogo. All Right Reserved
              </div>
              <div className="col-lg-2 col-sm-5 col-6  d-flex justify-content-evenly ms-auto me-sm-0 me-auto my-sm-0 my-4 order-sm-3">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  fontSize="20"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15c0-1.66 1.34-3 3-3 .35 0 .69.07 1 .18V6h5v2h-3v7.03A3.003 3.003 0 0 1 11 18c-1.66 0-3-1.34-3-3z">
                  </path>
                </svg>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  fontSize="20"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z">
                  </path>
                </svg>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 320 512"
                  fontSize="18"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
                  </path>
                </svg>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  fontSize="20"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm76.1 27.2c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
                  </path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
