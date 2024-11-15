const themeSwitchButton = document.getElementById('theme-switch');
const themes = ['light', 'dark', 'pastel-pink', 'pastel-green', 'pastel-yellow'];
let currentThemeIndex = 0;

themeSwitchButton.addEventListener('click', switchTheme);

function switchTheme() {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  document.documentElement.setAttribute('data-theme', themes[currentThemeIndex]);
  themeSwitchButton.textContent = `Wechsle Theme (${themes[(currentThemeIndex + 1) % themes.length]})`;
}
