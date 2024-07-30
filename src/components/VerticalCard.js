import React, { useEffect } from 'react'
import Star from './Star'
import { Link } from 'react-router-dom'

export default function VerticalCard(props) {
    const BaseURL = process.env.REACT_APP_BASE_URL;

    return (
        <>
            <div className="col-md-4 col-6 text-decoration-none">
                <Link className="text-decoration-none" to={`/Recipe/${props.recipe._id}`}>
                    <div className="card my-3 position-relative">
                        <div className='border-bottom'>
                            <img
                                src={`${BaseURL}/uploads/${props.recipe.images[0]}`}
                                className="card-img-top CardImage" alt="..." />
                        </div>
                        <div className="card-body pt-1 pb-2">
                            <div className="mx-1">
                                <Star star={props.recipe.Rating ? props.recipe.Rating : 0} />
                            </div>
                            {props.display === "none" ? <>
                                <h6 className="card-title my-2 cardName">{props.recipe.title.length > 25 ? `${props.recipe.title.slice(0, 25)}...` : props.recipe.title}</h6>
                            </> :
                                <h5 className="card-title my-2 cardName">{props.recipe.title.length > 35 ? `${props.recipe.title.slice(0, 35)}...` : props.recipe.title}</h5>
                            }
                            {
                                props.display === "none" ? <></>
                                    :
                                    <div className="d-flex justify-content-between">
                                        <div className="my-2 d-lg-block d-none">
                                            <img src="images/profile.jpeg" className="card-img-top profileIcon me-2" alt="..." /> {props.recipe.Author}
                                        </div>
                                        <div className="p-0 pt-2 d-lg-block d-none">
                                            <button className="btn border py-1 align-middle">
                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="colorRed" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 23C16.1421 23 19.5 19.6421 19.5 15.5C19.5 14.6345 19.2697 13.8032 19 13.0296C17.3333 14.6765 16.0667 15.5 15.2 15.5C19.1954 8.5 17 5.5 11 1.5C11.5 6.49951 8.20403 8.77375 6.86179 10.0366C5.40786 11.4045 4.5 13.3462 4.5 15.5C4.5 19.6421 7.85786 23 12 23ZM12.7094 5.23498C15.9511 7.98528 15.9666 10.1223 13.463 14.5086C12.702 15.8419 13.6648 17.5 15.2 17.5C15.8884 17.5 16.5841 17.2992 17.3189 16.9051C16.6979 19.262 14.5519 21 12 21C8.96243 21 6.5 18.5376 6.5 15.5C6.5 13.9608 7.13279 12.5276 8.23225 11.4932C8.35826 11.3747 8.99749 10.8081 9.02477 10.7836C9.44862 10.4021 9.7978 10.0663 10.1429 9.69677C11.3733 8.37932 12.2571 6.91631 12.7094 5.23498Z"></path>
                                                </svg>{' '}
                                                {props.recipe.Rating + 18} cals
                                            </button>
                                        </div>
                                    </div>
                            }
                        </div>
                        <div className="position-absolute BookmarkPosition">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 384 512"
                                className="bgWhite colorRed py-1 px-1 border rounded "
                                height="25"
                                width="25"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-32.1-39.8-51-21.1L192 114.7 51 26.9C32.1 8.2 0 21.5 0 48z"></path>
                            </svg>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}