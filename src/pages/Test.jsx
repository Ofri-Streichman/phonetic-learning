import React, { useState } from 'react';
import Card from "../components/Test-card";
import shortid, { generate } from 'shortid';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import phonetic_alphabet from "../phonetic_alphabet.json";

function Test(props) {
    let alphabet = phonetic_alphabet.dictionary;
    const shuffled = alphabet.sort(() => 0.5 - Math.random()).slice(0, 12);

    const [current, setCurrent] = useState(randLetter());
    const [score, setScore] = useState(0);
    const [visualQue, setVisualQue] = useState('waiting'); // 'waiting', 'correct' or 'incorrect'
    const [text, setText] = useState(current.letter);


    function randLetter() {
        return alphabet[~~(Math.random() * alphabet.length)]
    }

    async function checkInput(userInput) {
        console.log(userInput);
        console.log(current.word);

        if (userInput.toLowerCase() === current.word.toLowerCase()) {
            setVisualQue('correct');
            setScore(score + 10);
        } else {
            setVisualQue('incorrect');
        }
        setText(current.word)
        await new Promise(r => setTimeout(r, 1000));
        newRound();
    }

    async function newRound() {
        let randLetter = alphabet[~~(Math.random() * alphabet.length)]
        setVisualQue('waiting')
        setCurrent(randLetter)
        setText(randLetter.letter)
    }

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const userInputVal = Object.fromEntries((new FormData(e.target)).entries()).userInput;
        var userInput = document.querySelectorAll('.userInput');
        // checkInput(userInputVal);

        console.log("check")
        // console.log(userInput)
        // console.log(userInputVal)

        const form = document.getElementById('myForm');

        // ✅ Get all form elements
        const formElements = Array.from(form.elements);

        formElements.forEach(element => {
            console.log(element);
            console.log(element.value);
        });

        console.log('--------------------------');

        // ✅ Get only the input elements in a form
        const onlyInputs = document.querySelectorAll('#myForm input');

        onlyInputs.forEach(input => {
            console.log(input);
        });

    }


    return (
        <div id="test-page" className="page">
            <h1>Test Yourself</h1>
            <form id="myForm" onSubmit={handleSubmit} autoComplete="off">

                <div className="test-container">
                    {shuffled.map((x) => <Card key={shortid.generate()} letter={x.letter} word={x.word} />)}
                    <button type="submit" className='Submit-button'>
                        <div className='button-inside'>
                            <CheckBoxIcon />
                            <div>
                                Check My Answers
                            </div>
                        </div>
                    </button>

                </div>
            </form>

        </div>
    )
}

export default Test;