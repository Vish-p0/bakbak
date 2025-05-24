// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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
// The moment she said "I love you too"
const startDate = new Date('2024-05-25T02:52:00');

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
        const wasOpened = this.classList.contains('opened');
        this.classList.toggle('opened');
        
        // Trigger fireworks only when opening (not closing)
        if (!wasOpened && this.classList.contains('opened')) {
            createFireworks(this);
        }
    });
});

// Create fireworks animation
function createFireworks(giftBox) {
    // Get the entire gifts section instead of individual gift box
    const giftsSection = document.querySelector('.gifts-section');
    const sectionRect = giftsSection.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Create more fireworks spread across the entire section
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createSingleFirework(sectionRect, scrollTop, scrollLeft, i + 1);
        }, i * 100);
    }
}

function createSingleFirework(sectionRect, scrollTop, scrollLeft, fireworkType) {
    const firework = document.createElement('div');
    firework.className = `firework firework-${(fireworkType % 4) + 1}`;
    
    // Position fireworks randomly across the entire section
    const sectionLeft = sectionRect.left + scrollLeft;
    const sectionTop = sectionRect.top + scrollTop;
    const sectionWidth = sectionRect.width;
    const sectionHeight = sectionRect.height;
    
    // Random position within the section bounds with some margin
    const marginX = sectionWidth * 0.1; // 10% margin on each side
    const marginY = sectionHeight * 0.2; // 20% margin on top/bottom
    
    const randomX = sectionLeft + marginX + Math.random() * (sectionWidth - 2 * marginX);
    const randomY = sectionTop + marginY + Math.random() * (sectionHeight - 2 * marginY);
    
    firework.style.left = randomX + 'px';
    firework.style.top = randomY + 'px';
    
    document.body.appendChild(firework);
    
    // Remove firework after animation completes
    setTimeout(() => {
        if (firework.parentNode) {
            firework.remove();
        }
    }, 2000);
}

// Stitch Video Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const stitchPlayBtn = document.getElementById('stitchPlayBtn');
    const stitchVideoPopup = document.getElementById('stitchVideoPopup');
    const stitchCloseBtn = document.getElementById('stitchCloseBtn');
    const stitchVideo = document.getElementById('stitchVideo');
    
    if (stitchPlayBtn && stitchVideoPopup && stitchCloseBtn && stitchVideo) {
        // Open video popup
        stitchPlayBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent gift box from toggling
            openStitchVideo();
        });
        
        // Close video popup
        stitchCloseBtn.addEventListener('click', function() {
            closeStitchVideo();
        });
        
        // Close popup when clicking outside content
        stitchVideoPopup.addEventListener('click', function(e) {
            if (e.target === stitchVideoPopup) {
                closeStitchVideo();
            }
        });
        
        // Close popup with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && stitchVideoPopup.classList.contains('active')) {
                closeStitchVideo();
            }
        });
        
        function openStitchVideo() {
            stitchVideoPopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Reset video to beginning and pause
            stitchVideo.currentTime = 0;
            stitchVideo.load(); // Reload the video
        }
        
        function closeStitchVideo() {
            stitchVideoPopup.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
            
            // Pause and reset video
            stitchVideo.pause();
            stitchVideo.currentTime = 0;
        }
    }
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

// Background Music Controls
const backgroundMusic = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');

let isMuted = false;
let isBackgroundPlaying = false;
let previousVolume = 0.5;

// Initialize audio settings
if (backgroundMusic) {
    backgroundMusic.volume = 0.5; // Start at 50% volume
    
    // Set initial button state to pause (expecting music to play)
    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    
    // Try to auto-play immediately on page load
    backgroundMusic.play().then(() => {
        isBackgroundPlaying = true;
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        console.log('Background music started automatically');
    }).catch(e => {
        console.log('Auto-play blocked, waiting for user interaction');
        // Reset button to play state if auto-play failed
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        // If auto-play fails, start on first user interaction
        function startMusicOnInteraction() {
            // Only start background music if no song is currently playing and we haven't marked it as not playing
            const songAudio = document.getElementById('songAudio');
            const songIsPlaying = songAudio && !songAudio.paused;
            
            if (!isBackgroundPlaying && backgroundMusic.paused && !songIsPlaying) {
                backgroundMusic.play().then(() => {
                    isBackgroundPlaying = true;
                    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    console.log('Background music started on user interaction');
                }).catch(err => console.log('Background music play failed:', err));
            }
        }
        
        // Listen for various user interactions
        document.addEventListener('click', startMusicOnInteraction, { once: true });
        document.addEventListener('scroll', startMusicOnInteraction, { once: true });
        document.addEventListener('mousemove', startMusicOnInteraction, { once: true });
        document.addEventListener('touchstart', startMusicOnInteraction, { once: true });
        document.addEventListener('keydown', startMusicOnInteraction, { once: true });
    });
}

