const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/Pinelo92/openremap/main";

const CHANGELOG_PATH = "CHANGELOG.md";

export interface ChangelogEntry {
  label: string;
  title: string;
  description: string;
}

export interface LatestRelease {
  version: string;
  date: string;
  summary: string;
  entries: ChangelogEntry[];
}

/**
 * Map a changelog `### Heading` to a display label and colour hint.
 *
 * The heading format in CHANGELOG.md is:
 *   ### Fixed — EDC16 Extractor
 *   ### Added — Evidence-Based Detection
 *   ### Changed — Confidence Scoring
 *   ### Tests
 *
 * We extract the keyword before the optional ` — ` separator.
 */
function classifyHeading(heading: string): string {
  const raw = heading.split("—")[0].trim().split("–")[0].trim();
  const lower = raw.toLowerCase();
  if (lower.startsWith("fix")) return "Fixed";
  if (lower.startsWith("add")) return "New";
  if (lower.startsWith("change")) return "Changed";
  if (lower.startsWith("deprecat")) return "Deprecated";
  if (lower.startsWith("remov")) return "Removed";
  if (lower.startsWith("secur")) return "Security";
  if (lower.startsWith("test")) return "Tests";
  return raw;
}

/**
 * Extracts the short title from a `### Heading`.
 *
 * "### Fixed — EDC16 Extractor"  →  "EDC16 Extractor"
 * "### Tests"                     →  "Tests"
 */
function extractTitle(heading: string): string {
  const separatorIndex =
    heading.indexOf("—") !== -1
      ? heading.indexOf("—")
      : heading.indexOf("–") !== -1
        ? heading.indexOf("–")
        : -1;

  if (separatorIndex !== -1) {
    return heading.slice(separatorIndex + 1).trim();
  }
  return heading.trim();
}

/**
 * Collapse a list of markdown bullet points into a single plain-text
 * description.  Strips bold markers, backtick code, and leading `- `.
 * Takes at most the first two bullets to keep it concise.
 */
function summariseBullets(lines: string[]): string {
  const bullets = lines
    .filter((l) => l.match(/^\s*-\s+/))
    .map((l) =>
      l
        .replace(/^\s*-\s+/, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/`([^`]*)`/g, "$1")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .trim(),
    );

  if (bullets.length === 0) return "";

  // Take first bullet. If it's short, append second.
  let desc = bullets[0];
  if (bullets.length > 1 && desc.length < 100) {
    desc += " " + bullets[1];
  }

  // Truncate if too long
  if (desc.length > 200) {
    desc = desc.slice(0, 197) + "…";
  }

  return desc;
}

/**
 * Parse the raw CHANGELOG.md text and return the latest release block.
 */
function parseLatestRelease(markdown: string): LatestRelease | null {
  const lines = markdown.split("\n");

  // Find the first `## [x.y.z] — YYYY-MM-DD` heading
  let versionLineIndex = -1;
  let version = "";
  let date = "";

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(
      /^##\s+\[(\d+\.\d+\.\d+[^\]]*)\]\s*[—–-]\s*(\d{4}-\d{2}-\d{2})/,
    );
    if (match) {
      versionLineIndex = i;
      version = match[1];
      date = match[2];
      break;
    }
  }

  if (versionLineIndex === -1) return null;

  // Find where the next `## [` starts (end of this release block)
  let endIndex = lines.length;
  for (let i = versionLineIndex + 1; i < lines.length; i++) {
    if (lines[i].match(/^##\s+\[/)) {
      endIndex = i;
      break;
    }
  }

  const releaseLines = lines.slice(versionLineIndex + 1, endIndex);

  // Extract the summary paragraph (lines before the first ### heading)
  const summaryLines: string[] = [];
  let bodyStart = 0;
  for (let i = 0; i < releaseLines.length; i++) {
    if (releaseLines[i].startsWith("### ")) {
      bodyStart = i;
      break;
    }
    const trimmed = releaseLines[i].trim();
    if (trimmed && !trimmed.startsWith("---")) {
      summaryLines.push(trimmed);
    }
    bodyStart = i + 1;
  }
  const summary = summaryLines.join(" ");

  // Parse ### sections into entries
  const entries: ChangelogEntry[] = [];
  let currentHeading = "";
  let currentBullets: string[] = [];

  function flushSection() {
    if (!currentHeading) return;
    const label = classifyHeading(currentHeading);
    const title = extractTitle(currentHeading);
    const description = summariseBullets(currentBullets);
    if (description) {
      entries.push({ label, title, description });
    }
  }

  for (let i = bodyStart; i < releaseLines.length; i++) {
    const line = releaseLines[i];
    if (line.startsWith("### ")) {
      flushSection();
      currentHeading = line.replace(/^###\s+/, "");
      currentBullets = [];
    } else {
      currentBullets.push(line);
    }
  }
  flushSection();

  return { version, date, summary, entries };
}

/**
 * Fetch the CHANGELOG.md from GitHub and parse the latest release.
 *
 * Called at build time (SSG/ISR) — the result is baked into static HTML.
 * Revalidates every hour so rebuilds or ISR pick up new releases.
 */
export async function fetchLatestRelease(): Promise<LatestRelease | null> {
  const url = `${GITHUB_RAW_BASE}/${CHANGELOG_PATH}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      console.error(
        `Failed to fetch changelog at ${url}: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const markdown = await response.text();
    return parseLatestRelease(markdown);
  } catch (error) {
    console.error(`Error fetching changelog at ${url}:`, error);
    return null;
  }
}
