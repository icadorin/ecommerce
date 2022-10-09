const tailwindcss = require('tailwindcss');

module.exports = {
    // Add plugins
    plugins: [
        tailwindcss('./tailwind.js'),
        require('autoprefixer')
    ]
}