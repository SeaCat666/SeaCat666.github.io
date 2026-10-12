# Steam automatic updates

The public game library and screenshots refresh daily at approximately **04:37 Asia/Shanghai**. Runs may start later when GitHub is busy. Manual refresh: Actions → **Sync Steam library and screenshots** → **Run workflow** → `master`.

`STEAM_API_KEY` is a repository Actions secret. Steam account `76561198900457579` must keep game details and screenshots public. No API key is stored in Git or published files.

The updater scans all screenshot pages on every run, reuses cached image URLs, and updates descriptions. It publishes only after both the library and complete gallery have been fetched and validated. Network failures, privacy changes, missing screenshot detail pages or changed HTML boundaries fail the run and leave the committed page intact.

Only the game list, screenshot gallery and their counts are changed. Other published pages, reviews, layout and image assets are retained. Daily successful-check metadata keeps this public repository's schedule from becoming inactive when the library does not change.

GitHub Pages continues to use `master` / root. Scheduled runs explicitly upload and deploy the current static files because `GITHUB_TOKEN` commits do not trigger the normal legacy Pages build. Ordinary local publishing by a user still works as before.

The current Astro source is in `D:/C盘搬家/Desktop/个人文件夹/hexo-blog-new`. Source JSON files do not live in this static publishing repository; fetch `.github/data/games.json` and `.github/data/steam-shots.json` into the corresponding source files before rebuilding locally, and preserve this repository's `.github` directory when publishing a new build.

Validation: `node --test .github/scripts/*.test.mjs`.
