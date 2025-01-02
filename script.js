document.addEventListener('DOMContentLoaded', function () {
    // Theme Selector
    const themeSelect = document.getElementById('theme-select');
    const body = document.body;

    themeSelect.addEventListener('change', function () {
        if (themeSelect.value === 'dark') {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
        }
    });

    // Tab Navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    const tabContents = document.querySelectorAll('.tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links and tabs
            navLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Add active class to the clicked link and corresponding tab
            const target = this.getAttribute('href').substring(1);
            document.getElementById(target).classList.add('active');
            this.classList.add('active');
        });
    });

    // Set Featured as the default active tab
    document.querySelector('nav ul li a').click();

    // Load GitHub Repositories
    const reposList = document.querySelector('.repos-list');

    async function fetchRepos() {
        try {
            const response = await fetch('https://api.github.com/users/DeTrashed/repos');
            const repos = await response.json();

            reposList.innerHTML = repos.map(repo => `
                <div class="card">
                    <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                    <p>${repo.description || 'No description provided.'}</p>
                </div>
            `).join('');
        } catch (error) {
            reposList.innerHTML = '<p>Failed to load repositories. Please try again later.</p>';
        }
    }

    fetchRepos();
});