// Play/Pause functionality for background music
if (playPauseBtn) {
    playPauseBtn.addEventListener('click', function() {
        if (backgroundMusic) {
            if (backgroundMusic.paused) {
                backgroundMusic.play().then(() => {
                    isBackgroundPlaying = true;
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }).catch(e => console.log('Background music play failed:', e));
            } else {
                backgroundMusic.pause();
                isBackgroundPlaying = false;
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
    });
}

// Mute/Unmute functionality
if (muteBtn) {
    muteBtn.addEventListener('click', function() {
        if (backgroundMusic) {
            if (isMuted) {
                backgroundMusic.volume = previousVolume;
                volumeSlider.value = previousVolume * 100;
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                isMuted = false;
            } else {
                previousVolume = backgroundMusic.volume;
                backgroundMusic.volume = 0;
                volumeSlider.value = 0;
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                isMuted = true;
            }
        }
    });
}

// Volume slider functionality
if (volumeSlider) {
    volumeSlider.addEventListener('input', function() {
        if (backgroundMusic) {
            const volume = this.value / 100;
            backgroundMusic.volume = volume;
            
            // Update mute button icon based on volume
            if (volume === 0) {
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                isMuted = true;
            } else if (volume < 0.5) {
                muteBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
                isMuted = false;
                previousVolume = volume;
            } else {
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                isMuted = false;
                previousVolume = volume;
            }
        }
    });
}

// Play/pause on spacebar (optional)
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (backgroundMusic) {
            if (backgroundMusic.paused) {
                backgroundMusic.play().then(() => {
                    isBackgroundPlaying = true;
                    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }).catch(e => console.log('Background music play failed:', e));
            } else {
                backgroundMusic.pause();
                isBackgroundPlaying = false;
                if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
    }
});

// Floating Emojis for Timeline Section
function createFloatingEmojis() {
    const timelineSection = document.querySelector('.timeline-section');
    if (!timelineSection) return;
    
    const emojis = ['💕', '❤️', '✨', '🫶', '🐧', '🩷', '💞', '💖', '💝', '💘'];
    const patterns = ['pattern-1', 'pattern-2', 'pattern-3', 'pattern-4', 'pattern-5'];
    
    function createEmoji() {
        const emoji = document.createElement('div');
        emoji.classList.add('floating-emoji');
        
        // Assign random pattern
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        emoji.classList.add(randomPattern);
        
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random position within the timeline section
        const sectionRect = timelineSection.getBoundingClientRect();
        emoji.style.left = Math.random() * 90 + 5 + '%'; // 5% to 95%
        emoji.style.top = Math.random() * 80 + 10 + '%'; // 10% to 90%
        
        // Random size variation
        const size = Math.random() * 1 + 1.5; // 1.5rem to 2.5rem
        emoji.style.fontSize = size + 'rem';
        
        // Random animation delay
        emoji.style.animationDelay = Math.random() * 10 + 's';
        
        timelineSection.appendChild(emoji);
    }
    
    // Create emojis distributed throughout the section
    function populateEmojis() {
        // Clear existing emojis
        const existingEmojis = timelineSection.querySelectorAll('.floating-emoji');
        existingEmojis.forEach(emoji => emoji.remove());
        
        // Create 20 emojis for the timeline section
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createEmoji(), i * 200);
        }
    }
    
    // Initial population
    populateEmojis();
    
    // Add new emojis periodically to maintain density
    setInterval(() => {
        if (timelineSection.querySelectorAll('.floating-emoji').length < 15) {
            createEmoji();
        }
    }, 3000);
}

