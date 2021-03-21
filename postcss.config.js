const postcss_preset_env = require('postcss-preset-env')({
  stage: 2
});
const tailwindcss = require('tailwindcss')({
  config: "./src/scss/tailwind.config.js"
});

const cssnano = require('cssnano')({
  preset: "advanced"
});

const autoprefixer = require('autoprefixer'); // @TODO: test if preset_env does this automatically

module.exports = ({ env }) => {
  return {
    plugins: [
      postcss_preset_env,
      tailwindcss,
      cssnano,
      autoprefixer,
    ]
  }
}
