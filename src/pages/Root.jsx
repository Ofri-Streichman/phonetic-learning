import React, { useState } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import { Outlet, useLocation } from "react-router-dom";
import shortid from 'shortid';
import Header from '../components/Header'

const pages = [
    { pageName: "Home", path: "/" },
    { pageName: "Study", path: "/study" },
    { pageName: "Practice", path: "/practice" },
    { pageName: "Test", path: "/test" },
]

export default function Root() {
    let location = useLocation().pathname;
    const [soundOn, setSoundOn] = useState(true);

    function openNav() {
        document.getElementById("sidebar").style.display = "block";
        document.getElementById("sidebar-open-button").style.display = "none";
    }

    function closeNav() {
        document.getElementById("sidebar").style.display = "none";
        document.getElementById("sidebar-open-button").style.display = "block";
    }

    function toggleSidebar() {
        document.querySelector('#sidebar').classList.toggle('opened');
    }


    return (
        <>
            <div id="sidebar">
                <div className='closebtn-and-logo'>
                    <h2 className='undraggable'><a href='/'><MenuBookIcon /> Phonetix</a></h2>
                    <a className="closebtn" onClick={toggleSidebar}><p>×</p></a>
                </div>
                <nav>
                    <ul>
                        {pages.map(({ pageName, path }) =>
                            < li
                                key={shortid.generate()}>
                                <a
                                    href={path}
                                    className={(location === path) ? "navbar-link active" : "navbar-link"}
                                >
                                    {pageName}
                                </a>
                            </li>
                        )}
                    </ul>
                    <div id="soundOn-button">
                        <a onClick={() => setSoundOn(!soundOn)}>
                            {soundOn ?
                                (<VolumeUpIcon />) :
                                (<VolumeMuteIcon />)}
                        </a>
                    </div>
                </nav>

            </div>
            <Outlet context={[soundOn, setSoundOn]} />
            {/* <Outlet soundOn={soundOn} /> */}
            <Header openNav={toggleSidebar} logoColour={(location === "/" ? "white" : "black")} />

        </>
    );
}