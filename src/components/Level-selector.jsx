import React, { useState } from 'react';
import shortid from 'shortid';


export default function LevelSelector(props){
    const [level, setLevel] = useState(1);

    function changeLevel(e){
        setLevel(e.target.value)
        props.changeLevel(e.target.value)
    }

    return (<label>
        Level:
        <select name="level" onChange={changeLevel} value={level}>
            {[...Array(props.maxLevel).keys()].map((x) => <option key={shortid.generate()} value={x + 1} >{x + 1}</option>)}
        </select>
    </label>)
}