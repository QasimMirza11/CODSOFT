document.addEventListener('DOMContentLoaded', () => {
    const userType = getUserType(); // Function to determine user type from session or backend
    const dashboardContent = document.getElementById('dashboard-content');

    if (userType === 'employer') {
        loadEmployerDashboard();
    } else if (userType === 'candidate') {
        loadCandidateDashboard();
    }

    function getUserType() {
        // This function should fetch the user type from the session or a backend API
        // For demonstration, returning a hardcoded value
        return 'employer'; // or 'candidate'
    }

    function loadEmployerDashboard() {
        dashboardContent.innerHTML = `
            <h2>Employer Dashboard</h2>
            <a href="post_job.html" class="btn">Post a Job</a>
            <h3>Your Posted Jobs</h3>
            <div id="posted-jobs">
                <!-- Jobs posted by the employer will be dynamically loaded here -->
            </div>
        `;
        loadPostedJobs();
    }

    function loadCandidateDashboard() {
        dashboardContent.innerHTML = `
            <h2>Candidate Dashboard</h2>
            <h3>Available Jobs</h3>
            <div id="available-jobs">
                <!-- Available jobs will be dynamically loaded here -->
            </div>
        `;
        loadAvailableJobs();
    }

    function loadPostedJobs() {
        // Fetch and display jobs posted by the employer
        fetch('get_posted_jobs.php')
            .then(response => response.json())
            .then(data => {
                const postedJobs = document.getElementById('posted-jobs');
                postedJobs.innerHTML = '';
                data.forEach(job => {
                    postedJobs.innerHTML += `
                        <div class="job">
                            <h4>${job.job_title}</h4>
                            <p>${job.job_description}</p>
                            <p><strong>Location:</strong> ${job.location}</p>
                            <p><strong>Salary:</strong> ${job.salary}</p>
                        </div>
                    `;
                });
            });
    }

    function loadAvailableJobs() {
        // Fetch and display available jobs for candidates
        fetch('get_available_jobs.php')
            .then(response => response.json())
            .then(data => {
                const availableJobs = document.getElementById('available-jobs');
                availableJobs.innerHTML = '';
                data.forEach(job => {
                    availableJobs.innerHTML += `
                        <div class="job">
                            <h4>${job.job_title}</h4>
                            <p>${job.job_description}</p>
                            <p><strong>Location:</strong> ${job.location}</p>
                            <p><strong>Salary:</strong> ${job.salary}</p>
                            <button class="btn apply-btn" data-job-id="${job.id}">Apply</button>
                        </div>
                    `;
                });
                document.querySelectorAll('.apply-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        applyForJob(e.target.dataset.jobId);
                    });
                });
            });
    }

    function applyForJob(jobId) {
        // Function to handle job application
        fetch('apply_job.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ job_id: jobId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Applied for the job successfully');
            } else {
                alert('Failed to apply for the job');
            }
        });
    }
});
