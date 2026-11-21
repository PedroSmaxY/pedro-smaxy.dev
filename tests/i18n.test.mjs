import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pt = JSON.parse(
  fs.readFileSync(path.join(root, "messages/pt-BR.json"), "utf8")
);
const en = JSON.parse(
  fs.readFileSync(path.join(root, "messages/en.json"), "utf8")
);

function collectKeyPaths(obj, prefix = "") {
  if (Array.isArray(obj) || obj === null || typeof obj !== "object") {
    return [prefix];
  }
  return Object.keys(obj)
    .sort()
    .flatMap((key) =>
      collectKeyPaths(obj[key], prefix ? `${prefix}.${key}` : key)
    );
}

test("pt-BR and en translation files have identical key structure", () => {
  assert.deepEqual(collectKeyPaths(pt), collectKeyPaths(en));
});

test("experiences and projects arrays match in length across locales", () => {
  assert.equal(
    pt.portfolio.experiences.items.length,
    en.portfolio.experiences.items.length
  );
  assert.equal(
    pt.portfolio.projects.items.length,
    en.portfolio.projects.items.length
  );
});

test("all referenced project images and CVs exist in public/", () => {
  const publicDir = path.join(root, "public");
  assert.ok(fs.existsSync(path.join(publicDir, "pedro-novais-cv.pdf")));
  assert.ok(fs.existsSync(path.join(publicDir, "pedro-novais-cv-en.pdf")));

  for (const item of pt.portfolio.projects.items) {
    if (item.image) {
      const assetPath = path.join(publicDir, item.image.replace(/^\//, ""));
      assert.ok(fs.existsSync(assetPath), `Missing image: ${item.image}`);
    }
  }
});
