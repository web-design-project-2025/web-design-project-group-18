async function fetchWeapons() {
    try {
        const response = await fetch('https://valorant-api.com/v1/weapons');
        const data = await response.json();
        const weaponsContainer = document.createElement('div');
        weaponsContainer.classList.add('weapons-container');
        document.querySelector('main').appendChild(weaponsContainer);

        const weaponOrder = [8, 11, 7, 9, 10, 17, 16, 6, 5, 3, 13, 4, 2, 18, 15, 14, 12, 1, 0];

        weaponOrder.forEach(weaponIndex => {
            const weapon = data.data[weaponIndex];
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

            let category = document.getElementById(weapon.category);

            if (category == null) {
                category = document.createElement('div');
                category.id = weapon.category;
                
                const categoryName = document.createElement('h1');
                categoryName.textContent = weapon.category.split('::')[1];
                categoryName.classList.add('category-name');
                category.appendChild(categoryName);

                weaponsContainer.appendChild(category);
            } 
            category.appendChild(weaponCard);



        });
    } catch (error) {
        console.error('Error fetching weapons:', error);
    }
}

fetchWeapons();