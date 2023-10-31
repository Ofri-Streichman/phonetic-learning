import React from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


export default function LetterCard(props) {


    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const userInputVal =  Object.fromEntries((new FormData(e.target)).entries()).userInput;
        var userInput = document.querySelector('#userInput');
        // console
        userInput.value = '';
        props.checkInput(userInputVal);
    }


    return <div className={"Card " + props.visualQue}>
        <h2>{props.letter}</h2>

        <div className="CardInput">
                <label>
                    <input name="userInput" id="userInput" />
                </label>
        </div>
    </div>
}