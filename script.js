// Configuration - Укажите ваш n8n webhook URL
const WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL'; // Замените на реальный URL после настройки n8n

// Form handling
const form = document.getElementById('danceSurvey');
const successMessage = document.getElementById('successMessage');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.querySelector('span').textContent = 'Отправка...';
        
        // Collect form data
        const data = {
            name: form.querySelector('#name').value,
            surname: form.querySelector('#surname').value,
            email: form.querySelector('#email').value,
            interested: Array.from(form.querySelectorAll('input[name="interested"]:checked')).map(cb => cb.value),
            other_direction: form.querySelector('#other-direction').value,
            price: form.querySelector('#price').value,
            duration: form.querySelector('#durationInput').value,
            frequency: form.querySelector('#frequencyInput').value,
            schedule: form.querySelector('#scheduleInput').value,
            experience: form.querySelector('#experienceInput').value,
            timestamp: new Date().toISOString()
        };
        
        console.log('Sending data:', data);
        
        try {
            // Send to n8n webhook
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                // Show success message
                successMessage.classList.add('active');
                form.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('active');
                }, 5000);
            } else {
                throw new Error('Ошибка отправки');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке. Попробуйте позже или свяжитесь с организаторами.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.querySelector('span').textContent = 'ОТПРАВИТЬ';
        }
    });
}

// Video playback on click
document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const playBtn = wrapper.querySelector('.video-play-btn');
    
    if (video && playBtn) {
        // Play on button click
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleVideo(video, wrapper);
        });
        
        // Play on wrapper click
        wrapper.addEventListener('click', () => {
            toggleVideo(video, wrapper);
        });
        
        // Auto-play on hover (desktop)
        if (window.matchMedia('(hover: hover)').matches) {
            wrapper.addEventListener('mouseenter', () => {
                if (!video.matches(':hover')) {
                    video.play().catch(() => {});
                }
            });
            
            wrapper.addEventListener('mouseleave', () => {
                video.pause();
            });
        }
    }
});

function toggleVideo(video, wrapper) {
    if (video.paused) {
        video.play();
        wrapper.querySelector('.video-play-btn')?.style.setProperty('opacity', '0');
    } else {
        video.pause();
        wrapper.querySelector('.video-play-btn')?.style.setProperty('opacity', '1');
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            emailInput.style.borderColor = 'var(--color-red)';
        } else {
            emailInput.style.borderColor = '';
        }
    });
}

// Close success message
function closeSuccess() {
    successMessage.classList.remove('active');
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards
document.querySelectorAll('.direction-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Preload videos
window.addEventListener('load', () => {
    document.querySelectorAll('video').forEach(video => {
        video.load();
    });
});

// Force preload videos on DOM load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card-video').forEach(video => {
        if (video.preload !== 'auto') {
            video.preload = 'auto';
            video.load();
        }
    });
});
