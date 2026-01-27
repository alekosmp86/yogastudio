import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const BASE_SCHEMA_PATH = path.join(process.cwd(), "prisma/base.prisma");
const MODULES_DIR = path.join(process.cwd(), "src/[modules]");
const OUTPUT_SCHEMA_PATH = path.join(process.cwd(), "prisma/schema.prisma");

function parsePrisma(content: string) {
  const blocks = new Map<string, any>();
  const lines = content.split(/\r?\n/);
  let header = "";
  let currentBlock: any = null;

  for (const line of lines) {
    const trimmed = line.trim();
    // Support model, enum, type blocks
    const match = trimmed.match(/^(model|enum|type)\s+(\w+)\s*{/);
    if (match) {
      currentBlock = { type: match[1], name: match[2], fields: [] };
      blocks.set(currentBlock.name, currentBlock);
    } else if (trimmed === "}" && currentBlock) {
      currentBlock = null;
    } else if (currentBlock) {
      currentBlock.fields.push(line);
    } else {
      header += line + "\n";
    }
  }
  return { blocks, header };
}

async function main() {
  console.log("Generating modular Prisma schema...");

  if (!fs.existsSync(BASE_SCHEMA_PATH)) {
    console.error(`ERROR: Base schema not found: ${BASE_SCHEMA_PATH}`);
    process.exit(1);
  }

  const baseContent = fs.readFileSync(BASE_SCHEMA_PATH, "utf-8");
  const { blocks: mergedBlocks, header } = parsePrisma(baseContent);

  if (fs.existsSync(MODULES_DIR)) {
    const modules = fs.readdirSync(MODULES_DIR);
    for (const mod of modules) {
      const p = path.join(MODULES_DIR, mod, "models.prisma");
      if (fs.existsSync(p)) {
        console.log(`Merging module: ${mod}`);
        const { blocks: modBlocks } = parsePrisma(fs.readFileSync(p, "utf-8"));
        for (const [name, b] of modBlocks.entries()) {
          if (mergedBlocks.has(name)) {
            console.log(`  Extending existing ${b.type}: ${name}`);
            mergedBlocks.get(name).fields.push(...b.fields);
          } else {
            console.log(`  Adding new ${b.type}: ${name}`);
            mergedBlocks.set(name, b);
          }
        }
      }
    }
  }

  let out = header.trimEnd() + "\n\n";
  for (const b of mergedBlocks.values()) {
    out += `${b.type} ${b.name} {\n${b.fields.join("\n")}\n}\n\n`;
  }

  fs.writeFileSync(OUTPUT_SCHEMA_PATH, out);
  console.log(`Wrote ${out.length} bytes to ${OUTPUT_SCHEMA_PATH}`);

  try {
    const cli = path.join(process.cwd(), "node_modules/prisma/build/index.js");
    if (fs.existsSync(cli)) {
      console.log("Running prisma format...");
      execSync(`node "${cli}" format`, { stdio: "inherit" });
      console.log("Prisma format completed successfully.");
    }
  } catch (err) {
    console.error(`Warning: prisma format failed: ${err}`);
  }
}

main().catch((e) => {
  console.error(`Fatal error: ${e}`);
  process.exit(1);
});
