async function fetchAgents() {
    try {
        const response = await fetch('https://valorant-api.com/v1/agents');
        const data = await response.json();
        const playableAgents = data.data.filter(agent => agent.isPlayableCharacter);
        displayAgents(playableAgents);
    } catch (error) {
        console.error('Error fetching agents:', error);
    }
}

// Sorting functionality
function setupSorting() {
    const buttons = document.querySelectorAll('.sorting-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const role = button.getAttribute('data-role').toLowerCase();
            const agents = document.querySelectorAll('.agent');

            agents.forEach(agent => {
                const agentRole = agent.querySelector('.role').textContent.toLowerCase();
                agent.style.display = (role === 'all' || agentRole === role) ? 'block' : 'none';
            });
        });
    });
}

// Function to get the gradient border for an agent
function getAgentGradientBorder(agent) {
    if (agent.backgroundGradientColors && agent.backgroundGradientColors.length > 1) {
        const gradientColors = agent.backgroundGradientColors.map(color => `#${color}`).join(', ');
        return `linear-gradient(135deg, ${gradientColors})`; 
    }
    return 'linear-gradient(135deg, #ffffff, #dddddd)'; 
}

// Function to display agents on the page
function displayAgents(agents) {
    const container = document.getElementById('agents-container');
    container.innerHTML = ''; // Clear existing content
    agents.forEach(agent => {
        const agentDiv = document.createElement('div');
        agentDiv.className = 'agent';
        agentDiv.style.borderImage = getAgentGradientBorder(agent); // Apply gradient border
        agentDiv.style.borderImageSlice = 1;

        const agentNameSlug = encodeURIComponent(agent.displayName); // Encode the name to preserve special characters

        agentDiv.innerHTML = `
            <h2>${agent.displayName}</h2>   
            <a href="agent-detail.html?${agentNameSlug}">
                <img src="${agent.fullPortrait}" alt="${agent.displayName}">
            </a>
            <p class="role">${agent.role.displayName}</p>
        `;
        container.appendChild(agentDiv);
    }); 
}

fetchAgents();
setupSorting();