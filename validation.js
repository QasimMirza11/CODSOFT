document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const postJobForm = document.getElementById('post-job-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const email = document.getElementById('email').value.trim();
            const userType = document.getElementById('user_type').value;

            if (username === '' || password === '' || email === '' || userType === '') {
                alert('Please fill in all fields');
                e.preventDefault();
            } else if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                e.preventDefault();
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (username === '' || password === '') {
                alert('Please fill in all fields');
                e.preventDefault();
            }
        });
    }

    if (postJobForm) {
        postJobForm.addEventListener('submit', (e) => {
            const jobTitle = document.getElementById('job_title').value.trim();
            const jobDescription = document.getElementById('job_description').value.trim();
            const location = document.getElementById('location').value.trim();
            const salary = document.getElementById('salary').value.trim();

            if (jobTitle === '' || jobDescription === '' || location === '' || salary === '') {
                alert('Please fill in all fields');
                e.preventDefault();
            } else if (isNaN(salary) || salary <= 0) {
                alert('Please enter a valid salary');
                e.preventDefault();
            }
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
