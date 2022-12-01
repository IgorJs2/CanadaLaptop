module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /./
    },
  ],
  important: false,
  theme: {
    extend: {},
    colors: {
      'main-dark': '#444C53',
      'second-dark': '#626263',
      'main-dark-2': '#414142',
      'green': '#66D9BD',
      'red': '#D1557A',
      'yellow': '#EAC15A',
      'dark_green': '#5EC7AD',
      'dark_red': '#BA4D6D',
      'light-red': "#6f1f29",
      'medium-red': "#f7c4cb",
      'white': "#FFFFFF"
    },
  },
}
