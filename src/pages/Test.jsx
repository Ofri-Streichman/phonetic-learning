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
    const [visualQues, setVisualQues] = useState({}); // 'waiting', 'correct' or 'incorrect'
    const [text, setText] = useState(current.letter);


    function randLetter() {
        return alphabet[~~(Math.random() * alphabet.length)]
    }

    async function checkanswer(userInput, letter) {

        var letterItem = alphabet.find((element) => element.letter === letter);
        console.log(letterItem);

        if (userInput.toLowerCase() === letterItem.word.toLowerCase()) {
            console.log("true!");
            setVisualQues({ "letter": 'correct' })
            console.log(visualQues)
            const correctItem = document.querySelector('.letter-'+letter);
            correctItem.classList.add("correct")
            

            return true;
        } else {
            console.log("false!");
            // setVisualQues({ ...visualQues, letter: 'incorrect' })


            return false;
        }


    }



    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const userInputVal = Object.fromEntries((new FormData(e.target)).entries()).userInput;
        var userInput = document.querySelectorAll('.userInput');
        // checkInput(userInputVal);

        console.log("check");

        console.log('--------------------------');

        // ✅ Get only the input elements in a form
        const onlyInputs = document.querySelectorAll('#myForm input');

        onlyInputs.forEach(input => {
            console.log(input.name);
            console.log(input.value);
            checkanswer(input.value, input.name)
        });
        console.log('--------------------------');


        console.log(visualQues);

    }


    return (
        <div id="test-page" className="page">
            <h1>Test Yourself</h1>
            <form
                id="myForm"
                onSubmit={handleSubmit}
                autoComplete="off"
                onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            >

                <div className="test-container">
                    {shuffled.map((x) => <Card
                        key={shortid.generate()}
                        letter={x.letter}
                        word={x.word}
                        visualQue={visualQues[x.letter]}
                    />)}
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