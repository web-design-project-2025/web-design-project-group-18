let weaponsData = [];
let selectedWeapons = [null, null];

function createWeaponBox(index) {
  const template = document.getElementById('weapon-box-template');
  const box = template.content.firstElementChild.cloneNode(true);
  box.id = `weapon${index + 1}`;

  // Title
  const h3 = box.querySelector('.weapon-name');
  h3.id = `weapon${index + 1}-name`;
  h3.textContent = `Weapon ${index + 1}`;

  // Dropdown
  const select = box.querySelector('.weapon-dropdown');
  select.id = `weapon-dropdown-${index + 1}`;
  // Remove all options except the first
  while (select.options.length > 1) select.remove(1);
  select.addEventListener('change', e => onDropdownChange(e, index));

  // Stats div
  const statsDiv = box.querySelector('.weapon-stats');
  statsDiv.id = `weapon${index + 1}-stats`;

  return box;
}

function renderAllWeaponBoxes() {
  const container = document.getElementById('comparison-container');
  container.innerHTML = '';
  selectedWeapons.forEach((_, i) => container.appendChild(createWeaponBox(i)));
  populateDropdowns();
  updateAllWeaponBoxStats();
}

function populateDropdowns() {
  selectedWeapons.forEach((selected, i) => {
    const dropdown = document.getElementById(`weapon-dropdown-${i + 1}`);
    if (!dropdown) return;
    // Remove all options except the first
    while (dropdown.options.length > 1) dropdown.remove(1);
    weaponsData.forEach((weapon, j) => {
      const opt = new Option(weapon.name, j, false, selected === j);
      dropdown.add(opt);
    });
    dropdown.value = selected !== null ? selected : '';
  });
}

function updateAllWeaponBoxStats() {
  const best = {
    fireRate: getBestIndices('fireRate', true),
    magazineSize: getBestIndices('magazineSize', true),
    price: getBestIndices('price', false),
    head: getBestIndices('damage', true, 'head'),
    body: getBestIndices('damage', true, 'body'),
    leg: getBestIndices('damage', true, 'leg'),
  };
  selectedWeapons.forEach((_, i) => updateWeaponBox(i, best));
}

function updateWeaponBox(index, best) {
  const weaponIdx = selectedWeapons[index];
  const nameEl = document.getElementById(`weapon${index + 1}-name`);
  const statsEl = document.getElementById(`weapon${index + 1}-stats`);
  if (weaponIdx === null) {
    nameEl.textContent = `Weapon ${index + 1}`;
    statsEl.querySelectorAll('span').forEach(span => (span.textContent = ''));
    return;
  }
  const w = weaponsData[weaponIdx];
  statsEl.querySelector('.type').textContent = w.type;
  statsEl.querySelector('.fireRate').textContent = w.fireRate;
  statsEl.querySelector('.magazineSize').textContent = w.magazineSize;
  statsEl.querySelector('.damage-head').textContent = w.damage.head;
  statsEl.querySelector('.damage-body').textContent = w.damage.body;
  statsEl.querySelector('.damage-leg').textContent = w.damage.leg;
  statsEl.querySelector('.price').textContent = w.price || 'N/A';
  statsEl.querySelector('.wallPenetration').textContent = w.wallPenetration || 'N/A';
  statsEl.querySelector('.fireMode').textContent = w.fireMode || 'N/A';
  nameEl.textContent = w.name;
  // Clear all best indicators first
  statsEl.querySelectorAll('.stat-best').forEach(span => (span.textContent = ''));
  statsEl.querySelector('.fireRate-best').textContent = best.fireRate.includes(index) ? '\u25B2' : '';
  statsEl.querySelector('.magazineSize-best').textContent = best.magazineSize.includes(index) ? '\u25B2' : '';
  statsEl.querySelector('.damage-head-best').textContent = best.head.includes(index) ? '\u25B2' : '';
  statsEl.querySelector('.damage-body-best').textContent = best.body.includes(index) ? '\u25B2' : '';
  statsEl.querySelector('.damage-leg-best').textContent = best.leg.includes(index) ? '\u25B2' : '';
  statsEl.querySelector('.price-best').textContent = best.price.includes(index) ? '\u25B2' : '';
}

function onDropdownChange(e, index) {
  const value = e.target.value;
  selectedWeapons[index] = value === '' ? null : Number(value);
  updateAllWeaponBoxStats();
}

function addWeaponBox() {
  if (selectedWeapons.length >= 5) {
    alert('You can only add up to 5 weapon boxes.');
    return;
  }
  selectedWeapons.push(null);
  renderAllWeaponBoxes();
}

function removeWeaponBox() {
  if (selectedWeapons.length <= 2) {
    alert('You must have at least 2 weapon boxes.');
    return;
  }
  selectedWeapons.pop();
  renderAllWeaponBoxes();
}

async function loadWeapons() {
  try {
    const res = await fetch('./data/weapon-stats.json');
    weaponsData = await res.json();
    renderAllWeaponBoxes();
  } catch (err) {
    console.error('Error loading weapons:', err);
  }
}

window.onload = () => {
  loadWeapons();
  document.getElementById('add-weapon-box').addEventListener('click', addWeaponBox);
  document.getElementById('remove-weapon-box').addEventListener('click', removeWeaponBox);
};

function getStatComparator(stat, isHigherBetter = true) {
  return (a, b) => {
    if (a == null) return false;
    if (b == null) return true;
    return isHigherBetter ? a > b : a < b;
  };
}

function getBestIndices(stat, isHigherBetter = true, subkey = null) {
  let bestValue = null;
  let bestIndices = [];
  selectedWeapons.forEach((weaponIdx, i) => {
    if (weaponIdx === null) return;
    let value = subkey ? weaponsData[weaponIdx][stat][subkey] : weaponsData[weaponIdx][stat];
    if (bestValue === null || getStatComparator(stat, isHigherBetter)(value, bestValue)) {
      bestValue = value;
      bestIndices = [i];
    } else if (value === bestValue) {
      bestIndices.push(i);
    }
  });
  return bestIndices;
}