import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const GITHUB_RAW_BASE =
  process.env.OPENREMAP_RAW_BASE ??
  "https://raw.githubusercontent.com/v-arapidis/openremap-core/main";

export interface DocEntry {
  slug: string[];
  githubPath: string;
  title: string;
  category: string;
}

export const DOC_MANIFEST: DocEntry[] = buildManifest();

/**
 * `index.md` pages get the folder path as their slug (no "index" segment):
 *   docs/commands/identify/index.md → /docs/commands/identify
 * Child pages keep their filename:
 *   docs/commands/identify/advanced.md → /docs/commands/identify/advanced
 */
function buildManifest(): DocEntry[] {
  const entries: DocEntry[] = [];

  const add = (
    slug: string[],
    githubPath: string,
    title: string,
    category: string,
  ) => {
    entries.push({ slug, githubPath, title, category });
  };

  // ── Getting Started ────────────────────────────────────────────────
  const gettingStarted = "Getting Started";
  add(["getting-started"], "docs/getting-started/index.md", "Getting Started", gettingStarted);
  add(["getting-started", "about"], "docs/getting-started/about.md", "About OpenRemap", gettingStarted);
  add(["getting-started", "quickstart"], "docs/getting-started/quickstart.md", "Quick Start", gettingStarted);
  add(["getting-started", "setup"], "docs/getting-started/setup.md", "Setup", gettingStarted);
  add(["getting-started", "cli"], "docs/getting-started/cli.md", "CLI Reference", gettingStarted);
  add(["getting-started", "tui"], "docs/getting-started/tui.md", "Interactive TUI", gettingStarted);

  // ── Installation ───────────────────────────────────────────────────
  const installation = "Installation";
  add(["install"], "docs/getting-started/install/index.md", "Installation", installation);
  add(["install", "windows"], "docs/getting-started/install/windows.md", "Windows", installation);
  add(["install", "macos-linux"], "docs/getting-started/install/macos-linux.md", "macOS & Linux", installation);
  add(["install", "developers"], "docs/getting-started/install/developers.md", "Developer Setup", installation);

  // ── Guides ─────────────────────────────────────────────────────────
  add(["guides", "workflow"], "docs/commands/workflow.md", "Workflow Guide", "Guides");

  // ── Commands (two-tier: index + advanced per command) ──────────────
  const commands = "Commands";
  add(["commands"], "docs/commands/index.md", "Commands Overview", commands);
  const COMMAND_NAMES = [
    "identify",
    "scan",
    "scan-vins",
    "layout",
    "scan-maps",
    "diff-maps",
    "cook",
    "merge",
    "tune",
    "validate",
    "audit",
    "checksum",
    "health",
    "families",
  ];
  for (const name of COMMAND_NAMES) {
    add(["commands", name], `docs/commands/${name}/index.md`, name, commands);
    add(
      ["commands", name, "advanced"],
      `docs/commands/${name}/advanced.md`,
      `${name} (advanced)`,
      commands,
    );
  }

  // ── Concepts ───────────────────────────────────────────────────────
  const concepts = "Concepts";
  add(["concepts"], "docs/concepts/index.md", "Concepts", concepts);
  add(["concepts", "how-it-works"], "docs/concepts/how-it-works.md", "How It Works", concepts);
  add(["concepts", "confidence"], "docs/concepts/confidence.md", "Confidence Scoring", concepts);
  add(["concepts", "evidence"], "docs/concepts/evidence.md", "Evidence", concepts);
  add(["concepts", "recipe-format"], "docs/concepts/recipe-format.md", "Recipe Format", concepts);
  add(["concepts", "architecture"], "docs/concepts/architecture.md", "Architecture Overview", concepts);
  add(["concepts", "orst-format"], "docs/concepts/orst-format.md", "ORST Format", concepts);

  // ── Manufacturers ──────────────────────────────────────────────────
  const manufacturers = "Manufacturers";
  add(["manufacturers"], "docs/manufacturers/index.md", "Supported Manufacturers", manufacturers);

  const BOSCH_FAMILIES: [string, string][] = [
    ["edc1", "EDC1 / EDC2"],
    ["edc15", "EDC15"],
    ["edc16", "EDC16"],
    ["edc17", "EDC17 / MEDC17"],
    ["edc3x", "EDC 3.x"],
    ["lh", "LH-Jetronic"],
    ["m1x", "M1.x / M1.55"],
    ["m2x", "M2.x"],
    ["m3x", "M3.x / MP3.x / MP7.x"],
    ["m4x", "M4.x"],
    ["m5x", "M5.x / M3.8x"],
    ["me155", "ME1.5.5"],
    ["me7", "ME7"],
    ["me9", "ME9"],
    ["med9", "MED9"],
    ["mono", "Mono-Motronic"],
    ["motronic-legacy", "Motronic Legacy"],
    ["mp9", "MP9"],
  ];
  add(["manufacturers", "bosch"], "docs/manufacturers/bosch/index.md", "Bosch", manufacturers);
  add(["manufacturers", "bosch", "internals"], "docs/manufacturers/bosch/internals.md", "Bosch Internals", manufacturers);
  for (const [slug, title] of BOSCH_FAMILIES) {
    add(["manufacturers", "bosch", slug], `docs/manufacturers/bosch/${slug}.md`, title, manufacturers);
  }

  const SIEMENS_FAMILIES: [string, string][] = [
    ["ems2000", "EMS2000"],
    ["ms43", "MS43"],
    ["ppd", "PPD1.x"],
    ["sid801", "SID 801 / 801A"],
    ["sid803", "SID 803 / 803A"],
    ["simos", "SIMOS"],
    ["simtec56", "Simtec 56"],
  ];
  add(["manufacturers", "siemens"], "docs/manufacturers/siemens/index.md", "Siemens", manufacturers);
  add(["manufacturers", "siemens", "internals"], "docs/manufacturers/siemens/internals.md", "Siemens Internals", manufacturers);
  for (const [slug, title] of SIEMENS_FAMILIES) {
    add(["manufacturers", "siemens", slug], `docs/manufacturers/siemens/${slug}.md`, title, manufacturers);
  }

  add(["manufacturers", "delphi"], "docs/manufacturers/delphi/index.md", "Delphi", manufacturers);
  add(["manufacturers", "delphi", "multec"], "docs/manufacturers/delphi/multec.md", "Multec", manufacturers);
  add(["manufacturers", "delphi", "multec_s"], "docs/manufacturers/delphi/multec_s.md", "Multec S", manufacturers);

  add(["manufacturers", "marelli"], "docs/manufacturers/marelli/index.md", "Magneti Marelli", manufacturers);
  add(["manufacturers", "marelli", "iaw_1ap"], "docs/manufacturers/marelli/iaw_1ap.md", "IAW 1AP", manufacturers);
  add(["manufacturers", "marelli", "iaw_1av"], "docs/manufacturers/marelli/iaw_1av.md", "IAW 1AV", manufacturers);
  add(["manufacturers", "marelli", "iaw_4lv"], "docs/manufacturers/marelli/iaw_4lv.md", "IAW 4LV", manufacturers);
  add(["manufacturers", "marelli", "mjd6jf"], "docs/manufacturers/marelli/mjd6jf.md", "MJD 6JF", manufacturers);

  add(["manufacturers", "denso"], "docs/manufacturers/denso/index.md", "Denso", manufacturers);
  add(["manufacturers", "denso", "diesel"], "docs/manufacturers/denso/diesel.md", "EE20 Diesel", manufacturers);
  add(["manufacturers", "denso", "sh7055"], "docs/manufacturers/denso/sh7055.md", "SH7055", manufacturers);
  add(["manufacturers", "denso", "sh7058"], "docs/manufacturers/denso/sh7058.md", "SH7058", manufacturers);
  add(["manufacturers", "denso", "sh72531"], "docs/manufacturers/denso/sh72531.md", "SH72531", manufacturers);

  add(["manufacturers", "hitachi"], "docs/manufacturers/hitachi/index.md", "Hitachi", manufacturers);
  add(["manufacturers", "hitachi", "sh72546"], "docs/manufacturers/hitachi/sh72546.md", "SH72546", manufacturers);

  // ── Contributing & Legal ───────────────────────────────────────────
  const contributing = "Contributing & Legal";
  add(["contributing"], "CONTRIBUTING.md", "Contributing", contributing);
  add(["disclaimer"], "DISCLAIMER.md", "Disclaimer", contributing);
  add(["changelog"], "CHANGELOG.md", "Changelog", contributing);

  return entries;
}

