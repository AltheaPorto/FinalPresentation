const searchBtn = document.getElementById("search-btn");
const wordInput = document.getElementById("inp-word");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("click", function() {
    const word = wordInput.value.trim();
    if (word === "") {
        resultDiv.innerHTML = "<p>Please enter a word.</p>";
        return;
    }
    fetch(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${word}?key=89379086-c883-4d4b-b27b-098a1bb78180`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                resultDiv.innerHTML = `
                    <h3>${word}</h3>
                    <div class="word-meaning">${data[0].shortdef[0]}</div>
                `;
            } else {
                resultDiv.innerHTML = "<p>No definitions found.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            resultDiv.innerHTML = "<p>An error occurred while fetching data. Please check your network connection and try again.</p>";
        });
});
