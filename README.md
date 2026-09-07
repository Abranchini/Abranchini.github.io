# Abranchini.github.io

Live at <https://abranchini.github.io>. GitHub Pages serves the root of `master`.

This repo is the **built site**, not Hugo source — there is no build step. Edit the HTML, commit, done.
Don't run `hugo`.

## Preview / publish

```bash
python3 -m http.server 8000     # http://localhost:8000, hard-refresh after edits
git add -A && git commit -m "..." && git push origin master
```

Undo a push: `git revert <sha> && git push`.

---

## File map

| File | Holds |
| --- | --- |
| `index.html` | The whole homepage |
| `css/custom.css` | **Every style you own.** Numbered sections 1–14 |
| `js/phd-scene.js` | The animated scene on the PhD card |
| `js/custom.js` | Publication tag filtering |
| `css/academic.css`, `js/academic.min.*` | Theme output — **don't edit** |
| `files/cv.pdf` | Your CV |
| `authors/admin/index.html` | Author page (duplicate of the bio) |
| `index.json` | Search index |
| `publication/<slug>/index.html` | One publication's own page |
| `project/<slug>/index.html` | One project's own page |
| `images/`, `img/` | Images |

`css/custom.css` sections: 1 palette · 2 (empty) · 3 section headings · 4 cards ·
5 publication grid · 6 small fixes · 7 8-bit layer · 8 background · 9 navbar/CV/contact ·
10 video cards · 11 nested windows · 12 scene panel + publication groups · 13 tags + filter ·
14 motif icons · 15 scene overlay (buttons, equation, slider) · 16 filter pill colours

---

## Where to change what

### Profile block (top of `index.html`)

| Thing | Search for |
| --- | --- |
| Name | `<h2>Pedro Abranches` |
| Role line | `<h3>Postdoc CHUV` |
| Email | `email-obfuscated` |
| Photo | replace `authors/admin/avatar.jpg` |
| Social icons | `<ul class="network-icon"` |
| CV badge | `cv-icon` |
| DNA/chip/sensor/net icons | `<ul class="motif-icons"` |
| Bio text | `<div style="text-align: justify">` |
| Interests | `ul-interests` |
| Education | `ul-edu` |

Change the bio and you must also update `authors/admin/index.html`, `index.json`, and the
`description` / `og:description` meta tags in `index.html`.

### Navbar

`index.html`, search `navbar-content`. One `<li class="nav-item">` per link.

### The PhD scene

`js/phd-scene.js`:

| Thing | Where |
| --- | --- |
| Number of curves | `N_CURVES` |
| Starting lengthscales | `ELL` |
| Slider ranges | `ELL_RANGE` |
| Periodic period | the `0.30` in the `KERNELS` loop |
| Rotation speed | the `0.008` in `loop()` |
| Globe position / size | `W * 0.755` and `0.44` in `drawGlobe` |
| Cities | `CITIES` — `[lat, lon]` pairs |
| Coastline points | `COAST` — don't hand-edit |
| Colours | `PANEL`, `COAST_RGB`, `CITY_RGB`, `GP_RGB` |

Equations are HTML in `index.html`, search `scene-eq`. Buttons and slider: `scene-ui`
(styling in `css/custom.css` §15).

To use a **static image instead**, replace the `<canvas>` inside `<div class="card-image scene-image">`
with `<img src="/images/yourfile.png" class="img-responsive">` and drop the
`<script src="/js/phd-scene.js">` tag.

### Add a work project

In `index.html`, inside `<section id="work">`, copy a whole
`<div class="project-card project-item isotope-item pj-wide">` block.

Its parts:
- image → `<div class="card-image scene-image">` (swap for an `<img>`)
- title → `<h4>`
- description → `<div class="article-style">`
- the small nested windows → `<div class="win-grid">`

One nested window:

```html
<div class="win8">
  <div class="win8-bar">
    <span class="win8-title">TITLE</span>
    <span class="win8-btns" aria-hidden="true"><i></i><i></i><i></i></span>
  </div>
  <a class="win8-body" href="LINK" target="_blank" rel="noopener">
    <img src="THUMB" alt="">
    <span class="win8-caption"><strong>LEAD.</strong> Text.</span>
  </a>
</div>
```

For a YouTube window: `LINK` = `https://www.youtube.com/watch?v=ID`,
`THUMB` = `https://img.youtube.com/vi/ID/hqdefault.jpg`.

Section label: search `win-grid-label`.

### Add a personal project

In `<section id="personal">`, copy a `<div class="project-card project-item isotope-item">` block.
Give it `js-id-<Tag>` in the class to make the filter buttons above it work, and add a matching
`<a data-filter=".js-id-<Tag>">` in `project-filters`.

With a picture, put the file in `project/<slug>/` and add above `.card-text`:

```html
<a href="LINK" class="card-image hover-overlay">
  <img src="/project/<slug>/featured.jpg" alt="" class="img-responsive">
</a>
```

### Add a publication

In `<section id="publications">`.

**Highlighted** — copy a `<div class="media stream-item">` block inside `<div class="pub-grid">`.
Optional thumbnail is the trailing `<div class="ml-3">`.

**Other** — copy an `<li>` inside `<ul class="pub-rows">`:

```html
<li data-tags="neurotech ml">
  <div class="pub-row-title"><a href="LINK" target="_blank" rel="noopener">TITLE</a></div>
  <div class="pub-row-authors">Authors</div>
  <div class="pub-row-venue">Venue &middot; <a href="LINK">Label</a></div>
  <div class="pub-tags"><span class="pub-tag pub-tag-neurotech">Neurotech</span></div>
</li>
```

Tag keys in use: `ml`, `bio`, `neurotech`.

**A new tag** needs three edits:
1. add the key to that row's `data-tags`
2. add a button in `<div class="pub-filters">`: `<a href="#" data-pubfilter="KEY" class="btn btn-primary btn-lg">Label</a>`
3. add a colour in `css/custom.css` §13: `.pub-tag-KEY { color: #hex; }`, and a fill rule in §16
   copied from an existing one

Add a full publication page: copy a `publication/<slug>/` folder, then also add it to
`publication/index.html` and `index.json`.

### Background

`css/custom.css` §8.

| Thing | Change |
| --- | --- |
| Grid spacing | the `32px` values |
| Where blue fades out | the `34%` |
| Blue colour / strength | `#268199` / `#3f9dbd` and the opacity |
| Which cells are blue | the `d='...'` path inside the data URI |

### Colours generally

`css/custom.css` §1 — CSS variables. `--accent` drives links, borders and hovers.
Dark-mode values are in the `body.dark` block. **The site has light and dark modes; check both.**

---

## Don't

- Edit `css/academic.css` or anything in `js/academic.min.*`
- Rename folders — the paths are the public URLs
- Shorten the long `.pub-filters .btn-toolbar .btn.btn-primary[...]` selectors in §16
- Change `body#top` to `body` in §8
- Move `.navbar-collapse` in §9 out of its media query

Each of those has a comment in the CSS saying why.

## Notes

- `admin/` is dead (unused Netlify CMS config), safe to delete
- `post/`, `talk/`, `categories/` are empty listing pages, not linked from the navbar
- `legacy-static-backup` branch is an old snapshot
