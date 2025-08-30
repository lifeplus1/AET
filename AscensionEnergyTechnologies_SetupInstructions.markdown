# Instructions for Setting Up Ascension Energy Technologies Website with Jekyll in VS Code Using GitHub Copilot Chat

## Overview
This guide provides step-by-step instructions to build the *Ascension Energy Technologies* website, a static site with an educational blog and minimal webstore, using **Jekyll** in **Visual Studio Code** with **GitHub Copilot Chat**. The site aligns with your minimal-resource constraint, leveraging free hosting (GitHub Pages) and your existing Markdown files (e.g., sitemap, blog posts like `Casimir Effect Blog Post.md`, store pages like `AscensionEnergyTechnologies_StoreHome.md`). The setup includes dynamic features (search, comments, checkout) to boost profitability (store conversions) and impact (blog engagement/SEO). Copilot Chat will automate coding tasks via prompts, ensuring simplicity and a launch in 1-2 days.

## Prerequisites
Before starting, ensure you have:
- **VS Code**: Installed from [code.visualstudio.com](https://code.visualstudio.com).
- **Ruby**: Installed via [rubyinstaller.org](https://rubyinstaller.org) (Windows) or Homebrew (`brew install ruby`) (Mac).
- **Git**: Installed from [git-scm.com](https://git-scm.com).
- **GitHub Account**: Create a repository (e.g., `ascension-energy-tech`) on [github.com](https://github.com).
- **GitHub Copilot**: Enabled in VS Code (requires a GitHub account; free tier available).
- **Markdown Files**: Your provided files (e.g., `AscensionEnergyTechnologies_Sitemap_Updated.md`, `Casimir Effect Blog Post.md`, `AscensionEnergyTechnologies_StoreHome.md`, `AscensionEnergyTechnologies_SampleProductPage.md`, `AscensionEnergyTechnologies_HomePage.md`, `AscensionEnergyTechnologies_AboutPage.md`).

## Step-by-Step Instructions

### Step 1: Install Jekyll and Set Up the Project
1. **Open VS Code Terminal** (Ctrl+` or Cmd+`).
2. **Install Jekyll**:
   ```bash
   gem install jekyll bundler
   ```
3. **Create a new Jekyll site**:
   ```bash
   jekyll new ascension-site
   cd ascension-site
   ```
4. **Open in VS Code**:
   ```bash
   code .
   ```
5. **Customize `_config.yml`**:
   - Open Copilot Chat (Ctrl+Shift+P > "Copilot: Open Chat").
   - Prompt:
     ```
     Update _config.yml for a site titled "Ascension Energy Technologies" with baseurl "" and description "Educational blog on ascension energy technologies with a minimal store for crystals and tools". Add collections for blog posts and store pages.
     ```
   - Expected output (paste into `_config.yml`):
     ```yaml
     title: Ascension Energy Technologies
     description: Educational blog on ascension energy technologies with a minimal store for crystals and tools
     baseurl: ""
     url: ""
     collections:
       posts:
         output: true
       store:
         output: true
     ```
6. **Test locally**:
   ```bash
   bundle exec jekyll serve
   ```
   - Visit `http://localhost:4000` to preview.

### Step 2: Integrate Markdown Files
Your Markdown files (e.g., blog posts, store pages) are ready for Jekyll.

1. **Create Folders**:
   - In VS Code Explorer, create:
     - `_posts` (for blog posts).
     - `store` (for product pages).
     - `assets` (subfolders: `css`, `js`, `images`).

2. **Add Blog Posts**:
   - Copy `Casimir Effect Blog Post.md` to `_posts` as `2025-08-18-casimir-effect.md`.
   - Prompt Copilot:
     ```
     Add Jekyll front matter to this Markdown file for a blog post: [Paste content of Casimir Effect Blog Post.md]. Include layout: post, title: "The Casimir Effect: Unveiling the Energy of the Quantum Vacuum", date: 2025-08-18, category: Quantum Phenomena.
     ```
   - Expected output (add to file):
     ```yaml
     ---
     layout: post
     title: "The Casimir Effect: Unveiling the Energy of the Quantum Vacuum"
     date: 2025-08-18
     category: Quantum Phenomena
     ---
     [Original Markdown content]
     ```
   - Repeat for other blog posts (e.g., Tesla Coil, Rodin Coils).

3. **Add Store Pages**:
   - Convert `AscensionEnergyTechnologies_StoreHome.md` to `store/index.md`.
   - Prompt:
     ```
     Convert this Markdown to a Jekyll page for the store home: [Paste AscensionEnergyTechnologies_StoreHome.md]. Add links to product pages like /store/rodin-coil and embed a PayPal button for a sample product.
     ```
   - Convert `AscensionEnergyTechnologies_SampleProductPage.md` to `store/rodin-coil.md`. Prompt:
     ```
     Generate a Jekyll Markdown page for a product called Rodin Coil, using this content: [Paste SampleProductPage.md]. Include a Snipcart add-to-cart button with price $50 and link to the blog post /blog/rodin-coils.
     ```
   - Expected output:
     ```markdown
     ---
     layout: page
     title: Rodin Coil
     ---
     <div class="product">
       <h1>Rodin Coil</h1>
       <p>Explore toroidal energy with this Vortex-Based Mathematics-inspired coil.</p>
       <button class="snipcart-add-item"
         data-item-id="rodin-coil"
         data-item-price="50.00"
         data-item-url="/store/rodin-coil"
         data-item-name="Rodin Coil">
         Add to Cart
       </button>
       <a href="/blog/rodin-coils">Learn More</a>
     </div>
     ```

4. **Add Homepage and About**:
   - Convert `AscensionEnergyTechnologies_HomePage.md` to `index.md`. Prompt:
     ```
     Turn this Markdown into Jekyll's index.md homepage: [Paste AscensionEnergyTechnologies_HomePage.md]. Add featured blog teasers and store highlights with links.
     ```
   - Convert `AscensionEnergyTechnologies_AboutPage.md` to `about.md`. Prompt:
     ```
     Create an about.md page from this content: [Paste AscensionEnergyTechnologies_AboutPage.md]. Use layout: page.
     ```

5. **Add Contact Page**:
   - Create `contact.md`. Prompt:
     ```
     Generate a contact.md page with a simple HTML form (name, email, message) and layout: page.
     ```
   - Expected output:
     ```markdown
     ---
     layout: page
     title: Contact Us
     ---
     <form action="https://formspree.io/f/your-form-id" method="POST">
       <label>Name: <input type="text" name="name"></label>
       <label>Email: <input type="email" name="email"></label>
       <label>Message: <textarea name="message"></textarea></label>
       <button type="submit">Send</button>
     </form>
     ```
   - Sign up for a free Formspree account to get `your-form-id`.

### Step 3: Create Layouts and Navigation
Use the sitemap (`AscensionEnergyTechnologies_Sitemap_Updated.md`) for structure.

1. **Default Layout**:
   - Prompt:
     ```
     Generate a default.html layout for Jekyll based on this sitemap: [Paste AscensionEnergyTechnologies_Sitemap_Updated.md]. Include a header with navigation links (Home, Blog, Store, About, Contact) and a footer with copyright.
     ```
   - Expected output (save in `_layouts/default.html`):
     ```html
     <!DOCTYPE html>
     <html>
     <head>
       <title>{{ page.title }}</title>
       <link rel="stylesheet" href="/assets/css/style.css">
     </head>
     <body>
       <header>
         <nav>
           <a href="/">Home</a>
           <a href="/blog">Blog</a>
           <a href="/store">Store</a>
           <a href="/about">About</a>
           <a href="/contact">Contact</a>
         </nav>
       </header>
       <main>
         {{ content }}
       </main>
       <footer>
         <p>Ascension Energy Technologies &copy; 2025</p>
       </footer>
     </body>
     </html>
     ```

2. **Post Layout**:
   - Prompt:
     ```
     Create a post.html layout that renders the blog content and adds a link to the store: "Explore related tools in our Store".
     ```
   - Save in `_layouts/post.html`.

3. **Blog Index**:
   - Create `blog/index.md`. Prompt:
     ```
     Generate a blog/index.md page listing all posts in _posts with links to their pages and a category filter for Quantum Phenomena.
     ```

### Step 4: Add Styling
1. **Create CSS**:
   - Prompt:
     ```
     Generate a basic CSS file in assets/css/style.css for a clean, mobile-friendly design: white background, sans-serif fonts, grid for store items, and responsive navigation.
     ```
   - Expected output (save in `assets/css/style.css`):
     ```css
     body {
       font-family: Arial, sans-serif;
       background: white;
       margin: 0;
     }
     nav {
       display: flex;
       justify-content: space-around;
       padding: 1em;
       background: #f0f0f0;
     }
     .product {
       display: grid;
       grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
       gap: 1em;
       padding: 1em;
     }
     @media (max-width: 600px) {
       nav { flex-direction: column; }
     }
     ```

2. **Link CSS** in `_config.yml`:
   ```yaml
   defaults:
     - scope:
         path: ""
       values:
         layout: default
     - scope:
         path: "_posts"
       values:
         layout: post
   ```

### Step 5: Add Dynamic Features
Enhance profitability and impact with lightweight JavaScript.

1. **Search Feature (lunr.js)**:
   - Prompt:
     ```
     Add a search bar to blog/index.html using lunr.js. Generate the JavaScript code and index all posts in _posts.
     ```
   - Save script in `assets/js/search.js` and link in `blog/index.md`.
   - Install lunr.js: Add `<script src="https://unpkg.com/lunr/lunr.js"></script>`.

2. **Comments (Disqus)**:
   - Sign up at [disqus.com](https://disqus.com) (free, shortname: `ascensionenergytech`).
   - Prompt:
     ```
     Add Disqus comments to post.html layout. My Disqus shortname is "ascensionenergytech". Generate the script.
     ```
   - Add to `_layouts/post.html`.

3. **Store Cart (Snipcart)**:
   - Sign up at [snipcart.com](https://snipcart.com) (free for low volume, ~2% transaction fee).
   - Prompt:
     ```
     Integrate Snipcart into default.html. Add the script tag and configure buttons for products like Rodin Coil with price and description.
     ```
   - Expected output (add to `default.html`):
     ```html
     <script src="https://cdn.snipcart.com/themes/v3.3.0/default/snipcart.js"></script>
     <div hidden id="snipcart" data-api-key="YOUR_SNIPCART_API_KEY"></div>
     ```

4. **Analytics (Google Analytics)**:
   - Sign up at [analytics.google.com](https://analytics.google.com) for a tracking ID.
   - Prompt:
     ```
     Add Google Analytics script to default.html. My tracking ID is UA-XXXXX-X.
     ```

### Step 6: Optimize Development with Copilot Chat
Maximize efficiency using Copilot Chat:
- **Clear Prompts**: Include your files in prompts (e.g., "Use this sitemap: [paste AscensionEnergyTechnologies_Sitemap_Updated.md]").
- **Iterate**: Test locally (`bundle exec jekyll serve`) and prompt for fixes: "Fix this Jekyll error: [paste error]".
- **VS Code Extensions**:
   - Prompt: "Recommend VS Code extensions for Jekyll development."
   - Suggested: "Jekyll" (syntax), "Markdown All in One" (previews), "GitLens" (version control).
- **Version Control**: Prompt: "Generate a .gitignore for a Jekyll site."
   - Expected: Ignore `_site`, `Gemfile.lock`, etc.
- **SEO**: Prompt: "Add meta tags to default.html for SEO: title, description, and keywords like 'ascension energy technologies, Rodin Coils'."
- **Performance**: Prompt: "Suggest ways to optimize Jekyll build times and site performance for a blog with 20+ posts."
- **Testing**: Prompt: "Generate a checklist for testing a Jekyll site: links, images, store buttons."

### Step 7: Deploy and Test
1. **Build Site**:
   ```bash
   bundle exec jekyll build
   ```

2. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial Ascension site"
   git remote add origin https://github.com/yourusername/ascension-energy-tech.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - In GitHub, go to repo Settings > Pages > Source: main branch, root folder.
   - Prompt Copilot: "How do I add a custom domain to GitHub Pages?"

4. **Test Live Site**:
   - Visit `username.github.io/ascension-energy-tech`.
   - Check links, store buttons, and blog rendering.
   - Prompt: "How do I debug broken links in a Jekyll site?"

### Step 8: Additional Optimizations
- **Image Handling**: Store placeholder images for products (e.g., Rodin Coil) in `assets/images`. Prompt: "Generate HTML for a product image with alt text in store/rodin-coil.md."
- **Cross-Promotion**: Add a footer link to a future biohacking site. Prompt: "Add a footer link in default.html to a sister site called Biohacking Breakthroughs."
- **Profitability**: Monitor Snipcart analytics for store conversions. Prompt: "How do I track store clicks with Google Analytics?"
- **Impact**: Add social sharing buttons. Prompt: "Add social share buttons for Twitter and Facebook to post.html."

### Notes
- **Profitability**: Snipcart’s checkout supports quick sales (1-3% conversion, ~$300-1,500/month initially). Links from blogs to store (e.g., Rodin Coils) drive traffic.<grok:render type="render_inline_citation">
<argument name="citation_id">15</argument>
</grok:render>
- **Impact**: Fast load times (Jekyll’s strength) boost SEO, increasing blog reach by 20-30%.<grok:render type="render_inline_citation">
<argument name="citation_id">18</argument>
</grok:render> Disqus comments and search enhance engagement.
- **Troubleshooting**: If errors occur, prompt Copilot: "Fix this Jekyll error: [paste error]." Example issues: invalid YAML, missing dependencies.
- **Resources**: Use [jekyllrb.com](https://jekyllrb.com) for docs, [snipcart.com](https://snipcart.com) for e-commerce, [disqus.com](https://disqus.com) for comments.

This setup ensures a simple, educational site with a functional store, launched quickly using Copilot Chat. Save this file in your project root for reference. Let me know if you need specific code snippets, additional blog posts, or help with a biohacking site later!