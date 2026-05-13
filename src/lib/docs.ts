import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/v-arapidis/openremap-core/main";

export interface DocEntry {
  slug: string[];
  githubPath: string;
  title: string;
  category: string;
}

export const DOC_MANIFEST: DocEntry[] = [
  // Getting Started
  {
    slug: ["about"],
    githubPath: "docs/about.md",
    title: "About OpenRemap",
    category: "Getting Started",
  },
  {
    slug: ["quickstart"],
    githubPath: "docs/quickstart.md",
    title: "Quick Start",
    category: "Getting Started",
  },
  {
    slug: ["setup"],
    githubPath: "docs/setup.md",
    title: "Setup",
    category: "Getting Started",
  },
  {
    slug: ["cli"],
    githubPath: "docs/cli.md",
    title: "CLI Reference",
    category: "Getting Started",
  },

  // Guides
  {
    slug: ["tui"],
    githubPath: "docs/tui.md",
    title: "Interactive TUI",
    category: "Guides",
  },
  {
    slug: ["commands", "workflow"],
    githubPath: "docs/commands/workflow.md",
    title: "Workflow Guide",
    category: "Guides",
  },

  // Installation
  {
    slug: ["install", "windows"],
    githubPath: "docs/install/windows.md",
    title: "Windows Installation",
    category: "Installation",
  },
  {
    slug: ["install", "macos-linux"],
    githubPath: "docs/install/macos-linux.md",
    title: "macOS & Linux",
    category: "Installation",
  },
  {
    slug: ["install", "developers"],
    githubPath: "docs/install/developers.md",
    title: "Developer Setup",
    category: "Installation",
  },

  // Commands
  {
    slug: ["commands", "overview"],
    githubPath: "docs/commands/commands.md",
    title: "Commands Overview",
    category: "Commands",
  },
  {
    slug: ["commands", "identify"],
    githubPath: "docs/commands/identify.md",
    title: "identify",
    category: "Commands",
  },
  {
    slug: ["commands", "scan"],
    githubPath: "docs/commands/scan.md",
    title: "scan",
    category: "Commands",
  },
  {
    slug: ["commands", "cook"],
    githubPath: "docs/commands/cook.md",
    title: "cook",
    category: "Commands",
  },
  {
    slug: ["commands", "tune"],
    githubPath: "docs/commands/tune.md",
    title: "tune",
    category: "Commands",
  },
  {
    slug: ["commands", "validate"],
    githubPath: "docs/commands/validate.md",
    title: "validate",
    category: "Commands",
  },
  {
    slug: ["commands", "families"],
    githubPath: "docs/commands/families.md",
    title: "families",
    category: "Commands",
  },

  // Concepts
  {
    slug: ["confidence"],
    githubPath: "docs/confidence.md",
    title: "Confidence Scoring",
    category: "Concepts",
  },
  {
    slug: ["recipe-format"],
    githubPath: "docs/recipe-format.md",
    title: "Recipe Format",
    category: "Concepts",
  },
  {
    slug: ["architecture"],
    githubPath: "docs/architecture.md",
    title: "Architecture Overview",
    category: "Concepts",
  },

  // Manufacturers
  {
    slug: ["manufacturers", "bosch"],
    githubPath: "docs/manufacturers/bosch.md",
    title: "Bosch",
    category: "Manufacturers",
  },
  {
    slug: ["manufacturers", "bosch-internals"],
    githubPath: "docs/manufacturers/bosch-internals.md",
    title: "Bosch Internals",
    category: "Manufacturers",
  },
  {
    slug: ["manufacturers", "siemens"],
    githubPath: "docs/manufacturers/siemens.md",
    title: "Siemens",
    category: "Manufacturers",
  },
  {
    slug: ["manufacturers", "siemens-internals"],
    githubPath: "docs/manufacturers/siemens-internals.md",
    title: "Siemens Internals",
    category: "Manufacturers",
  },
  {
    slug: ["manufacturers", "delphi"],
    githubPath: "docs/manufacturers/delphi.md",
    title: "Delphi",
    category: "Manufacturers",
  },
  {
    slug: ["manufacturers", "marelli"],
    githubPath: "docs/manufacturers/marelli.md",
    title: "Marelli",
    category: "Manufacturers",
  },

  // Contributing & Legal
  {
    slug: ["contributing"],
    githubPath: "CONTRIBUTING.md",
    title: "Contributing",
    category: "Contributing & Legal",
  },
  {
    slug: ["disclaimer"],
    githubPath: "DISCLAIMER.md",
    title: "Disclaimer",
    category: "Contributing & Legal",
  },
  {
    slug: ["changelog"],
    githubPath: "CHANGELOG.md",
    title: "Changelog",
    category: "Contributing & Legal",
  },
];

export interface ParsedDoc {
  title: string;
  contentHtml: string;
  category: string;
  slug: string[];
}

function slugToKey(slug: string[]): string {
  return slug.join("/");
}

function findDocEntry(slug: string[]): DocEntry | undefined {
  const key = slugToKey(slug);
  return DOC_MANIFEST.find((entry) => slugToKey(entry.slug) === key);
}

export async function fetchDoc(slug: string[]): Promise<ParsedDoc | null> {
  const entry = findDocEntry(slug);
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

    const contentHtml = fixRelativeDocLinks(processed.toString(), entry);

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
function fixRelativeDocLinks(html: string, currentEntry: DocEntry): string {
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
      const target = DOC_MANIFEST.find((e) => {
        const ePath = e.githubPath.replace(/\.md$/i, "");
        return ePath === resolved;
      });

      if (target) {
        return `${before}/docs/${target.slug.join("/")}${anchor}${after}`;
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

export function getAllDocSlugs(): string[][] {
  return DOC_MANIFEST.map((entry) => entry.slug);
}

export function getDocsByCategory(): Record<string, DocEntry[]> {
  const grouped: Record<string, DocEntry[]> = {};

  for (const entry of DOC_MANIFEST) {
    if (!grouped[entry.category]) {
      grouped[entry.category] = [];
    }
    grouped[entry.category].push(entry);
  }

  return grouped;
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
