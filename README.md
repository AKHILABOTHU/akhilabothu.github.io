# Akhil Abothu - Portfolio Website

A modern, responsive portfolio website built with Vue.js 3 and Vite.

## Features

- 🎨 Modern UI with dark mode support
- 📱 Fully responsive design
- 🚀 Fast performance with Vite
- ✉️ Contact form with EmailJS integration
- 🤖 Google reCAPTCHA integration
- 💼 Professional portfolio sections (About, Skills, Experience, Testimonials, Contact)

## Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icons
- **SweetAlert2** - Beautiful alerts
- **EmailJS** - Email service
- **Google reCAPTCHA** - Spam protection

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

### Manual Setup (if needed)

1. Go to your repository settings on GitHub
2. Navigate to **Pages** under **Settings**
3. Under **Source**, select **GitHub Actions**

### First Time Setup

```bash
# Initialize git (if not already done)
git init

# Add remote repository
git remote add origin git@github.com:AKHILABOTHU/akhilabothu.github.io.git

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Push to main branch
git push -u origin main
```

### Updating the Site

After making changes:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

GitHub Actions will automatically build and deploy your site.

## Project Structure

```
├── public/           # Static assets
├── src/
│   ├── assets/      # Images, data files
│   ├── components/  # Vue components
│   ├── App.vue      # Root component
│   ├── main.js      # Entry point
│   └── style.css    # Global styles
├── .github/
│   └── workflows/   # GitHub Actions
└── vite.config.js   # Vite configuration
```

## Components

- **Navigation** - Top navigation bar with dark mode toggle
- **Hero** - Hero section with profile image and intro
- **About** - About section with professional journey
- **Skills** - Skills section with progress bars
- **Experience** - Work experience timeline
- **Testimonials** - Client testimonials carousel
- **Contact** - Contact form with validation
- **Footer** - Footer with copyright info

## Configuration

### EmailJS Setup

Update the EmailJS configuration in `src/App.vue`:
- Service ID: `service_mg3q0ne`
- Template ID: `template_929eyue`
- Public Key: `lmtctuRbX4cLaf5JL`

### reCAPTCHA Setup

- Development: Uses Google's test key (always passes)
- Production: Uses your production key in `src/components/Contact.vue`

## License

This project is private and proprietary.

## Contact

- **Email**: abothuakhil@gmail.com
- **LinkedIn**: [akhil-abothu](https://www.linkedin.com/in/akhil-abothu/)
- **GitHub**: [AKHILABOTHU](https://github.com/AKHILABOTHU/)
