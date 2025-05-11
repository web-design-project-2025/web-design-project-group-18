async function fetchWeapons() {
    try {
        const response = await fetch('https://valorant-api.com/v1/weapons');
        const data = await response.json();
        const main = document.querySelector('main');
        const weaponsContainer = document.createElement('div');
        weaponsContainer.classList.add('weapons-container');
        main.appendChild(weaponsContainer);
        main.insertBefore(weaponsContainer, document.getElementById('detail'));

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
            weaponCard.addEventListener('click', () => showWeaponDetail(weapon));
        });
    } catch (error) {
        console.error('Error fetching weapons:', error);
    }
}

// Create weapon detail card
function showWeaponDetail(weapon) {
    const detail = document.getElementById('detail');
    if (!detail) return;
    // Show the weapon detail section and scroll to it
    if (detail.style.display === 'none' || getComputedStyle(detail).display === 'none') {
        detail.style.display = 'block';
    }
    setTimeout(() => {
        detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);

    // Fill detail-head
    const titleText = detail.querySelector('.title-text h1');
    if (titleText) titleText.textContent = weapon.displayName || '';
    const subTitle = detail.querySelector('.title-text .sub-title');
    if (subTitle) subTitle.textContent = weapon.shopData ? weapon.shopData.category : '';
    const detailText = detail.querySelector('.detail-text');
    if (detailText) detailText.textContent = weapon.shopData ? `Cost: ${weapon.shopData.cost}` : '';
    const detailImg = detail.querySelector('.detail-head img');
    if (detailImg) {
        detailImg.src = weapon.displayIcon || '';
        detailImg.alt = weapon.displayName || '';
    }

    // Weapon Preview: show a random skin video if available
    const previewDiv = detail.querySelector('.weapon-preview');
    const video = previewDiv.querySelector('.weapon-skin-video');
    if (weapon.skins && weapon.skins.length > 0) {
        // Filter for skins with a video
        const skinsWithVideo = weapon.skins.filter(skin => skin.chromas && skin.chromas.some(c => c.streamedVideo));
        let chosenSkin = null;
        let chosenChroma = null;
        if (skinsWithVideo.length > 0) {
            chosenSkin = skinsWithVideo[Math.floor(Math.random() * skinsWithVideo.length)];
            // Pick a random chroma with a video
            const chromasWithVideo = chosenSkin.chromas.filter(c => c.streamedVideo);
            chosenChroma = chromasWithVideo[Math.floor(Math.random() * chromasWithVideo.length)];
        }
        if (chosenChroma && chosenChroma.streamedVideo) {
            video.src = chosenChroma.streamedVideo;
            video.poster = chosenChroma.fullRender || chosenChroma.displayIcon || '';
            video.style.display = '';
        } else {
            video.src = '';
            video.poster = '';
            video.style.display = 'none';
        }
    } else {
        video.src = '';
        video.poster = '';
        video.style.display = 'none';
    }

    // Weapon Stats
    const weaponStats = [
        ['Fire Rate', weapon.weaponStats?.fireRate],
        ['Magazine Size', weapon.weaponStats?.magazineSize],
        ['Reload Time', weapon.weaponStats?.reloadTimeSeconds],
        ['Equip Time', weapon.weaponStats?.equipTimeSeconds],
        ['First Bullet Accuracy', weapon.weaponStats?.firstBulletAccuracy],
        ['ADS Fire Rate', weapon.weaponStats?.adsFireRate],
        ['Run Speed Multiplier', weapon.weaponStats?.runSpeedMultiplier]
    ];
    fillStatsTable(detail.querySelector('.weapon-stats table'), 'Weapon Stats', weaponStats);

    // ADS Stats
    const adsStatsTable = detail.querySelector('.ads-stats table');
    if (adsStatsTable) {
        const adsStats = weapon.weaponStats?.adsStats || {};
        const adsRows = [
            ['Zoom Multiplier', adsStats.zoomMultiplier],
            ['Fire Rate', adsStats.fireRate],
            ['Run Speed Multiplier', adsStats.runSpeedMultiplier],
            ['Burst Count', adsStats.burstCount],
            ['First Bullet Accuracy', adsStats.firstBulletAccuracy]
        ].filter(([_, value]) => value !== undefined && value !== null);
        if (Object.keys(adsStats).length && adsRows.length) {
            fillStatsTable(adsStatsTable, 'ADS Stats', adsRows);
            adsStatsTable.parentElement.style.display = '';
        } else {
            adsStatsTable.innerHTML = '<th class="title-text" colspan="2"><h1>ADS Stats</h1></th><tr><td colspan="2" style="color:#b2b2b2; font-weight:normal;">No ADS stats for this weapon</td></tr>';
            adsStatsTable.parentElement.style.display = '';
        }
    }

    // Damage Ranges
    fillDamageRangesTable(
        detail.querySelector('.damage-range-section .damage-distance'),
        weapon.weaponStats?.damageRanges
    );
}

// This function fills the stats table with the provided title and rows
function fillStatsTable(table, title, rows) {
    if (!table) return;
    table.innerHTML = `<th class="title-text" colspan="2"><h1>${title}</h1></th>`;
    rows.forEach(([label, value]) => {
        if (value !== undefined && value !== null) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${label}</td><td><b>${value}</b></td>`;
            table.appendChild(tr);
        }
    });
}

// This function fills the damage ranges table with the provided ranges
function fillDamageRangesTable(table, ranges) {
    if (!table || !ranges || !ranges.length) return;
    table.innerHTML = '<th class="title-text" colspan="2"><h1>Damage Ranges</h1></th>';
    ranges.forEach(range => {
        const sectionRow = document.createElement('tr');
        sectionRow.className = 'range-section-row';
        sectionRow.innerHTML = `<td colspan="2"><span class="range-start">${range.rangeStartMeters}M</span> - ${range.rangeEndMeters}M</td>`;
        table.appendChild(sectionRow);
        [
            ['Head', range.headDamage],
            ['Body', range.bodyDamage],
            ['Leg', range.legDamage]
        ].forEach(([label, value]) => {
            if (value !== undefined && value !== null) {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${label}</td><td><b>${value}</b></td>`;
                table.appendChild(tr);
            }
        });
    });
}

fetchWeapons();