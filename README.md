# trekker-hub.github.io

Personal website for Tariq Aldalou — computer engineer working on FPGA, embedded systems, and formal verification. Published at https://trekker-hub.github.io.

Plain HTML, CSS, and JavaScript. No framework, build step, or installed dependencies.

## Website files

- `index.html`: short introduction and up to two published, featured projects.
- `projects.html`: all published projects, in their configured order.
- `project.html?id=cubesat`: an individual project's full write-up.
- `about.html`: biography, experience, education, skills, awards, and timeline.
- `content.js`: editable website content.
- `app.js` and `style.css`: rendering, navigation, and appearance.
- `images/`: project photos and diagrams.
- `resume.pdf`: public resume.
- `404.html`: page-not-found fallback.

## Editing

The visual editor and development tools are maintained separately in the private `website-tools` folder/repository. They are not required to run the public website.

Open that folder's `editor.html` in desktop Chrome or Edge, then select this website folder with **Open Project Folder**. Edit, preview, and save. The editor writes changes into this website folder, even though the editor itself lives elsewhere.

To publish, review the website changes in GitHub Desktop, commit them, and push to the branch configured for GitHub Pages. Check the deployment on GitHub before assuming the changes are live.

## Local preview

From the separate tools folder, run:

```text
node preview-server.cjs "path/to/trekker-hub.github.io"
```

Then visit http://127.0.0.1:4173/. The editor is available at http://127.0.0.1:4173/tools/editor.html on this local server only.

## Files that stay local

`.gitignore` excludes editor backups, dependencies, temporary previews, the repository-link spreadsheet, and accidental copies of the tools. Keep the tools backed up in their own **private** repository.

Project draft and link visibility switches only control display. All content in this public repository remains readable, including hidden entries in `content.js`.

When committing the tools separation, include the deletion of the previously tracked `editor.html` from this repository. Moving it out does not erase earlier copies from Git history; an older editor version may remain in public history.