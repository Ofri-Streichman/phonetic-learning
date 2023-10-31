import React, { useState } from 'react';
import shortid, { generate } from 'shortid';
import Card from "../components/Study-card"
import alphabet from "../phonetic_alphabet.json";


function Study(props) {
    let phonetic_array = alphabet.dictionary;
    // const [level, setLevel] = useState(1);
    // const [items, setItems] = useState(generateCards(level));


    // function generateCards(newLevel) {
    //     const shuffled = alphabet.sort(() => 0.5 - Math.random());
    //     // Get sub-array of first n elements after shuffled
    //     let selected = shuffled.slice(0, newLevel);
    //     return selected;
    // }

    // function changeLevel(newLevel) {
    //     setLevel(newLevel)
    //     setItems(generateCards(newLevel))
    // }
    // <LevelSelector maxLevel={props.maxLevel} changeLevel={changeLevel} level={level} />


    return (
        <div id="study-page" className="page">
            <h1>Study Page</h1>
            <p>Hover over any card to reveal it's NATO phonetic alphabet encryption</p>
            <div className="study-container">
                {phonetic_array.map((x) => <Card key={shortid.generate()} letter={x.letter} word={x.word} />)}
            </div>
        </div>
    )
}

export default Study;