const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const config = require("./build.config.js");

const plugins = [autoprefixer(), cssnano()];
const { srcDir, distDir, output, blacklist, skipTopLevelFiles } = config;

function processCssFile(inputPath, relativePath) {
  const css = fs.readFileSync(inputPath, "utf-8");
  const fileBase = path.join(distDir, relativePath).replace(/\.css$/, "");

  fs.mkdirSync(path.dirname(fileBase), { recursive: true });

  return postcss(plugins)
    .process(css, { from: inputPath })
    .then((result) => {
      if (output.css) {
        fs.writeFileSync(fileBase + ".css", result.css);
        console.log(`🟢 Built: ${fileBase}.css`);
      }
      if (output.minCss) {
        fs.writeFileSync(fileBase + ".min.css", result.css);
        console.log(`✅ Built: ${fileBase}.min.css`);
      }
    })
    .catch((err) => console.error(`❌ Error in ${inputPath}:`, err));
}

function walkAndBuild(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(srcDir, fullPath);

    if (entry.isDirectory()) {
      walkAndBuild(fullPath);
    } else if (
      entry.isFile() &&
      entry.name.endsWith(".css") &&
      !blacklist.includes(entry.name)
    ) {
      const isTopLevel = path.dirname(relativePath) === ".";
      if (skipTopLevelFiles && isTopLevel) {
        console.log(`⏭️ Skipped top-level file: ${relativePath}`);
        continue;
      }

      processCssFile(fullPath, relativePath);
    }
  }
}

walkAndBuild(srcDir);
console.log("✅ All CSS files processed successfully.");
