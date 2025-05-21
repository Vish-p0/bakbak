# Anniversary Website

A sweet, romantic, and interactive anniversary website to surprise your loved one. This website includes multiple sections like a timeline of your relationship, photo gallery, love letters, interactive quiz, compliment generator, and more.

## Features

- 💖 Beautiful landing page with a full-screen cover image and pink overlay
- 📖 Interactive timeline of your relationship milestones
- 📸 Polaroid-style photo gallery with lightbox effect
- 💌 Animated love letters section
- 🎵 Music section for "your song"
- 🧩 Fun relationship quiz with interactive feedback
- 🌈 Random compliment generator with heart animations
- ⏳ Real-time counter showing how long you've been together
- 🎁 Virtual gift boxes with surprise reveals
- 💕 Special "sad day" page with uplifting content and virtual hugs

## How to Customize

### Basic Customization

1. **Images**:
   - Replace placeholder images in `assets/images/` with your own photos
   - For the hero background, replace `assets/images/hero-bg.jpg`
   - For gallery photos, add your images and update the src paths in `index.html`
   - For memes on the "sad day" page, add funny images to `assets/images/meme1.jpg` etc.

2. **Text and Dates**:
   - In `index.html`, update all text in square brackets `[Date]`, `[Place]`, etc.
   - Edit all placeholder text in the timeline, letters, and other sections
   - Update the anniversary start date in `js/script.js` (look for `const startDate = new Date('2023-06-15T00:00:00');`)

3. **Quiz**:
   - Customize the quiz questions and answers in the quiz section of `index.html`
   - Make sure to set `data-correct="true"` for the correct answer options

4. **Embedded Song**:
   - Replace `REPLACE_WITH_SPOTIFY_TRACK_ID` in the iframe src with your chosen song ID from Spotify
   - Or use another embed method from YouTube, SoundCloud, etc.

5. **Contact Information**:
   - Update the phone number in the "sad day" page's contact links

### Advanced Customization

1. **Colors**:
   - Edit the color scheme in the `:root` variables in `css/style.css`
   - The primary colors are `--primary-color` (light pink) and `--primary-dark` (darker pink)

2. **Fonts**:
   - The site uses "Dancing Script" for headings and "Montserrat" for body text
   - To change fonts, update the Google Fonts link in the `<head>` and corresponding font-family in CSS

3. **Compliments**:
   - Add or edit the compliments in the `compliments` array in `js/script.js`

4. **Layout & Structure**:
   - The website uses a section-based layout that you can rearrange or remove as needed
   - Each section has a clear comment in the HTML for easy identification

## Technical Information

- Built with vanilla HTML, CSS, and JavaScript (no frameworks)
- Uses ScrollReveal.js for scroll animations
- Responsive design that works on both desktop and mobile devices
- All animations and interactivity are handled with JavaScript

## Local Development

1. Clone this repository
2. Open `index.html` in your browser to view the site
3. Make your customizations in the HTML, CSS, and JavaScript files
4. Test thoroughly across different devices and browsers

## Deployment

You can deploy this website using any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- Amazon S3
- Any standard web hosting service

Simply upload all the files maintaining the directory structure, and the site will work.

---

Made with ❤️ for that special someone 