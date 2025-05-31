module.exports = {
  srcDir: "./src",
  distDir: "./dist",
  output: {
    css: true, // ⚠️ Only `.min.css` if false
    minCss: false,
  },
  skipTopLevelFiles: false, // Skip .css files directly in src/
  blacklist: [], // Add filenames to skip (e.g., ['github.css'])
};
