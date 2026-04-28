const fs = require("node:fs");
const path = require("node:path");

const postsDir = path.join(process.cwd(), "posts");

for (const file of fs.readdirSync(postsDir)) {
  if (!file.endsWith(".html")) {
    continue;
  }

  const full = path.join(postsDir, file);
  const original = fs.readFileSync(full, "utf8");
  let next = original;

  next = next.replace(/&lt;span\b([\s\S]*?)&gt;/gi, (_m, attrs) => {
    const cleanAttrs = attrs.replace(/&quot;/g, '"');
    return `<span${cleanAttrs}>`;
  });

  next = next.replace(/&lt;\/span&gt;/gi, "</span>");

  if (next !== original) {
    fs.writeFileSync(full, next, "utf8");
    console.log(`updated: ${file}`);
  }
}