// Start floating emojis when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(createFloatingEmojis, 1000); // Start after 1 second
});

// Recreate emojis when window is resized
window.addEventListener('resize', function() {
    setTimeout(createFloatingEmojis, 500);
});

// Carousel Functionality
let currentSlide = 0;
const totalSlides = 15;

function initializeCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carouselTrack) return;
    
    function updateCarousel() {
        // Move the track
        const translateX = -(currentSlide * (100 / totalSlides));
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Update slide classes
        const slides = document.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Auto-play (optional)
    let autoPlay = setInterval(nextSlide, 5000);
    
    // Pause auto-play on hover
    const carouselSection = document.querySelector('.months-carousel-section');
    if (carouselSection) {
        carouselSection.addEventListener('mouseenter', () => {
            clearInterval(autoPlay);
        });
        
        carouselSection.addEventListener('mouseleave', () => {
            autoPlay = setInterval(nextSlide, 5000);
        });
    }
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carouselTrack.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide(); // Swipe left = next
            } else {
                prevSlide(); // Swipe right = previous
            }
        }
    });
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCarousel);

// Song Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const songAudio = document.getElementById('songAudio');
    const songPlayBtn = document.getElementById('songPlayBtn');
    const heartBtn = document.getElementById('heartBtn');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const currentTimeDisplay = document.getElementById('currentTime');
    const totalTimeDisplay = document.getElementById('totalTime');
    const songVolumeSlider = document.getElementById('songVolumeSlider');
    
    // Initialize lyrics display
    function initializeLyrics() {
        const section1 = document.getElementById('lyricsSection1');
        const section2 = document.getElementById('lyricsSection2');
        const section3 = document.getElementById('lyricsSection3');
        
        // Ensure only section 1 is active initially
        [section1, section2, section3].forEach(section => {
            section.classList.remove('active');
        });
        
        section1.classList.add('active');
    }
    
    // Initialize lyrics on page load
    initializeLyrics();
    
    if (songAudio && songPlayBtn) {
        // Set initial volume
        songAudio.volume = 0.7;
        
        // Add user interaction for audio loading
        songAudio.load();
        
        // Track current lyrics section to avoid unnecessary updates
        let currentLyricsSection = 1;
        
        // Play/Pause functionality with background music coordination
        songPlayBtn.addEventListener('click', function() {
            if (songAudio.paused) {
                // Prevent background music from starting when song is played
                isBackgroundPlaying = false;
                
                // Pause background music if it's playing
                if (backgroundMusic && !backgroundMusic.paused) {
                    backgroundMusic.pause();
                    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
                
                // Play the song
                songAudio.play().then(() => {
                    songPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }).catch(e => {
                    console.log('Song play failed:', e);
                    // Try to load and play again
                    songAudio.load();
                    setTimeout(() => {
                        songAudio.play().then(() => {
                            songPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
                        }).catch(err => console.log('Song play failed again:', err));
                    }, 500);
                });
            } else {
                songAudio.pause();
                songPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        // Heart button toggle
        if (heartBtn) {
            heartBtn.addEventListener('click', function() {
                const heartIcon = heartBtn.querySelector('i');
                if (heartIcon.classList.contains('far')) {
                    heartIcon.classList.remove('far');
                    heartIcon.classList.add('fas');
                    heartBtn.classList.add('active');
                } else {
                    heartIcon.classList.remove('fas');
                    heartIcon.classList.add('far');
                    heartBtn.classList.remove('active');
                }
            });
        }
        
        // Update progress bar and time
        songAudio.addEventListener('timeupdate', function() {
            if (songAudio.duration) {
                const progress = (songAudio.currentTime / songAudio.duration) * 100;
                progressFill.style.width = progress + '%';
                
                // Update time displays
                currentTimeDisplay.textContent = formatTime(songAudio.currentTime);
                totalTimeDisplay.textContent = formatTime(songAudio.duration);
                
                // Update lyrics based on time
                updateLyricsSection(songAudio.currentTime);
            }
        });
        
        // Function to update lyrics sections based on current time
        function updateLyricsSection(currentTime) {
            const section1 = document.getElementById('lyricsSection1');
            const section2 = document.getElementById('lyricsSection2');
            const section3 = document.getElementById('lyricsSection3');
            
            // Only process if song is playing
            if (!songAudio.paused) {
                let targetSection;
                
                // Determine which section should be active based on time
                if (currentTime >= 0 && currentTime < 62) {
                    targetSection = 1;
                } else if (currentTime >= 62 && currentTime < 94.8) {
                    targetSection = 2;
                } else if (currentTime >= 94.8 && currentTime < 196) {
                    targetSection = 3;
                } else {
                    targetSection = 1;
                }
                
                // Only update if section has changed
                if (targetSection !== currentLyricsSection) {
                    currentLyricsSection = targetSection;
                    
                    // Remove active and animating classes from all sections
                    const allSections = [section1, section2, section3];
                    allSections.forEach(section => {
                        section.classList.remove('active', 'animating');
                    });
                    
                    // Small delay to ensure reset is applied
                    setTimeout(() => {
                        let activeSection;
                        
                        // Set the active section based on target
                        if (targetSection === 1) {
                            activeSection = section1;
                        } else if (targetSection === 2) {
                            activeSection = section2;
                        } else {
                            activeSection = section3;
                        }
                        
                        // Add active and animating classes for staggered animation
                        activeSection.classList.add('active', 'animating');
                    }, 50);
                }
            }
        }
        
        // Reset to first section when song stops
        songAudio.addEventListener('pause', function() {
            currentLyricsSection = 1;
            setTimeout(() => {
                initializeLyrics();
            }, 100);
        });
        
        // Progress bar click to seek
        if (progressBar) {
            progressBar.addEventListener('click', function(e) {
                const rect = progressBar.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                if (songAudio.duration) {
                    songAudio.currentTime = percent * songAudio.duration;
                }
            });
        }
        
        // Volume control
        if (songVolumeSlider) {
            songVolumeSlider.addEventListener('input', function() {
                songAudio.volume = this.value / 100;
            });
        }
        
        // Reset play button when song ends and resume background music
        songAudio.addEventListener('ended', function() {
            songPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
            progressFill.style.width = '0%';
            songAudio.currentTime = 0;
            currentLyricsSection = 1;
            
            // Reset to first lyrics section
            initializeLyrics();
            
            // Resume background music when song ends
            if (backgroundMusic && backgroundMusic.paused) {
                backgroundMusic.play().then(() => {
                    isBackgroundPlaying = true;
                    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }).catch(e => console.log('Background music resume failed:', e));
            }
        });
        
        // Set total time when metadata loads
        songAudio.addEventListener('loadedmetadata', function() {
            totalTimeDisplay.textContent = formatTime(songAudio.duration);
        });
        
        // Handle audio loading errors
        songAudio.addEventListener('error', function(e) {
            console.log('Song audio error:', e);
            console.log('Audio source:', songAudio.src);
        });
        
        // Log when audio is ready to play
        songAudio.addEventListener('canplaythrough', function() {
            console.log('Song audio loaded successfully');
        });
    }
    
    // Format time helper function
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
    }
});

// Floating Hearts for Song Section
function createSongFloatingHearts() {
    const songSection = document.querySelector('.song-section');
    if (!songSection) return;
    
    const hearts = ['💕', '❤️', '💖', '💝', '💘', '🩷'];
    const patterns = ['heart-pattern-1', 'heart-pattern-2', 'heart-pattern-3'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('song-floating-heart');
        
        // Assign random pattern
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        heart.classList.add(randomPattern);
        
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Random position within the song section
        heart.style.left = Math.random() * 90 + 5 + '%'; // 5% to 95%
        heart.style.top = Math.random() * 80 + 10 + '%'; // 10% to 90%
        
        // Random size variation
        const size = Math.random() * 0.8 + 1.2; // 1.2rem to 2rem
        heart.style.fontSize = size + 'rem';
        
        // Random animation delay
        heart.style.animationDelay = Math.random() * 8 + 's';
        
        songSection.appendChild(heart);
    }
    
    // Create hearts distributed throughout the section
    function populateHearts() {
        // Clear existing hearts
        const existingHearts = songSection.querySelectorAll('.song-floating-heart');
        existingHearts.forEach(heart => heart.remove());
        
        // Create 15 hearts for the song section
        for (let i = 0; i < 15; i++) {
            setTimeout(() => createHeart(), i * 300);
        }
    }
    
    // Initial population
    populateHearts();
    
    // Add new hearts periodically to maintain density
    setInterval(() => {
        if (songSection.querySelectorAll('.song-floating-heart').length < 12) {
            createHeart();
        }
    }, 4000);
}

// Start floating hearts when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(createSongFloatingHearts, 1500); // Start after 1.5 seconds
});