const CHANGELOG_CATEGORY = "Contributing & Legal";

/**
 * Discover the per-version changelog pages by parsing the version table in
 * the repo's own CHANGELOG.md index:
 *
 *   | [0.6.5](changelog/0.6.5.md) | unreleased | ...
 *
 * New versions appear automatically — no manifest edits needed.
 */
let changelogCache: DocEntry[] | null = null;

export async function getChangelogEntries(): Promise<DocEntry[]> {
  if (changelogCache) return changelogCache;
  changelogCache = [];

  try {
    const response = await fetch(`${GITHUB_RAW_BASE}/CHANGELOG.md`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return changelogCache;

    const markdown = await response.text();
    const versionPattern = /^\|\s*\[([0-9][0-9.]*)\]\(changelog\/([^)]+\.md)\)/gm;
    for (const match of markdown.matchAll(versionPattern)) {
      const [, version, file] = match;
      changelogCache.push({
        slug: ["changelog", version],
        githubPath: `changelog/${file}`,
        title: `v${version}`,
        category: CHANGELOG_CATEGORY,
      });
    }
  } catch (error) {
    console.error("Failed to discover changelog versions:", error);
  }

  return changelogCache;
}

/** The full manifest: stable wiki pages + discovered changelog versions. */
export async function getDocsManifest(): Promise<DocEntry[]> {
  return [...DOC_MANIFEST, ...(await getChangelogEntries())];
}

