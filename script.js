document.addEventListener("DOMContentLoaded", () => {
    const secretCode = generateSecretCode();
    const input = document.getElementById("guess-input");
    const guessButton = document.getElementById("guess-button");
    const revealButton = document.getElementById("reveal-button");
    const attemptsList = document.getElementById("attempts-list");

    function generateSecretCode() {
        let digits = [];
        while (digits.length < 4) {
            const digit = Math.floor(Math.random() * 10).toString();
            if (!digits.includes(digit)) digits.push(digit);
        }
        return digits.join('');
    }

    function checkGuess(guess, code) {
        let bulls = 0;
        let cows = 0;
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === code[i]) {
                bulls++;
            } else if (code.includes(guess[i])) {
                cows++;
            }
        }
        return { bulls, cows };
    }

    function addAttempt(guess, result) {
        const li = document.createElement("li");
        li.textContent = `Palpite: ${guess} | Bulls: ${result.bulls}, Cows: ${result.cows}`;
        attemptsList.prepend(li);
    }

    guessButton.addEventListener("click", () => {
        const guess = input.value;
        if (guess.length !== 4 || isNaN(guess)) {
            alert("Por favor, insira um palpite válido de 4 dígitos!");
            return;
        }
        const result = checkGuess(guess, secretCode);
        addAttempt(guess, result);
        input.value = "";
    });

    revealButton.addEventListener("click", () => {
        alert(`A senha secreta é: ${secretCode}`);
    });
});
