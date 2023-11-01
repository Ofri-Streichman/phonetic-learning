import React, { useState } from 'react';
import Card from "../components/Test-card";
import shortid, { generate } from 'shortid';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import phonetic_alphabet from "../phonetic_alphabet.json";

let alphabet = phonetic_alphabet.dictionary;
const shuffled = alphabet.sort(() => 0.5 - Math.random()).slice(0, 12);
console.log("RESHUFFLED!")


export default function Test() {
    // const [score, setScore] = useState(0);
    let score = 0;
    const [testPhase, setTestPhase] = useState("test"); // test or check
    const [visualQues, setVisualQues] = useState({}); // 'waiting', 'correct' or 'incorrect'


    const convertArrayToObject = (array, key) => {
        const initialValue = {};
        return array.reduce((obj, item) => {
            return {
                ...obj,
                [item[key]]: '',
            };
        }, initialValue);
    };

        let obj = convertArrayToObject(shuffled, "letter")
    
    const [formData, setFormData] = useState({
        ...obj
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    function checkanswer(userInput, letter) {
        var letterItem = alphabet.find((element) => element.letter === letter);
        console.log(letterItem);

        // const letterCard = document.querySelector('.letter-' + letter);
        // console.log(letterCard);


        if (userInput.toLowerCase() === letterItem.word.toLowerCase()) {
            // letterCard.classList.add("correct")
            setVisualQues(
                {
                    ...visualQues,
                    [letter]: 'correct',
                }
            )
            score += 8.5;
            console.log("score: ", score)
        } else {
            // letterCard.classList.add("incorrect")
            setVisualQues(
                {
                    ...visualQues,
                    [letter]: 'incorrect',
                }
            )
        }
    }



    const handleSubmit = event => {
        // Prevent the browser from reloading the page
        event.preventDefault();

        // cannot change the input anymore
        setTestPhase("check");

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
            <h2>Your Score is {score} </h2>
            <form
                onSubmit={handleSubmit}
                onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                autoComplete='off'
            >
                <div className="test-container">
                    {shuffled.map(({letter, word}) => <div className={"Card  letter-" + letter}>
                        <label htmlFor={letter}><h2>{letter}</h2></label>
                        <div className="CardInput">
                            <label>
                                <input
                                    type="text"
                                    id={"userInput" + letter}
                                    name={letter}
                                    value={formData[letter]}
                                    onChange={handleInputChange}
                                    className={"userInput " + visualQues[letter]}
                                />
                            </label>
                        </div>
                    </div>
                    )}
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