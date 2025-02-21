document.addEventListener("DOMContentLoaded", () => {
    let turn = "X";
    let gameOver = false;
    const boxes = document.querySelectorAll(".box");
    const info = document.querySelector(".info");
    const resetButton = document.getElementById("reset");
    const modeSelect = document.getElementById("mode");
    let gameState = Array(9).fill("");
    let playWithComputer = false;

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                pattern.forEach(index => boxes[index].style.backgroundColor = "#28a745");
                return gameState[a];
            }
        }

        if (!gameState.includes("")) {
            return "draw";
        }
        return null;
    }

    function computerMove() {
        let emptyIndexes = gameState.map((val, index) => val === "" ? index : null).filter(val => val !== null);
        if (emptyIndexes.length > 0) {
            let randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
            handleClick({ target: boxes[randomIndex] }, randomIndex);
        }
    }

    function handleClick(e, index) {
        const box = e.target.closest(".box");
        const boxText = box.querySelector(".boxtext");
        
        if (gameState[index] === "" && !gameOver) {
            gameState[index] = turn;
            boxText.textContent = turn;
            boxText.classList.add("visible");
            
            const winner = checkWin();
            if (winner) {
                gameOver = true;
                info.textContent = winner === "draw" ? "Game Draw!" : `${winner} Wins!`;
            } else {
                turn = turn === "X" ? "O" : "X";
                info.textContent = `${turn}'s Turn`;
                if (playWithComputer && turn === "O") {
                    setTimeout(computerMove, 500);
                }
            }
        }
    }

    function resetGame() {
        gameState = Array(9).fill("");
        gameOver = false;
        turn = "X";
        info.textContent = "X's Turn";
        
        boxes.forEach(box => {
            const boxText = box.querySelector(".boxtext");
            boxText.textContent = "";
            boxText.classList.remove("visible");
            box.style.backgroundColor = "white";
        });
    }

    function updateMode() {
        playWithComputer = modeSelect.value === "computer";
        resetGame();
    }

    boxes.forEach((box, index) => {
        box.addEventListener("click", (e) => handleClick(e, index));
    });

    resetButton.addEventListener("click", resetGame);
    modeSelect.addEventListener("change", updateMode);
});
