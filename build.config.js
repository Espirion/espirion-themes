module.exports = {
  srcDir: "./src",
  distDir: "./dist",
  output: {
    css: false, // ⚠️ Only `.min.css` if false
    minCss: true,
  },
  skipTopLevelFiles: false, // Skip .css files directly in src/
  blacklist: [], // Add filenames to skip (e.g., ['github.css'])
};
