import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-100">
              OpenRemap
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              Open-source ECU binary toolkit for identification, diffing, and
              patching.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-100">
              Links
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="https://github.com/Pinelo92/openremap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-emerald-400 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-neutral-400 hover:text-emerald-400 transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <a
                  href="https://pypi.org/project/openremap/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-emerald-400 transition-colors"
                >
                  PyPI
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-100">
              Legal
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              Released under the{" "}
              <a
                href="https://github.com/Pinelo92/openremap/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-400 hover:text-emerald-400 transition-colors"
              >
                MIT License
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-10 pt-6 text-center">
          <p className="text-sm text-neutral-500">
            &copy; 2025–2026 OpenRemap Contributors
          </p>
        </div>
      </div>
    </footer>
  );
}
