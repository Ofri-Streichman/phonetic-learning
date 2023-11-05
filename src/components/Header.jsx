import React from "react";
import MenuBookIcon from '@mui/icons-material/MenuBook';



export default function Header({ openNav, logoColour }) {
    return (
        <>
            <div id="mobile-header">
                <h2 style={{ color: logoColour }}><MenuBookIcon /> Phonetix</h2>
            </div>
            <button id="sidebar-open-button"
                onClick={openNav}
                className="open-button undraggable"
            >&#9776;</button>
        </>)
}

