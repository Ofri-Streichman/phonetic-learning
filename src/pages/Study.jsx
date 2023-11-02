import React from 'react';
import shortid from 'shortid';
import Card from "../components/Study-card"
import alphabet from "../phonetic_alphabet.json";

function Study() {
    let phonetic_array = alphabet.dictionary;
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