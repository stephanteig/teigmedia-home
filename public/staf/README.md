# STAF Films — test site

Subpage of teigmedia.com (repo `stephanteig/teigmedia-home`, folder `public/staf/`) that runs the full STAF Films site as if it had its own domain.
Live: https://teigmedia.com/staf/

Files in `public/` are copied to the build unchanged by Vite, so these pages need no build step of their own.

## Structure

```
staf/
  index.html                         Home: showreel hero (opener in full, then a segment of each film → end card → single film) + sections
  work/                              All work
  films/the-king-in-yellow/          Film page (in development)
  films/et-ekko-av-henne/            Film page (completed)
  films/cut/                         CUT! Glemmen Filmfestival (event, not a STAF film)
  journal/, journal/00-introduction/ Development journal
  about/, about/stephan/, about/aron/
  contact/, press/, privacy/
  assets/css/staf.css                Fonts, hover/focus states, hero, small-screen overrides
  assets/js/staf.js                  Video loading, hero player, phone menu, contact mailto
  assets/fonts/                      Alte Haas Grotesk Bold (woff2)
  assets/img/                        All images and logos (webp/png/svg)
  assets/videos.json                 Video key → web cut in assets/video/ (+ Drive archive ID)
  assets/video/                      Web cuts of the videos (H.264, small)
```

Plain HTML/CSS/JS, no build step. Page layout lives inline in each page; shared rules are in `staf.css`.
All internal links are absolute and start with `/staf/`.

## Brand

Ink `#111310` · Snow `#F4F3ED` · Paper `#E6E4DA` · King Yellow `#C8A83E` (used only for The King in Yellow).
Display: Alte Haas Grotesk Bold. Body: Inter. Labels: IBM Plex Mono.

## Videos (small web cuts in GitHub, masters in Drive)

The site plays short, compressed web cuts from `assets/video/` (about 4.4 MB for all six).
Google Drive cannot be the player: it answers 403 to any video request that comes from another website.
Drive is the archive: the same files live in `02_Film & Media/STAF Films/Nettside-video`
(https://drive.google.com/drive/folders/1sZTA21bOHk2YW24mdL1dC34_xc0kKd9w), and full-quality masters stay there only.

`assets/videos.json` maps each key to its web cut (`src`) and the Drive copy (`drive_id`). To add or swap a video:

1. Export an H.264 MP4 web cut (not HEVC/MOV), ideally under 3 MB, with `-movflags +faststart`.
2. Put it in `assets/video/` and upload the same file to the Drive folder.
3. Update `src` and `drive_id` in `videos.json`.

A key without a `src` shows its poster image, so the page never looks broken.

## Moving to its own domain

1. Copy `staf/` to the root of the new repo/host.
2. Replace every `/staf/` with `/` in the `.html`, `.css`, `.js` files.
3. Update the `og:image` URL and remove `<meta name="robots" content="noindex,nofollow">` when it should be public.
