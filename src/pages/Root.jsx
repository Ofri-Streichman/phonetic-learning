import React, { useState } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Outlet } from "react-router-dom";

export async function loader() {
    return [{ name: "hello" }];
}

export default function Root() {
    return (
        <>
            <div id="sidebar">
                <h1 className='undraggable'><MenuBookIcon /> Phonetix</h1>
                <nav>
                    <ul>
                        <li>
                            <a className="navbar-link" href='/study'>Study</a>
                        </li>
                        <li>
                            <a className="navbar-link" href='/practice' >Practice</a>
                        </li>
                        <li>
                            <a className="navbar-link" href='/test' >Test Yourself</a>
                        </li>
                    </ul>
                </nav>

            </div>
            <Outlet />
        </>
    );
}