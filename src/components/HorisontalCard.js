import React from 'react'
import Star from './Star'
import { BsFire } from "react-icons/bs";
export default function HorisontalCard({ title, Rating, images }) {
    const BaseURL = process.env.REACT_APP_BASE_URL;

    return (
        <>
            <div className="row">
                <div className="col-5  p-0">
                    <img
                        src={`${BaseURL}/uploads/${images}`}
                        className="w-100" style={{ height: "100px", objectFit: "cover" }} alt="..." />
                </div>
                <div className="col-7 ">
                    <p className='fs-small fw-bolder mt-2'>{title}</p>
                    <Star star={Rating} />
                    <div className="fs-small">
                        <BsFire className='colorRed' /> 300 cals
                    </div>
                </div>
            </div>
        </>
    )
}
