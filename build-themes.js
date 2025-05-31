const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const prettier = require("prettier");
const config = require("./build.config.js");

const plugins = [autoprefixer()];
const minifyPlugins = [autoprefixer(), cssnano()];

const { srcDir, distDir, output, blacklist } = config;

async function processCssFile(inputPath, relativePath) {
  const css = fs.readFileSync(inputPath, "utf-8");
  const fileBase = path.join(distDir, relativePath).replace(/\.css$/, "");

  fs.mkdirSync(path.dirname(fileBase), { recursive: true });

  try {
    // ✅ Prettier is synchronous – do NOT await
    const formattedCss = prettier.format(css, { parser: "css" });
    
    if (output.css) {
      fs.writeFileSync(fileBase + ".css", (await formattedCss).trim());
      console.log(`🟢 Built: ${fileBase}.css`);
    }

    if (output.minCss) {
      // ✅ PostCSS is asynchronous – MUST await
      const minified = await postcss(minifyPlugins).process(css, { from: inputPath });
      fs.writeFileSync(fileBase + ".min.css", minified.css);
      console.log(`✅ Built: ${fileBase}.min.css`);
    }
  } catch (err) {
    console.error(`❌ Error in ${inputPath}:`, err);
  }
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
      processCssFile(fullPath, relativePath);
    }
  }
}

walkAndBuild(srcDir);
