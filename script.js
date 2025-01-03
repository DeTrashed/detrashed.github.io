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

    // Create Featured Cards
    const featuredRepos = [
        {
            name: "Test card",
            description: "Delete me pls :C",
            link: "https://github.com/DeTrashed",
            platforms: ["linux"]
        }
    ];

    const featuredCardsContainer = document.getElementById('featured-cards');

    function createFeaturedCards() {
        featuredRepos.forEach(repo => {
            const card = document.createElement('div');
            card.classList.add('card');

            const title = document.createElement('h3');
            const titleLink = document.createElement('a');
            titleLink.href = repo.link;
            titleLink.target = "_blank";
            titleLink.textContent = repo.name;
            title.appendChild(titleLink);

            const description = document.createElement('p');
            description.textContent = repo.description;

            const platform = document.createElement('div');
            platform.classList.add('platform');
            platform.innerHTML = `<span>OC:</span>`;

            repo.platforms.forEach(platformName => {
                const icon = document.createElement('i');
                icon.classList.add('fab');

                switch (platformName) {
                    case "windows":
                        icon.classList.add('fa-windows');
                        break;
                    case "linux":
                        icon.classList.add('fa-linux');
                        break;
                    case "apple":
                        icon.classList.add('fa-apple');
                        break;
                }

                platform.appendChild(icon);
            });

            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(platform);

            
            featuredCardsContainer.appendChild(card);
        });
    }

    createFeaturedCards();
});
