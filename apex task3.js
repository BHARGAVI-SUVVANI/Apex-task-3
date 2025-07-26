const quizData = [
    {
        question: "What is JavaScript?",
        choices: [
            "A programming language",
            "A markup language",
            "A styling language",
            "A database"
        ],
        correct: 0
    },
    {
        question: "Which method is used to add an element at the end of an array?",
        choices: [
            "push()",
            "pop()",
            "shift()",
            "unshift()"
        ],
        correct: 0
    },
    {
        question: "What does DOM stand for?",
        choices: [
            "Document Object Model",
            "Data Object Model",
            "Document Oriented Model",
            "Digital Object Model"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const submitBtn = document.getElementById('submit');
const resultEl = document.getElementById('result');

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionEl.textContent = question.question;
    
    choicesEl.innerHTML = '';
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice';
        button.textContent = choice;
        button.onclick = () => selectChoice(index);
        choicesEl.appendChild(button);
    });
}

function selectChoice(index) {
    const choices = choicesEl.getElementsByClassName('choice');
    Array.from(choices).forEach(choice => choice.classList.remove('selected'));
    choices[index].classList.add('selected');
}

submitBtn.addEventListener('click', () => {
    const selected = choicesEl.querySelector('.selected');
    if (!selected) {
        alert('Please select an answer');
        return;
    }

    const selectedIndex = Array.from(choicesEl.children).indexOf(selected);
    const correct = selectedIndex === quizData[currentQuestion].correct;
    
    resultEl.textContent = correct ? 'Correct!' : 'Wrong answer, try again!';
    resultEl.style.color = correct ? 'green' : 'red';

    if (correct) {
        setTimeout(() => {
            currentQuestion = (currentQuestion + 1) % quizData.length;
            loadQuestion();
            resultEl.textContent = '';
        }, 1500);
    }
});

// Carousel functionality
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dotsContainer = document.querySelector('.carousel-dots');

let currentSlide = 0;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
});

function updateSlidePosition() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    const dots = dotsContainer.getElementsByClassName('dot');
    Array.from(dots).forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateSlidePosition();
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlidePosition();
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlidePosition();
});

// Weather API functionality
const weatherBtn = document.getElementById('getWeather');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

weatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`);
        const data = await response.json();

        if (response.ok) {
            weatherInfo.innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>Temperature: ${Math.round(data.main.temp)}°C</p>
                <p>Weather: ${data.weather[0].main}</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
        } else {
            weatherInfo.innerHTML = `<p class="error">${data.message}</p>`;
        }
    } catch (error) {
        weatherInfo.innerHTML = '<p class="error">Failed to fetch weather data</p>';
    }
});
loadQuestion();
updateSlidePosition();