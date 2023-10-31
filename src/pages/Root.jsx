import React, { useState } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import App from './App';

export async function loader() {
    return [{ name: "hello" }];
}

export default function Root() {
    const [page, setPage] = useState("/");

    function loadPage(x) {
        setPage(x)
    }

    return (
        <>
            <div id="sidebar">
                <h1><MenuBookIcon /> Phonetix</h1>
                <nav>
                    <ul>
                        <li>
                            <a className="navbar-link" onClick={() => loadPage(`study`)}>Study</a>
                        </li>
                        <li>
                            <a className="navbar-link" onClick={() => loadPage(`practice`)}>Practice</a>
                        </li>
                        <li>
                            <a className="navbar-link" onClick={() => loadPage(`test`)}>Test Yourself</a>
                        </li>
                    </ul>
                </nav>

            </div>
            <App page={page} />
        </>
    );
}