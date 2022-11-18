const cssnano = require('cssnano')
module.exports = {
  plugins: {
    tailwindcss: {config: './tailwind.config.js'},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {cssnano: cssnano({preset: 'default'})} : {}) 
  }
}
