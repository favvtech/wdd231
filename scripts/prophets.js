const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.prophets); // temporary testing of data response
  displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    const card = document.createElement('section');
    const fullName = document.createElement('h2');
    const portrait = document.createElement('img');
    const dateInfo = document.createElement('p');
    const placeInfo = document.createElement('p');

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}, Latter-day prophet`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    dateInfo.textContent = `Date of Birth: ${prophet.birthdate}`;
    placeInfo.textContent = `Place of Birth: ${prophet.birthplace}`;

    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(dateInfo);
    card.appendChild(placeInfo);
    cards.appendChild(card);
  });
};

getProphetData();


