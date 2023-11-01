import React, { useState } from 'react';
import Card from "../components/Test-card";
import shortid, { generate } from 'shortid';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import phonetic_alphabet from "../phonetic_alphabet.json";

function Test() {
    let alphabet = phonetic_alphabet.dictionary;
    const shuffled = alphabet.sort(() => 0.5 - Math.random()).slice(0, 12);
    console.log("RESHUFFLED!")

    const [score, setScore] = useState(0);
    const [testPhase, settestPhase] = useState("test"); // test or check
    const [visualQues, setVisualQues] = useState({}); // 'waiting', 'correct' or 'incorrect'


    function checkanswer(userInput, letter) {
        var letterItem = alphabet.find((element) => element.letter === letter);
        console.log(letterItem);

        const letterCard = document.querySelector('.letter-' + letter);
        console.log(letterCard);


        if (userInput.toLowerCase() === letterItem.word.toLowerCase()) {
            console.log("true!");
            letterCard.classList.add("correct")
            

            return true;
        } else {
            console.log("false!");
            letterCard.classList.add("incorrect")
            return false;
        }


    }



    const handleSubmit = event => {
        // Prevent the browser from reloading the page
        event.preventDefault();

        // cannot change the input anymore
        settestPhase("check");

        // ✅ Get only the input elements in a form
        const onlyInputs = document.querySelectorAll('#myForm input');

        onlyInputs.forEach(input => {
            console.log(input.name);
            console.log(input.value);
            checkanswer(input.value, input.name)
        });
        console.log('--------------------------');

    }


    return (
        <div id="test-page" className="page">
            <h1>Test Yourself</h1>
            <form
                id="myForm"
                onSubmit={handleSubmit}
                autoComplete="off"
                onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                testPhase={testPhase}
            >

                <div className="test-container">
                    {shuffled.map((x) => <Card
                        key={shortid.generate()}
                        letter={x.letter}
                        word={x.word}
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