import './App.css';
import {useState} from "react";

let STATE_ARRAY = Array(9).fill(null);
let moves = [];
let status = false;

const bitToUser = (n) => {
    return n === 1 ? 'O' : 'X';
}

const updateResult = (r) => {
    document.getElementById('result').innerHTML = r;
}

function check(arr) {
    for (let i = 0; i < 3; i++) {
        let initial = arr[i * 3];
        if (initial === null) {
            continue;
        }
        if (arr.slice(i * 3, i * 3 + 3).every(e => e === arr[i * 3])) {
            return `${bitToUser(arr[i * 3])} wins`;
        }
    }

    for (let i = 0; i < 3; i++) {
        if (arr[i] === null || arr[i + 3] === null || arr[i + 6] === null) {
            continue;
        }

        if (arr[i] === arr[i + 3] && arr[i + 3] === arr[i + 6]) {
            return `${bitToUser(arr[i])} wins`
        }
    }

    if (arr[0] !== null & arr[4] !== null && arr[8] !== null) {
        if (arr[0] === arr[4] && arr[4] === arr[8]) {
            return `${bitToUser(arr[0])} wins`
        }
    }

    if (arr[2] !== null && arr[4] !== null && arr[6] !== null) {
        if (arr[2] === arr[4] && arr[4] === arr[6]) {
            return `${bitToUser(arr[2])} wins`
        }
    }

    if (arr.every(e => e !== null)) {
        return "Game has been tied";
    }
}

function App() {
    const [move, setMove] = useState(true)
    const click = e => {
        if (status) {
            return;
        }


        const id = e.currentTarget.id;
        const item = document.getElementById(id);
        const index = parseInt(id);

        if (item.textContent) {
            return;
        }

        STATE_ARRAY[index - 1] = +move;
        moves.push(index - 1);
        setMove(!move);
        item.textContent = bitToUser(STATE_ARRAY[index - 1]);

        const res = check(STATE_ARRAY);
        if (!res) {
            return;
        }
        status = true;
        updateResult(res);
    }

    return (
        <div className="App">

            <div className="grid-container">
                <div className="grid-item" id='1' onClick={click}></div>
                <div className="grid-item right left" id='2' onClick={click}></div>
                <div className="grid-item" id='3' onClick={click}></div>
                <div className="grid-item top bottom" id='4' onClick={click}></div>
                <div className="grid-item top bottom right left" id='5' onClick={click}></div>
                <div className="grid-item top bottom" id='6' onClick={click}></div>
                <div className="grid-item" id='7' onClick={click}></div>
                <div className="grid-item right left" id='8' onClick={click}></div>
                <div className="grid-item" id='9' onClick={click}></div>
            </div>

            <h2 id='result'>New Game</h2>
            <div>
                <button className='btn' onClick={() => {
                    STATE_ARRAY.forEach((_, i) => {
                        document.getElementById(`${i + 1}`).innerText = '';
                    })
                    STATE_ARRAY.forEach((_, i) => {
                        STATE_ARRAY[i] = null;
                    })

                    updateResult("New Game")
                    status = false;
                }}>Clear
                </button>

                <button className='btn' onClick={() => {
                    if (moves.length === 0) {
                        updateResult('This is the last move, can\'t undo');
                        return;
                    }
                    const lastMove = moves.pop();
                    setMove(!move);
                    STATE_ARRAY[lastMove] = null;
                    document.getElementById(`${lastMove+1}`).innerText = '';
                }}>Undo
                </button>
            </div>
        </div>
    );
}

export default App;