export interface ParsedDoc {
  title: string;
  contentHtml: string;
  category: string;
  slug: string[];
}

function slugToKey(slug: string[]): string {
  return slug.join("/");
}

function findDocEntry(
  slug: string[],
  entries: DocEntry[] = DOC_MANIFEST,
): DocEntry | undefined {
  const key = slugToKey(slug);
  return entries.find((entry) => slugToKey(entry.slug) === key);
}

export async function fetchDoc(
  slug: string[],
  entries: DocEntry[] = DOC_MANIFEST,
): Promise<ParsedDoc | null> {
  const entry = findDocEntry(slug, entries);
  if (!entry) {
    return null;
  }

  const url = `${GITHUB_RAW_BASE}/${entry.githubPath}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      console.error(
        `Failed to fetch doc at ${url}: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const raw = await response.text();
    const { data: frontmatter, content } = matter(raw);

    const processed = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content);

    const contentHtml = fixRelativeDocLinks(processed.toString(), entry, entries);

    const title =
      frontmatter.title || extractFirstHeading(content) || entry.title;

    return {
      title,
      contentHtml,
      category: entry.category,
      slug: entry.slug,
    };
  } catch (error) {
    console.error(`Error fetching doc at ${url}:`, error);
    return null;
  }
}

/**
 * Rewrite relative `.md` links (meant for GitHub browsing) into absolute
 * `/docs/…` routes that work on the website.
 *
 * Examples (for a doc whose githubPath is "docs/setup.md"):
 *   install/windows.md        → /docs/install/windows
 *   ../README.md              → /docs (fallback)
 *   ../CONTRIBUTING.md        → /docs/contributing
 *   #shell-completion         → unchanged (anchor)
 *   https://example.com       → unchanged (external)
 */
function fixRelativeDocLinks(
  html: string,
  currentEntry: DocEntry,
  entries: DocEntry[] = DOC_MANIFEST,
): string {
  // Resolve the "directory" of the current doc's GitHub path.
  // e.g. "docs/setup.md" → "docs", "docs/commands/workflow.md" → "docs/commands"
  const parts = currentEntry.githubPath.split("/");
  parts.pop(); // drop filename
  const currentDir = parts.join("/"); // e.g. "docs" or "docs/commands"

  return html.replace(
    /(<a\s[^>]*href=")([^"]+)("[^>]*>)/gi,
    (_match, before: string, href: string, after: string) => {
      // Skip external URLs, anchors, mailto, absolute paths
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("#") ||
        href.startsWith("/")
      ) {
        return `${before}${href}${after}`;
      }

      // Only process links ending in .md (with optional anchor)
      const mdMatch = href.match(/^(.+\.md)(#.*)?$/);
      if (!mdMatch) {
        return `${before}${href}${after}`;
      }

      const relativePath = mdMatch[1]; // e.g. "install/windows.md" or "../README.md"
      const anchor = mdMatch[2] ?? ""; // e.g. "#shell-completion" or ""

      // Resolve relative path against the current doc's directory
      const segments = currentDir ? currentDir.split("/") : [];
      for (const part of relativePath.split("/")) {
        if (part === "..") {
          segments.pop();
        } else if (part !== ".") {
          segments.push(part);
        }
      }

      // Strip the .md extension from the last segment
      const last = segments.pop();
      if (last) {
        segments.push(last.replace(/\.md$/i, ""));
      }

      const resolved = segments.join("/"); // e.g. "docs/install/windows" or "README"

      // Try to find a matching manifest entry by githubPath
      const target = entries.find((e) => {
        const ePath = e.githubPath.replace(/\.md$/i, "");
        return ePath === resolved;
      });

      if (target) {
        return `${before}/docs/${target.slug.join("/")}${anchor}${after}`;
      }

      // The wiki home: docs/README.md → /docs
      if (resolved === "docs/README" || resolved === "README") {
        return `${before}/docs${anchor}${after}`;
      }

      // Fallback: if the resolved path starts with "docs/", strip that prefix
      // and use it as the slug directly
      if (resolved.startsWith("docs/")) {
        return `${before}/docs/${resolved.slice(5)}${anchor}${after}`;
      }

      // Last resort: link to /docs
      return `${before}/docs${anchor}${after}`;
    },
  );
}

function extractFirstHeading(markdown: string): string | null {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

export const DOC_CATEGORIES = [
  "Getting Started",
  "Guides",
  "Installation",
  "Commands",
  "Concepts",
  "Manufacturers",
  "Contributing & Legal",
] as const;
