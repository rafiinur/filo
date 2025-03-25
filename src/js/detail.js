// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Fade in content on page load
    fadeInContent();
    
    // Initialize rating counter animation
    initRatingCounter();
    
    // Initialize trailer hover effects
    initTrailerEffects();
    
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize toggle sections
    initToggleSections();
    
    // Initialize genre tags hover animation
    initGenreTags();
    
    // Initialize review card interactions
    initReviewCard();
    
    // Initialize watchlist button animation
    initWatchlistButton();
});

// Fade in content when page loads
function fadeInContent() {
    const mainContent = document.querySelector('main');
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        mainContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
    }, 200);
}

// Animated counter for IMDb rating
function initRatingCounter() {
    const ratingValue = document.querySelector('.rating-value');
    const targetRating = parseFloat(ratingValue.textContent);
    let currentRating = 0;
    
    // Reset the displayed value to start animation from 0
    ratingValue.textContent = '0.0';
    
    const interval = setInterval(() => {
        currentRating += 0.1;
        if (currentRating >= targetRating) {
            currentRating = targetRating;
            clearInterval(interval);
        }
        ratingValue.textContent = currentRating.toFixed(1);
    }, 30);
}

// Trailer hover and play button animation
function initTrailerEffects() {
    const trailer = document.querySelector('.trailer');
    const playButton = document.querySelector('.play-button');
    
    if (trailer && playButton) {
        // Add pulse animation to play button
        playButton.classList.add('pulse-animation');
        
        // Add hover effect for trailer
        trailer.addEventListener('mouseenter', () => {
            playButton.classList.add('play-button-expanded');
            const trailerImg = trailer.querySelector('img');
            if (trailerImg) {
                trailerImg.style.transform = 'scale(1.05)';
                trailerImg.style.transition = 'transform 0.5s ease';
            }
        });
        
        trailer.addEventListener('mouseleave', () => {
            playButton.classList.remove('play-button-expanded');
            const trailerImg = trailer.querySelector('img');
            if (trailerImg) {
                trailerImg.style.transform = 'scale(1)';
            }
        });
        
        // Add click animation
        playButton.addEventListener('click', () => {
            playButton.classList.add('play-button-clicked');
            setTimeout(() => {
                playButton.classList.remove('play-button-clicked');
                
                // Simulate trailer play - you'd replace this with actual video playback
                alert('Playing trailer: Attack on Titan');
            }, 300);
        });
    }
}

// Scroll reveal animations for sections
function initScrollReveal() {
    const sections = document.querySelectorAll('.imdb-section');
    
    // Create IntersectionObserver to detect when elements enter viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-revealed');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, { threshold: 0.2 });
    
    // Start observing each section
    sections.forEach(section => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });
}

// Toggle sections (expand/collapse)
function initToggleSections() {
    const storylineText = document.querySelector('.storyline-text');
    const reviewText = document.querySelectorAll('.review-text');
    
    if (storylineText) {
        // Create "Read more" button
        const readMoreBtn = document.createElement('button');
        readMoreBtn.classList.add('read-more-btn');
        readMoreBtn.textContent = 'Read more';
        
        // Insert button after storyline text
        storylineText.parentNode.insertBefore(readMoreBtn, storylineText.nextSibling);
        
        // Add toggle functionality
        let expanded = false;
        
        readMoreBtn.addEventListener('click', () => {
            if (!expanded) {
                storylineText.style.maxHeight = '1000px';
                readMoreBtn.textContent = 'Read less';
            } else {
                storylineText.style.maxHeight = '80px';
                readMoreBtn.textContent = 'Read more';
            }
            expanded = !expanded;
        });
        
        // Initialize collapsed state
        storylineText.style.maxHeight = '80px';
        storylineText.style.overflow = 'hidden';
        storylineText.style.transition = 'max-height 0.5s ease';
    }
    
    // Add similar toggle for review text if needed
    if (reviewText.length > 1) {
        const secondParagraph = reviewText[1];
        secondParagraph.style.display = 'none';
        
        const toggleReview = document.createElement('button');
        toggleReview.classList.add('toggle-review-btn');
        toggleReview.textContent = 'Show more';
        
        secondParagraph.parentNode.insertBefore(toggleReview, secondParagraph.nextSibling);
        
        let reviewExpanded = false;
        toggleReview.addEventListener('click', () => {
            if (!reviewExpanded) {
                secondParagraph.style.display = 'block';
                toggleReview.textContent = 'Show less';
            } else {
                secondParagraph.style.display = 'none';
                toggleReview.textContent = 'Show more';
            }
            reviewExpanded = !reviewExpanded;
        });
    }
}

// Genre tags hover animation
function initGenreTags() {
    const genreTags = document.querySelectorAll('.genre-tag, .tag');
    
    genreTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.classList.add('genre-tag-hover');
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.classList.remove('genre-tag-hover');
        });
    });
}