// Flower Surprise Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const flowerSurpriseBtn = document.getElementById('flowerSurpriseBtn');
    const flowerPopup = document.getElementById('flowerPopup');
    
    if (flowerSurpriseBtn && flowerPopup) {
        // Open flower popup
        flowerSurpriseBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent gift box from toggling
            openFlowerPopup();
        });
        
        // Close popup when clicking outside content (optional)
        flowerPopup.addEventListener('click', function(e) {
            if (e.target === flowerPopup) {
                closeFlowerPopup();
            }
        });
        
        // Close popup with Escape key (optional)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && flowerPopup.classList.contains('active')) {
                closeFlowerPopup();
            }
        });
        
        function openFlowerPopup() {
            flowerPopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Start floating flowers animation
            createFloatingFlowers();
            
            // Auto-close after 5 seconds
            setTimeout(() => {
                closeFlowerPopup();
            }, 5000);
        }
        
        function closeFlowerPopup() {
            flowerPopup.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
            
            // Remove all floating flowers
            const flowers = document.querySelectorAll('.floating-flower');
            flowers.forEach(flower => flower.remove());
        }
    }
});

// Create floating flowers animation
function createFloatingFlowers() {
    const flowerEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '💐', '🏵️', '🌿', '🍀', '🌱', '🌾', '🪻', '🌵', '🪴'];
    const patterns = ['flower-pattern-1', 'flower-pattern-2', 'flower-pattern-3', 'flower-pattern-4', 'flower-pattern-5'];
    
    // Create 40 flowers for full screen coverage
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            createSingleFlower(flowerEmojis, patterns);
        }, i * 100);
    }
    
    // Continue creating flowers while popup is open
    const flowerInterval = setInterval(() => {
        const flowerPopup = document.getElementById('flowerPopup');
        if (flowerPopup && flowerPopup.classList.contains('active')) {
            // Only add new flowers if there are less than 50 on screen
            const currentFlowers = document.querySelectorAll('.floating-flower');
            if (currentFlowers.length < 50) {
                createSingleFlower(flowerEmojis, patterns);
            }
        } else {
            clearInterval(flowerInterval);
        }
    }, 300);
}

