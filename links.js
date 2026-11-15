const preferenceKey = 'link-page-preferences';

function readPreferences() {
  try {
    return JSON.parse(localStorage.getItem(preferenceKey)) || {};
  } catch {
    return {};
  }
}

const preferences = readPreferences();

function savePreferences() {
  try {
    localStorage.setItem(preferenceKey, JSON.stringify(preferences));
  } catch {
    // The controls still work when the browser blocks storage.
  }
}

const themeToggle = document.querySelector('#toggle');
themeToggle.checked = preferences.lightMode === true;
themeToggle.addEventListener('change', () => {
  preferences.lightMode = themeToggle.checked;
  savePreferences();
});

const sections = preferences.sections || {};
preferences.sections = sections;
for (const section of document.querySelectorAll('details.group')) {
  section.open = sections[section.id] !== false;
  section.addEventListener('toggle', () => {
    sections[section.id] = section.open;
    savePreferences();
  });
}

for (const logo of document.querySelectorAll('.brand-logo')) {
  const showLogo = () => logo.classList.add('loaded');
  logo.addEventListener('load', showLogo, { once: true });
  if (logo.complete && logo.naturalWidth > 0) showLogo();
}

