# GitHub Pages Deployment Instructions

## Enable GitHub Pages

1. Go to your GitHub repository: https://github.com/lifeplus1/AET
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

## Your Site Will Be Available At:
**https://lifeplus1.github.io/AET**

## Next Steps After GitHub Pages Is Enabled

### 1. Update Your Site URL
Once GitHub Pages is active, update `_config.yml`:
```yaml
url: "https://lifeplus1.github.io"
baseurl: "/AET"
```

### 2. Set Up Google Analytics (Optional)
1. Create a Google Analytics account at https://analytics.google.com
2. Get your Measurement ID (starts with G-)
3. Replace `GA_MEASUREMENT_ID` in `_layouts/default.html` with your actual ID

### 3. Test Your Site
After deployment (takes 5-10 minutes):
- Visit your site at the URL above
- Test all navigation links
- Verify the store "Add to Cart" buttons work (they'll open Snipcart)
- Test the contact form (messages will go to your Formspree inbox)

## Current Setup Status ✅

### Completed Features:
- ✅ **Snipcart E-commerce**: Integrated with your API key `N2RhMDVhYzItNjlhYS00ZDhkLWE2NzEtYjdlYTNlNWVjM2E1NjM4OTIxMzA5ODkzODI1NDE0`
- ✅ **Formspree Contact Form**: Connected to `https://formspree.io/f/mvgbkdej`
- ✅ **Blog with Search & Filtering**: Full-featured blog with 4 posts
- ✅ **Responsive Design**: Works on mobile, tablet, and desktop
- ✅ **SEO Optimized**: Meta tags, sitemap, and proper structure
- ✅ **Store Pages**: Product pages with working add-to-cart functionality

### Blog Posts Included:
1. **The Casimir Effect** (Quantum Phenomena)
2. **Rodin Coils: Practical Applications** (Energy Technologies)
3. **Understanding the Tesla Coil** (Historical Discoveries)
4. **Zero-Point Energy Devices** (Quantum Phenomena)

### Store Products Ready:
- **Rodin Coil** ($50) - Full product page with Snipcart integration
- Store home with categories for Crystals, Jewelry, and Ascension Tools

## Customization Tips

### Adding More Blog Posts
1. Create new `.md` files in `_posts/` folder
2. Use format: `YYYY-MM-DD-title.md`
3. Include proper front matter with layout, title, date, and category

### Adding More Products
1. Create new `.md` files in `store/` folder
2. Include Snipcart button code for each product
3. Link products to relevant blog posts

### Disqus Comments (Optional)
If you want to add comments to blog posts:
1. Sign up at https://disqus.com
2. Create a site with shortname "ascensionenergytech"
3. Comments are already configured in the post layout

## Site Performance
- **Fast Loading**: Static Jekyll site loads quickly
- **Mobile Optimized**: Responsive design works on all devices
- **Search Friendly**: SEO optimized for better discoverability

Your Ascension Energy Technologies website is now fully functional and ready for visitors!
