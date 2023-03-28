import { useState } from "react"
import Square from "./square"

const Board = () => {
    const [game, setGame] = useState([null, null, null, null, null, null, null, null, null])
    const [player, setPlayer] = useState(true)
    const [previousGame, setPreviousGame] = useState(null)
    const handlePlay = (position) => {
        const winner = checkWinner();
        // console.log(winner);
        if (winner) {
            return;
        }
        setPreviousGame([...game]);
        const newGame = game.map((g, index) => {
            if (position === index) {
                return player ? "X" : "O"
            }
            return g
        })
        setGame(newGame)
        setPlayer(!player)
    }

    const listWin = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    const checkWinner = () => {
        for (let i = 0; i < listWin.length; i++) {
            const [p1, p2, p3] = listWin[i]
            if (game[p1] === game[p2] && game[p2] === game[p3]) {
                // return listWin[i]
                return game[p1]
            }
        }
        return null
    }

    const playerWin = (game) => {
        for (let i = 0; i < listWin.length; i++) {
            const [p1, p2, p3] = listWin[i]
            if (game[p1] === game[p2] && game[p2] === game[p3]) {
                return listWin[i]
                // return game[p1]
            }
        }
        return null
    }

    const resetGame = () => {
        setGame([null, null, null, null, null, null, null, null, null]);
        setPlayer(true);
    };
    const undo = () => {
        if (previousGame) { // kiểm tra nếu có trạng thái trước đó
            setGame(previousGame); // khôi phục lại trạng thái của game
            setPreviousGame(null); // xóa trạng thái trước đó
            setPlayer(!player); // đổi lượt chơi
        }
    }
    const winner = playerWin(game)
    return <div>
        <h2>Winner is: {checkWinner()}</h2>
        <div className="grid grid-cols-3 gap-2">
            {game.map((item, index) => {
                const squareStyle =
                    item === "X" ? "text-[#545454]" : item === "O" ? "text-[#F2EBD3]" : "";
                const winningStyle =
                    winner && winner.includes(index) ? "animate-pulse" : "";
                return (
                    <Square
                        key={index}
                        value={item}
                        className={`${squareStyle} ${winningStyle}`}
                        handlePlay={() => handlePlay(index)}
                    />
                );
            })}
            {/* <Square value={game[0]} handlePlay={() => handlePlay(0)} />
            <Square value={game[1]} handlePlay={() => handlePlay(1)} />
            <Square value={game[2]} handlePlay={() => handlePlay(2)} />
            <Square value={game[3]} handlePlay={() => handlePlay(3)} />
            <Square value={game[4]} handlePlay={() => handlePlay(4)} />
            <Square value={game[5]} handlePlay={() => handlePlay(5)} />
            <Square value={game[6]} handlePlay={() => handlePlay(6)} />
            <Square value={game[7]} handlePlay={() => handlePlay(7)} />
            <Square value={game[8]} handlePlay={() => handlePlay(8)} /> */}
        </div>
        <div className="grid grid-cols-2 gap-2">
            <button onClick={resetGame}>Reset</button>
            <button onClick={undo}>
                Undo
            </button>

        </div>
    </div>
}

export default Board