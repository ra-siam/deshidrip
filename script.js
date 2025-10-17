// Interactive functionality for the website

// Show a message when the CTA button is clicked
function showMessage() {
    // Create a modal-like notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px 40px;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        z-index: 1000;
        text-align: center;
        font-size: 1.2rem;
        animation: popIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <h3 style="margin-bottom: 15px;">🎉 Great job!</h3>
        <p>You clicked the button! This website is working perfectly.</p>
        <button onclick="this.parentElement.remove()" style="
            background: rgba(255,255,255,0.2);
            border: 2px solid white;
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 15px;
            font-size: 1rem;
        ">Close</button>
    `;
    
    // Add the pop-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add some interactive effects to feature cards
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add a subtle parallax effect to the header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add typing effect to the title
    const title = document.querySelector('.title');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Add some fun console messages
console.log('🚀 Website loaded successfully!');
console.log('💡 Try clicking the "Click Me!" button for a surprise!');
console.log('🎨 This website was built with modern web technologies');