function createSingleFlower(flowerEmojis, patterns) {
    const flower = document.createElement('div');
    flower.classList.add('floating-flower');
    
    // Assign random pattern
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    flower.classList.add(randomPattern);
    
    // Assign random flower emoji
    flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    
    // Random position across the popup screen area
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Position flowers randomly across the popup area
    flower.style.left = Math.random() * viewportWidth + 'px';
    flower.style.top = Math.random() * viewportHeight + 'px';
    
    // Random size variation
    const size = Math.random() * 1.5 + 1.5; // 1.5rem to 3rem
    flower.style.fontSize = size + 'rem';
    
    // Random animation delay
    flower.style.animationDelay = Math.random() * 2 + 's';
    
    // Random animation duration
    flower.style.animationDuration = (Math.random() * 3 + 3) + 's'; // 3-6 seconds
    
    // Random opacity
    flower.style.opacity = Math.random() * 0.4 + 0.6; // 0.6 to 1.0
    
    // Append to the popup instead of document body
    const flowerPopup = document.getElementById('flowerPopup');
    if (flowerPopup) {
        flowerPopup.appendChild(flower);
    }
    
    // Remove flower after 5 seconds (when popup closes)
    setTimeout(() => {
        if (flower.parentNode) {
            flower.remove();
        }
    }, 5500);
} 