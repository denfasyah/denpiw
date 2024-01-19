/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    container: {
        center: true,
        padding: "16px",
      },
    extend: {
        fontFamily: {
            'inter': ['Inter', 'sans-serif'], 
          },
        colors: {
            Blue: '#178EFC', 
            DarkBlue: '#1077D5',
            Aqua: '#07E1FF',
            Background : '#EBEBEB',
          },
    },
},
  plugins: [require("daisyui")],
}

