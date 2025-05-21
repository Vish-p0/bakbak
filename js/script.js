// Initialize ScrollReveal for animations
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '30px',
    duration: 1000,
    delay: 200,
    easing: 'ease-in-out',
    reset: false
});

// Main sections reveal animations
sr.reveal('.timeline-section h2', {});
sr.reveal('.timeline-item', { interval: 200 });
sr.reveal('.gallery-section h2', {});
sr.reveal('.polaroid', { interval: 150 });
sr.reveal('.letters-section h2', {});
sr.reveal('.letter', { interval: 200 });
sr.reveal('.quiz-section h2', {});
sr.reveal('.quiz-question', { interval: 200 });
sr.reveal('.compliments-section h2', {});
sr.reveal('.compliment-container', {});
sr.reveal('.countdown-section h2', {});
sr.reveal('.countdown-item', { interval: 150 });
sr.reveal('.gifts-section h2', {});
sr.reveal('.gift-box', { interval: 200 });

// Start date of relationship (YYYY-MM-DD format)
// Change this to your actual anniversary date
const startDate = new Date('2023-06-15T00:00:00');

// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const diff = Math.abs(now - startDate);
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Update the countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Quiz functionality
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        const question = this.closest('.quiz-question');
        const allOptions = question.querySelectorAll('.option');
        
        // Reset all options
        allOptions.forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Select the clicked option
        this.classList.add('selected');
        
        // Show feedback
        const isCorrect = this.getAttribute('data-correct') === 'true';
        question.querySelector('.feedback.correct').style.display = isCorrect ? 'block' : 'none';
        question.querySelector('.feedback.incorrect').style.display = isCorrect ? 'none' : 'block';
    });
});

// Restart Quiz Button
document.getElementById('restart-quiz')?.addEventListener('click', function() {
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelectorAll('.feedback').forEach(feedback => {
        feedback.style.display = 'none';
    });
});

// Compliment Generator
const compliments = [
    "Your smile lights up my entire day.",
    "The way you laugh is my favorite sound in the world.",
    "You make even rainy days beautiful.",
    "Your kindness towards others inspires me every day.",
    "I love how passionate you are about the things you care about.",
    "You're my sunshine in every storm.",
    "You laugh at my worst jokes (and that's love).",
    "The way you see the world is so beautiful and unique.",
    "Your strength during difficult times amazes me.",
    "I love how you always know what to say to make me feel better.",
    "Your hugs make everything better.",
    "You make ordinary moments extraordinary.",
    "The way you care for others shows what a beautiful heart you have.",
    "I love watching you get excited about little things.",
    "Your creativity inspires me daily.",
    "I love how we can be completely ourselves together.",
    "You help me become a better person every day.",
    "Your eyes are like stars that guide me home.",
    "Being with you is the easiest thing I've ever done.",
    "Your support means everything to me."
];

document.getElementById('compliment-button')?.addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    const complimentText = compliments[randomIndex];
    const complimentElement = document.getElementById('compliment-text');
    
    // Fade out effect
    complimentElement.style.opacity = 0;
    
    // Change text and fade in
    setTimeout(() => {
        complimentElement.textContent = complimentText;
        complimentElement.style.opacity = 1;
    }, 300);
    
    // Create heart animation
    createHeart();
});

// Heart animation on compliment click
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
    
    document.querySelector('.compliment-container').appendChild(heart);
    
    // Remove heart after animation ends
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Gift Box Opening
document.querySelectorAll('.gift-box').forEach(box => {
    box.addEventListener('click', function() {
        this.classList.toggle('opened');
    });
});

// Polaroid Gallery - Image click for lightbox effect
document.querySelectorAll('.polaroid').forEach(polaroid => {
    polaroid.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const caption = this.querySelector('.caption').textContent;
        
        openLightbox(imgSrc, caption);
    });
});

// Lightbox for gallery
function openLightbox(imgSrc, caption) {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    
    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('lightbox-content');
    
    const img = document.createElement('img');
    img.src = imgSrc;
    
    const captionText = document.createElement('p');
    captionText.textContent = caption;
    
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('lightbox-close');
    closeBtn.innerHTML = '&times;';
    
    // Assemble and append to body
    lightboxContent.appendChild(img);
    lightboxContent.appendChild(captionText);
    lightboxContent.appendChild(closeBtn);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    // Prevent scrolling while lightbox is open
    document.body.style.overflow = 'hidden';
    
    // Close button functionality
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.remove();
        document.body.style.overflow = 'auto';
    }
}

// Add CSS for heart animation and lightbox
const style = document.createElement('style');
style.textContent = `
    .heart {
        position: absolute;
        font-size: 24px;
        pointer-events: none;
        animation: float 4s ease-in-out;
        z-index: 100;
    }
    
    @keyframes float {
        0% {
            opacity: 0;
            transform: translateY(0) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translateY(-40px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-80px) scale(0.5);
        }
    }
    
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        border: 10px solid white;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    }
    
    .lightbox-content p {
        background-color: white;
        padding: 10px;
        text-align: center;
        font-family: 'Dancing Script', cursive;
        font-size: 1.2rem;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: -40px;
        font-size: 30px;
        color: white;
        cursor: pointer;
    }
`;

document.head.appendChild(style);

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
}); 