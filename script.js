const countries = [
    { country: "Türkiye", capital: "Ankara", cities: ["İstanbul", "İzmir", "Bursa", "Ankara"] },
    { country: "Almanya", capital: "Berlin", cities: ["Münih", "Hamburg", "Frankfurt", "Berlin"] },
    { country: "Fransa", capital: "Paris", cities: ["Lyon", "Marsilya", "Nice", "Paris"] },
    { country: "İngiltere", capital: "Londra", cities: ["Manchester", "Birmingham", "Liverpool", "Londra"] },
    { country: "İtalya", capital: "Roma", cities: ["Milano", "Napoli", "Venedik", "Roma"] },
    { country: "Rusya", capital: "Moskova", cities: ["St. Petersburg", "Novosibirsk", "Yekaterinburg", "Moskova"] },
    { country: "Japonya", capital: "Tokyo", cities: ["Osaka", "Nagoya", "Fukuoka", "Tokyo"] },
    { country: "Çin", capital: "Pekin", cities: ["Şanghay", "Guangzhou", "Shenzhen", "Pekin"] },
    { country: "Kanada", capital: "Ottawa", cities: ["Toronto", "Vancouver", "Montreal", "Ottawa"] },
    { country: "Brezilya", capital: "Brasilia", cities: ["Rio de Janeiro", "Sao Paulo", "Salvador", "Brasilia"] },
    { country: "Hollanda", capital: "Amsterdam", cities: ["Rotterdam", "Lahey", "Utrecht", "Amsterdam"] },
    { country: "İspanya", capital: "Madrid", cities: ["Barselona", "Valencia", "Sevilla", "Madrid"] },
    { country: "Avustralya", capital: "Canberra", cities: ["Sidney", "Melbourne", "Brisbane", "Canberra"] },
    { country: "Hindistan", capital: "Yeni Delhi", cities: ["Mumbai", "Kolkata", "Bangalore", "Yeni Delhi"] },
    { country: "Meksika", capital: "Meksiko", cities: ["Guadalajara", "Monterrey", "Puebla", "Meksiko"] },
    { country: "Endonezya", capital: "Cakarta", cities: ["Surabaya", "Bandung", "Medan", "Cakarta"] },
    { country: "Arjantin", capital: "Buenos Aires", cities: ["Córdoba", "Rosario", "Mendoza", "Buenos Aires"] },
    { country: "Güney Kore", capital: "Seul", cities: ["Busan", "Incheon", "Daegu", "Seul"] },
    { country: "Mısır", capital: "Kahire", cities: ["İskenderiye", "Gize", "Luxor", "Kahire"] },
    { country: "Güney Afrika", capital: "Pretoria", cities: ["Cape Town", "Johannesburg", "Durban", "Pretoria"] }
];

let score = 0;
let wrongAnswers = 0;

const questionElement = document.getElementById('question');
const choiceButtons = document.querySelectorAll('.choice');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const restartButton = document.getElementById('restart-btn');

function getRandomCountry() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
}

function generateQuestion() {
    const correctCountry = getRandomCountry();
    const correctCapital = correctCountry.capital;
    questionElement.textContent = `${correctCountry.country} ülkesinin başkenti nedir?`;

    let choices = [...correctCountry.cities];
    choices = choices.sort(() => Math.random() - 0.5);

    choiceButtons.forEach((button, index) => {
        button.textContent = choices[index];
        button.className = 'choice';  // Remove previous classes
        button.onclick = () => checkAnswer(button, correctCapital);
    });
}

function checkAnswer(button, correctCapital) {
    if (button.textContent === correctCapital) {
        score++;
        button.classList.add('correct');
    } else {
        wrongAnswers++;
        button.classList.add('wrong');
    }

    scoreElement.textContent = `Puan: ${score}`;
    livesElement.textContent = `Yanlış Hak: ${3 - wrongAnswers}`;

    setTimeout(() => {
        if (wrongAnswers >= 3) {
            endGame();
        } else {
            generateQuestion();
        }
    }, 1000);
}

function endGame() {
    questionElement.textContent = 'Oyun Bitti!';
    choiceButtons.forEach(button => button.disabled = true);
    restartButton.style.display = 'block';
}

function restartGame() {
    score = 0;
    wrongAnswers = 0;
    scoreElement.textContent = `Puan: ${score}`;
    livesElement.textContent = `Yanlış Hak: ${3 - wrongAnswers}`;
    choiceButtons.forEach(button => {
        button.disabled = false;
        button.className = 'choice';  // Remove previous classes
    });
    restartButton.style.display = 'none';
    generateQuestion();
}

generateQuestion();
