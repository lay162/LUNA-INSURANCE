let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    const mainContent = document.querySelector('.main-content');
    const heroIntro = document.querySelector('.hero-intro');
    
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlideIndex) {
            slide.classList.add('active');
            
            if (mainContent) {
                mainContent.classList.remove('luna-bg-active', 'non-luna-bg-active');
                if (slide.classList.contains('luna-bg')) {
                    mainContent.classList.add('luna-bg-active');
                    if (heroIntro) {
                        heroIntro.classList.remove('non-luna-bg-active');
                        heroIntro.classList.add('luna-bg-active');
                    }
                } else if (slide.classList.contains('non-luna-bg')) {
                    mainContent.classList.add('non-luna-bg-active');
                    if (heroIntro) {
                        heroIntro.classList.remove('luna-bg-active');
                        heroIntro.classList.add('non-luna-bg-active');
                    }
                } else {
                    if (heroIntro) {
                        heroIntro.classList.remove('luna-bg-active', 'non-luna-bg-active');
                    }
                }
            }
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === currentSlideIndex) {
            dot.classList.add('active');
        }
    });
}


function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

function currentSlide(index) {
    showSlide(index - 1);
}

let autoPlayInterval;
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

showSlide(0);
startAutoPlay();

const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
}

document.addEventListener('DOMContentLoaded', function() {
    const faqSection = document.getElementById('faq');
    if (!faqSection) return;
    
    const faqDetails = faqSection.querySelectorAll('details.faq-card');
    
    // Ensure all FAQs start closed
    faqDetails.forEach(detail => {
        detail.open = false;
    });
    
    // Add toggle event listener to each FAQ
    faqDetails.forEach(detail => {
        detail.addEventListener('toggle', function() {
            if (this.open) {
                // Close all other FAQs when one is opened
                faqDetails.forEach(otherDetail => {
                    if (otherDetail !== this && otherDetail.open) {
                        otherDetail.open = false;
                    }
                });
            }
        });
    });
});

