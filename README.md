# Universal Video Repo Builder

## What is this
Pure function video renderer: HTML+CSS+JS+SVG -> Playwright screenshots -> FFmpeg.
Works for ANY timestamps.txt and assets, phone-only via GitHub web UI.

## File map
Root: index-infographic.html (9:16 shell), index-podcast.html (16:9 shell), render.js (entry), package.json, timestamps.txt
config/project.json - detected values (theme, brandName, language, colors, fonts, logo, storeTarget, greeting, host, endPad). Set fields to "auto" to re-detect at runtime.
config/scenes.json - optional per-line design overrides (match first 20 chars, type, items, numbers, icons). Delete to use auto classifier.
tools/env.js - env parsing (THEME, WIDTH, FPS, OUT, START, END, AUDIO_VOLUME, END_PAD, AUDIO_FADE_OUT)
tools/browser.js - Playwright page setup, init, fit
tools/encoder.js - FFmpeg spawn with backpressure
tools/audio.js - ffprobe duration + envelope analysis (mono 22050Hz RMS per frame, 95th perc norm, attack 0.6 release 0.18)
tools/assets.js - finds logo, badge, audio, host ref by filename/extension, builds logoData data URL
tools/fonts.js - font checks
tools/check-repo.js - static checks: emoji, duplicate ids, forbidden APIs, hard-coded text
tools/test-seek.js - stub DOM seek test
tools/test-duration.js - duration and tail tests
src/common/tokens.css - CSS variables, @font-face (SolaimanLipi, Noto)
src/common/easing.js - easeOut, easeInOut, easeBack, prog, clamp
src/common/detect.js - script/lang/direction detection
src/common/palette.js - palette derivation from logoData (deterministic)
src/common/parse.js - timestamps parsing (|, BOM, CRLF, markers ❝❞, overlap trim)
src/common/timeline.js - total = max(audio+END_PAD, last+0.5), hold last scene
src/common/text-segment.js - Intl.Segmenter words/graphemes
src/common/numbers.js - digit conversion (Bengali/Latin), lakh grouping
src/common/numbers-lang.js - DATA: number words per language
src/common/keywords.js - DATA: greetings, store, closing, separators per language
src/common/classify.js - greeting > store > closing > brand > cards > numbers > card
src/common/icons-core.js - ornaments UI symbols (star8, diamond, floral, knot, play-arrow)
src/common/icons-topic.js - 79 original SVG symbols (crescent, mosque, dome, minaret, cube-shrine, compass, prayer-beads, clock, sun, moon, lantern, star8, floral, diamond, knot, book, open-book, library-shelf, scroll, pen, magnifier, phone, download-arrow, globe, heart, open-hand, microphone, headphones, speaker, play-arrow, video-frame, document, list, grid, bookmark, name-tag, map-pin, shield, ring-check, lightbulb, gear, bell, calendar, bar-chart, share, link, house, key, leaf, water-drop, flame, tree, mountain, cloud, wifi, battery, lock, envelope, chat-bubble, camera, music-note, cart, wallet, coin, trophy, medal, graduation-cap, rocket, wrench, truck, building, plus-badge, line-chart, target, puzzle, clipboard, folder, qr-code, hourglass)
src/common/icon-map.js - DATA: keywords per icon English+Bengali
src/common/icon-assign.js - unique assignment tracker
src/common/audio-level.js - setAudio, level(t) with fallback synth
src/common/background.js - star pattern, glow, particles, progress
src/common/caption.js - karaoke words, panel border --ang = t*90deg, equalizer, fit()
src/common/logo.js - single logo element transformed
src/common/store-badge.js - official badge usage, neutral button fallback, tap ripple
src/common/scenes.js - scene builders (cards, numbers, greeting, brand, closing), count-up, stagger
src/common/layout-fit.js - uniform scale to fit visual area min 0.6
src/theme-a/layout.css, logo-motion.js, main.js - 1080x1920 infographic layout
src/theme-b/layout.css, studio.js, logo-motion.js, main.js - 1920x1080 podcast layout with studio screen, desk, ON AIR
src/theme-b/host/host-config.js - ONLY look values from project.json
src/theme-b/host/host-svg.js - original flat SVG host (head, eyes, eyelids, pupils, eyebrows, mouth, torso, arms, headphones, mic)
src/theme-b/host/host-anim.js - deterministic anim: mouth = word timing * lv, blink sine, head sway, arm gesture = sp*wave*lv
assets/ - user assets (logo, badge, audio, host ref, fonts) never overwritten

## Host look
Edit config/project.json host {skin, hair, beard, glasses, cap, clothes, stripes, headphones, mic, faceless}

## Store badge legal
Never draw/imitate Google Play/App Store badges. Upload official badge from https://developer.android.com/distribute/tools/promote/badges to assets/. If missing, neutral button shown.

## Audio ending
total = max(audioDuration+END_PAD, lastEnd+0.5). Audio plays once, never loops, padded with apad silence. Last scene holds visible to total, mouth goes idle after original end, level 0 after audio ends.

## Fonts
Bengali with no TTF -> workflow downloads SolaimanLipi from fonts.maateen.me. Upload manually if fails to assets/fonts/. Latin Noto Serif, Arabic Noto Naskh Arabic.

## Phone steps
1 Create new public repo on GitHub app.
2 Upload all files via web UI: Add file -> Upload files, type full path like src/theme-b/host/host-config.js to create folders.
3 Upload your assets to assets/: logo.png, google-play-badge.png, optional audio.mp3, body.jpg as host ref, fonts if any.
4 Replace timestamps.txt with your script.
5 Actions tab -> Render Video -> Run workflow -> choose theme podcast/infographic/both, quality preview then full.
6 Download artifact video.

## Another video
Replace timestamps.txt and assets, set config/project.json fields to "auto" if you want re-detect, delete config/scenes.json to auto classify, run workflow again.

## Icons
All icons original inline SVG <symbol> id ic-name, single <defs>, used via <use>. No emoji anywhere. No duplicate vectors: check-repo scans duplicate ids and geometry.
