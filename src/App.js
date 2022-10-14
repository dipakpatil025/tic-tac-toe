import './App.css';
import {useState} from "react";

let STATE_ARRAY = Array(9).fill(null);
let moves = [];
let gameOver = false;

const bitToUser = (n) => {
    return n === 1 ? 'O' : 'X';
}

const updateResult = (r) => {
    document.getElementById('result').innerHTML = r;
}

function getWinMessage(bit) {
    if (bitToUser(bit) === 'O') {
        return 'You won! 🎉🥳'
    }

    return 'You lose! 😔👎'
}

function check(arr = STATE_ARRAY) {
    for (let i = 0; i < 3; i++) {
        let initial = arr[i * 3];
        if (initial === null) {
            continue;
        }
        if (arr.slice(i * 3, i * 3 + 3).every(e => e === arr[i * 3])) {
            return getWinMessage(arr[i * 3]);
        }
    }

    for (let i = 0; i < 3; i++) {
        if (arr[i] === null || arr[i + 3] === null || arr[i + 6] === null) {
            continue;
        }

        if (arr[i] === arr[i + 3] && arr[i + 3] === arr[i + 6]) {
            return getWinMessage(arr[i]);
        }
    }

    if (arr[0] !== null & arr[4] !== null && arr[8] !== null) {
        if (arr[0] === arr[4] && arr[4] === arr[8]) {
            return getWinMessage(arr[0]);
        }
    }

    if (arr[2] !== null && arr[4] !== null && arr[6] !== null) {
        if (arr[2] === arr[4] && arr[4] === arr[6]) {
            return getWinMessage(arr[2])
        }
    }

    if (arr.every(e => e !== null)) {
        return "Game has been tied";
    }
}

function playRandomMove() {
    const choices = [];
    STATE_ARRAY.forEach((e, i) => {
        if (e === null) choices.push(i);
    })
    return choices[Math.floor(Math.random() * choices.length)]
}

function updateState(id, move) {
    const item = document.getElementById(id);
    const index = parseInt(id);

    if (item.textContent) {
        return false;
    }

    STATE_ARRAY[index - 1] = +move;
    moves.push(index - 1);
    item.textContent = bitToUser(STATE_ARRAY[index - 1]);
    return true;
}

function playBotMove(switchMove) {
    const botMove = playRandomMove();
    console.log(botMove);
    updateState(botMove + 1, false);
    checkWinAndUpdate(switchMove, true);
}

function checkWinAndUpdate(switchMove, isBotMove = false) {
    let res = check();
    if (!res) {
        if (!isBotMove) playBotMove(switchMove);
        switchMove();
        return;
    }
    gameOver = true;
    updateResult(res);
}

function App() {
    const [move, setMove] = useState(true)

    function switchTurn() {
        setMove(m => !m);
    }

    const click = e => {
        if (gameOver || !move) {
            return;
        }

        const isStateUpdated = updateState(e.currentTarget.id, move);
        if (isStateUpdated) {
            checkWinAndUpdate(switchTurn);
        }
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
                    gameOver = false;
                    setMove(true);
                }}>Clear
                </button>

                <button className='btn' onClick={() => {
                    if (moves.length === 0) {
                        updateResult('This is the last move, can\'t undo');
                        return;
                    }

                    for (let i = 0; i < 2; i++) {
                        const lastMove = moves.pop();
                        STATE_ARRAY[lastMove] = null;
                        document.getElementById(`${lastMove+1}`).innerText = '';
                    }

                    setMove(true);
                }}>Undo
                </button>
            </div>
        </div>
    );
}

export default App;




