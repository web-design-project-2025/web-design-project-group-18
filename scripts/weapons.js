async function fetchWeapons() {
    try {
        const response = await fetch('https://valorant-api.com/v1/weapons');
        const data = await response.json();
        const weaponsContainer = document.createElement('div');
        weaponsContainer.classList.add('weapons-container');
        document.body.insertBefore(weaponsContainer, document.querySelector('footer'));

        data.data.forEach(weapon => {
            const weaponCard = document.createElement('div');
            weaponCard.classList.add('weapon-card');

            const img = document.createElement('img');
            img.src = weapon.displayIcon;
            img.alt = weapon.displayName;
            img.classList.add('weapon-icon');

            const name = document.createElement('h3');
            name.textContent = weapon.displayName;
            name.classList.add('weapon-name');

            weaponCard.appendChild(img);
            weaponCard.appendChild(name);

            weaponsContainer.appendChild(weaponCard);
        });
    } catch (error) {
        console.error('Error fetching weapons:', error);
    }
}

fetchWeapons();