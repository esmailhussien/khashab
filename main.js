document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('waitlist-form');
    const successMessage = document.getElementById('success-message');
    const emailInput = document.getElementById('email');
    const submitBtn = form.querySelector('.btn-submit');
    const inputGroup = form.querySelector('.input-group');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate a network request for the waitlist subscription
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Subscribing...';
        submitBtn.disabled = true;
        emailInput.disabled = true;

        setTimeout(() => {
            // Hide the input fields and show the success message
            inputGroup.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Add a subtle entrance animation for the success message
            successMessage.animate([
                { opacity: 0, transform: 'translateY(10px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 500,
                easing: 'ease-out',
                fill: 'forwards'
            });
        }, 1500); // 1.5 seconds mock delay
    });
});
