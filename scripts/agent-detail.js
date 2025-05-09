document.addEventListener("DOMContentLoaded", async () => {
    const agentName = decodeURIComponent(window.location.search.substring(1)); // Get agent name from query parameter
    const agentImage = document.getElementById("agent-image");
    const agentNameElement = document.getElementById("agent-name");
    const agentRole = document.getElementById("agent-role");
    const agentDescription = document.getElementById("agent-description");
    const agentAbilities = document.getElementById("agent-abilities");

    if (!agentName) {
        agentNameElement.textContent = "Agent name not provided in the URL.";
        return;
    }

    try {
        const response = await fetch("https://valorant-api.com/v1/agents");
        if (!response.ok) {
            throw new Error("Failed to fetch agents.");
        }

        const data = await response.json();
        const agent = data.data.find(agent => agent.displayName.toLowerCase() === agentName.toLowerCase());

        if (!agent) {
            agentNameElement.textContent = "Agent not found.";
            return;
        }

        // Populate agent details
        agentImage.src = agent.fullPortrait;
        agentImage.alt = agent.displayName;
        agentNameElement.textContent = agent.displayName;
        agentRole.textContent = agent.role.displayName;
        agentDescription.textContent = agent.description;

        // Populate abilities
        agentAbilities.innerHTML = agent.abilities.map(ability => `
            <div class="ability">
                <img src="${ability.displayIcon}" alt="${ability.displayName}">
                <p><strong>${ability.displayName}</strong>: ${ability.description}</p>
            </div>
        `).join("");
    } 
    catch (error) {
        console.error("Error loading agent details:", error);
        agentNameElement.textContent = "Failed to load agent details. Please try again later.";
    }
});
