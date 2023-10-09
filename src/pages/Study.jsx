import React, { useState } from 'react';
import shortid, { generate } from 'shortid';
import Card from "../components/Study-card"

function Study(props) {
    let alphabet = props.alphabet;
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
        <div id="study-page">
            <h1>Study Page</h1>
            <p>hover over any card to reveal it's NATO phonetic alphabet encryption</p>
            <div className="study-container">
                {alphabet.map((x) => <Card key={shortid.generate()} letter={x.letter} word={x.word} />)}
            </div>
        </div>
    )
}

export default Study;