// Review card interactions
function initReviewCard() {
    const helpfulBtn = document.querySelector('.helpful');
    const notHelpfulBtn = document.querySelector('.not-helpful');
    
    if (helpfulBtn) {
        helpfulBtn.addEventListener('click', () => {
            helpfulBtn.classList.toggle('helpful-active');
            
            // Update count when clicked
            const countElement = helpfulBtn.querySelector('.count');
            if (countElement) {
                let count = parseInt(countElement.textContent.replace(/[^\d]/g, ''));
                
                if (helpfulBtn.classList.contains('helpful-active')) {
                    count += 1;
                    animateNumber(countElement, count);
                } else {
                    count -= 1;
                    animateNumber(countElement, count);
                }
            }
            
            // If helpful is clicked, deactivate not helpful
            if (helpfulBtn.classList.contains('helpful-active') && 
                notHelpfulBtn && notHelpfulBtn.classList.contains('not-helpful-active')) {
                notHelpfulBtn.classList.remove('not-helpful-active');
                const notHelpfulCount = notHelpfulBtn.querySelector('.count');
                if (notHelpfulCount) {
                    let count = parseInt(notHelpfulCount.textContent);
                    animateNumber(notHelpfulCount, count - 1);
                }
            }
        });
    }
    
    if (notHelpfulBtn) {
        notHelpfulBtn.addEventListener('click', () => {
            notHelpfulBtn.classList.toggle('not-helpful-active');
            
            // Update count when clicked
            const countElement = notHelpfulBtn.querySelector('.count');
            if (countElement) {
                let count = parseInt(countElement.textContent);
                
                if (notHelpfulBtn.classList.contains('not-helpful-active')) {
                    count += 1;
                    animateNumber(countElement, count);
                } else {
                    count -= 1;
                    animateNumber(countElement, count);
                }
            }
            
            // If not helpful is clicked, deactivate helpful
            if (notHelpfulBtn.classList.contains('not-helpful-active') && 
                helpfulBtn && helpfulBtn.classList.contains('helpful-active')) {
                helpfulBtn.classList.remove('helpful-active');
                const helpfulCount = helpfulBtn.querySelector('.count');
                if (helpfulCount) {
                    let count = parseInt(helpfulCount.textContent.replace(/[^\d]/g, ''));
                    animateNumber(helpfulCount, count - 1);
                }
            }
        });
    }
}

// Animate number counting up/down
function animateNumber(element, targetNumber) {
    const startText = element.textContent;
    const startNumber = parseInt(startText.replace(/[^\d]/g, ''));
    const duration = 500; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = (targetNumber - startNumber) / steps;
    
    let currentNumber = startNumber;
    const interval = setInterval(() => {
        currentNumber += increment;
        
        if ((increment > 0 && currentNumber >= targetNumber) || 
            (increment < 0 && currentNumber <= targetNumber)) {
            clearInterval(interval);
            currentNumber = targetNumber;
        }
        
        // Format number appropriately
        if (targetNumber >= 1000) {
            element.textContent = (Math.round(currentNumber) / 1000).toFixed(1) + 'K';
        } else {
            element.textContent = Math.round(currentNumber);
        }
    }, stepTime);
}

// Add a watchlist button animation
function initWatchlistButton() {
    const watchlistButton = document.querySelector('.watchlist-button');
    
    if (watchlistButton) {
        watchlistButton.addEventListener('click', function() {
            this.classList.add('watchlist-button-clicked');
            const icon = this.querySelector('.watchlist-icon');
            
            // Change + to ✓
            if (icon.textContent === '+') {
                icon.textContent = '✓';
                this.style.backgroundColor = '#46d369';
                
                // Add success message
                const message = document.createElement('div');
                message.classList.add('watchlist-message');
                message.textContent = 'Added to watchlist!';
                document.body.appendChild(message);
                
                // Animate message
                setTimeout(() => {
                    message.style.opacity = '1';
                    message.style.transform = 'translateY(0)';
                }, 10);
                
                // Remove message after delay
                setTimeout(() => {
                    message.style.opacity = '0';
                    message.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        document.body.removeChild(message);
                    }, 300);
                }, 2000);
            } else {
                icon.textContent = '+';
                this.style.backgroundColor = '#f5c518';
                
                // Add removed message
                const message = document.createElement('div');
                message.classList.add('watchlist-message');
                message.style.backgroundColor = '#e50914';
                message.textContent = 'Removed from watchlist';
                document.body.appendChild(message);
                
                // Animate message
                setTimeout(() => {
                    message.style.opacity = '1';
                    message.style.transform = 'translateY(0)';
                }, 10);
                
                // Remove message after delay
                setTimeout(() => {
                    message.style.opacity = '0';
                    message.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        document.body.removeChild(message);
                    }, 300);
                }, 2000);
            }
            
            setTimeout(() => {
                this.classList.remove('watchlist-button-clicked');
            }, 300);
        });
    }
}

// Add mouse trail effect for a fun extra touch
function initMouseTrail() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvas.style.opacity = '0.7';
    
    document.body.appendChild(canvas);
    
    const points = [];
    const maxPoints = 50;
    
    document.addEventListener('mousemove', (e) => {
        points.push({
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 3 + 1,
            color: '#f5c518',
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1
        });
        
        if (points.length > maxPoints) {
            points.shift();
        }
    });
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
            ctx.fillStyle = point.color;
            ctx.fill();
            
            point.x += point.speedX;
            point.y += point.speedY;
            point.size -= 0.05;
            
            if (point.size <= 0) {
                points.splice(i, 1);
                i--;
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Extra: Dynamic title change when user switches tabs
function initDynamicTitle() {
    let originalTitle = document.title;
    let isBlurred = false;
    
    window.addEventListener('blur', () => {
        isBlurred = true;
        document.title = "Come back to Attack on Titan! 🔥";
    });
    
    window.addEventListener('focus', () => {
        isBlurred = false;
        document.title = originalTitle;
    });
}