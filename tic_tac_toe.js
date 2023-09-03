let count = 0;
let sym1 = "X";
let sym2 = "O";

document.querySelectorAll("td").forEach(function(td) {
    td.addEventListener("click", process);
});

function process() {
    let id = this.getAttribute("id");

    if (count % 2 === 0) {
        this.textContent = sym1;
    } else {
        this.textContent = sym2;
    }
    count++;

    // Check for a win after every move by both players
    if (checkWin(sym1)) {
        document.getElementById("announcement").innerHTML = sym1 + " WON";
        removeClickListeners();
    } else if (checkWin(sym2)) {
        document.getElementById("announcement").innerHTML = sym2 + " WON";
        removeClickListeners();
    } else if (count === 9) {
        document.getElementById("announcement").innerHTML = "TIE MATCH";
    }
}

function checkWin(playerSymbol) {
    // Define the winning combinations
    const winningCombos = [
        ["ff", "fs", "ft"],
        ["sf", "ss", "st"],
        ["tf", "ts", "tt"],
        ["ff", "sf", "tf"],
        ["fs", "ss", "ts"],
        ["ft", "st", "tt"],
        ["ff", "ss", "tt"],
        ["ft", "ss", "tf"]
    ];

    // Check each winning combination
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
            document.getElementById(a).textContent === playerSymbol &&
            document.getElementById(b).textContent === playerSymbol &&
            document.getElementById(c).textContent === playerSymbol
        ) {
            return true; // Player has won
        }
    }

    return false; // No win
}

function removeClickListeners() {
    document.querySelectorAll("td").forEach(function(td) {
        td.removeEventListener("click", process);
    });
}