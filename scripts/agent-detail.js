document.addEventListener("DOMContentLoaded", async () => {
    const agentName = decodeURIComponent(window.location.search.substring(1));
    const agentImage = document.getElementById("agent-image");
    const agentImageBg = document.getElementById("agent-image-bg");
    const agentNameElement = document.getElementById("agent-name");
    const agentRole = document.getElementById("agent-role");
    const agentDescription = document.getElementById("agent-description");
    const agentAbilities = document.getElementById("agent-abilities");
    const abilityDescriptionContainer = document.getElementById("ability-description-container");

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

        // Populate agent graffiti background if available
        if (agent.background) {
            agentImageBg.src = agent.background;
            agentImageBg.alt = agent.displayName + " Background";
            agentImageBg.style.display = "block";
        } else {
            agentImageBg.style.display = "none";
        }

        // Populate agent abilities
        agentAbilities.innerHTML = agent.abilities.map((ability, idx) => `
            <div class="ability-icon" data-idx="${idx}" tabindex="0">
                <img src="${ability.displayIcon}" alt="${ability.displayName}">
            </div>
        `).join("");

        // Show first ability description by default
        function showAbilityDescription(idx) {
            const ability = agent.abilities[idx];
            abilityDescriptionContainer.innerHTML = `
                <div class="ability-description active">
                    <strong>${ability.slot ? ability.slot + ' - ' : ''}${ability.displayName}</strong>: ${ability.description}
                </div>
            `;
            // Highlight selected icon
            document.querySelectorAll('.ability-icon').forEach((el, i) => {
                if (i === idx) el.classList.add('selected');
                else el.classList.remove('selected');
            });
        }
        showAbilityDescription(0);

        // Add click event to icons
        document.querySelectorAll('.ability-icon').forEach((icon, idx) => {
            icon.addEventListener('click', () => showAbilityDescription(idx));
            icon.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    showAbilityDescription(idx);
                }
            });
        });
    } 
    catch (error) {
        console.error("Error loading agent details:", error);
        agentNameElement.textContent = "Failed to load agent details. Please try again later.";
    }
});
