# WALABI Website

This repository contains the website for WALABI - Wageningen Lab for Agri-Food Business Informatics and other relevant information

## Project Structure

```
/
├── index.html         # Main English page
├── index-nl.html      # Dutch version of the main page
├── header.html        # Header component
├── footer.html        # Footer component
├── styles.css         # Stylesheet
├── script.js          # JavaScript functionality
├── images/            # Image directory
│   └── walabi-logo.png  # Logo file
└── README.md          # This file
```

## Setup Instructions for GitHub Pages

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account.
2. Click on the "+" icon in the top right corner and select "New repository".
3. Name your repository (e.g., "walabi-website").
4. Make sure it's set to "Public".
5. Click "Create repository".

### 2. Upload Files

#### Option 1: Using GitHub Web Interface

1. Navigate to your newly created repository.
2. Click the "Add file" button and select "Upload files".
3. Drag and drop or select all the website files from your local directory.
4. Add a commit message (e.g., "Initial website upload").
5. Click "Commit changes".

#### Option 2: Using Git Command Line

1. Open a terminal/command prompt.
2. Navigate to your local website directory.
3. Initialize Git repository:
   ```
   git init
   ```
4. Add remote repository:
   ```
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   ```
5. Add all files:
   ```
   git add .
   ```
6. Commit files:
   ```
   git commit -m "Initial website upload"
   ```
7. Push to GitHub:
   ```
   git push -u origin main
   ```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click "Settings" (tab near the top).
3. Scroll down to the "GitHub Pages" section.
4. Under "Source", select "main" branch.
5. Click "Save".
6. After a few minutes, your site will be published at: `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

### 4. Add Logo

1. Create an "images" folder in your repository if it doesn't exist.
2. Upload the WALABI logo (walabi-logo.png) to this folder.
3. Make sure the image paths in your HTML files point to "images/walabi-logo.png".

## Customization

- **Colors**: Edit the CSS variables in the `:root` selector in `styles.css` to match the WALABI color scheme.
- **Content**: Replace the lorem ipsum text with actual content about WALABI's themes and track record.
- **Additional pages**: Create new HTML files for additional pages as needed.

## Language Switching

The website includes built-in language switching between English and Dutch versions. The language preference is saved in the browser's local storage.

## Responsive Design

The website is responsive and works on mobile, tablet, and desktop devices. The menu automatically converts to a mobile-friendly menu on smaller screens.

## Browser Compatibility

The website is compatible with modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Local Development

To run the website locally:

1. Clone the repository to your local machine.
2. Open the folder in your code editor.
3. Due to CORS restrictions, you'll need to run a local server to properly load the header and footer components.
   
   You can use the Live Server extension in Visual Studio Code or run:
   ```
   npx serve
   ```
   if you have Node.js installed.

4. Open the browser and navigate to the localhost URL provided by your local server.
