document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('waitlist-form');
    const successMessage = document.getElementById('success-message');
    const emailInput = document.getElementById('email');
    const submitBtn = form.querySelector('.btn-submit');
    const inputGroup = form.querySelector('.input-group');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Subscribing...';
        submitBtn.disabled = true;
        emailInput.disabled = true;

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Add a clean email subject line
        data['_subject'] = "New Waitlist Subscriber - Khashab";

        fetch('https://formsubmit.co/ajax/sales@khashab.store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(res => {
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
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            emailInput.disabled = false;
            alert('Something went wrong. Please check your connection and try again.');
        });
    });
});
