async function fetchAgents() {
    try {
        const response = await fetch('https://valorant-api.com/v1/agents');
        const data = await response.json();
        const agentsContainer = document.getElementById('agents-container');
        agentsContainer.innerHTML = '';

        data.data
            .filter(agent => agent.isPlayableCharacter)
            .forEach(agent => {
                const agentCard = document.createElement('div');
                agentCard.classList.add('agent-card');

                const img = document.createElement('img');
                img.src = agent.displayIcon;
                img.alt = agent.displayName;
                img.classList.add('agent-icon');

                const name = document.createElement('h3');
                name.textContent = agent.displayName;
                name.classList.add('agent-name');

                const role = document.createElement('p');
                role.textContent = agent.role.displayName;
                role.classList.add('agent-role');

                agentCard.appendChild(img);
                agentCard.appendChild(name);
                agentCard.appendChild(role);

            
                agentsContainer.appendChild(agentCard);
            });
    } 
    catch (error) {
        console.error('Error fetching agents:', error);
    }
}

fetchAgents();