import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo() {
    return (
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
            </svg >
            Perfect <span className="colorRed" > Recipies</span>
        </Link >
    )
}
