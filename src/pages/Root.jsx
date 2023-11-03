import React, { useState } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Outlet, useLocation } from "react-router-dom";

const pages = [
    { pageName: "Home", path: "/" },
    { pageName: "Study", path: "/study" },
    { pageName: "Practice", path: "/practice" },
    { pageName: "Test", path: "/test" },
]

export default function Root() {
    let location = useLocation().pathname;
    const[soundOn, setSoundOn]= useState(true);
    return (
        <>
            <div id="sidebar">
                <h2 className='undraggable'><a href='/'><MenuBookIcon /> Phonetix</a></h2>
                <nav>
                    <ul>
                        {pages.map(({ pageName, path }) =>
                            <li>
                                <a
                                    href={path}
                                    className={(location === path) ? "navbar-link active" : "navbar-link"}
                                >
                                    {pageName}
                                </a>
                            </li>
                        )}
                    </ul>
                </nav>

            </div>
            <Outlet soundOn={soundOn} />
        </>
    );
}