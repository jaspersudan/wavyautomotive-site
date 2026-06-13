# GitHub Deployment Guide - Wavy Automotive Website

## 🚀 Quick Start: Deploy to GitHub Pages in 5 Minutes

### Step 1: Create GitHub Account (If you don't have one)
1. Go to https://github.com/signup
2. Create free account
3. Verify email

### Step 2: Create New Repository
1. Log in to GitHub
2. Click **+** (top right) → **New repository**
3. Repository name: `wavy-automotive` (or any name)
4. Description: "Wavy Automotive Inc - Professional Dealership Website"
5. Choose **Public** (so website is accessible)
6. Click **Create repository**

### Step 3: Upload Your Files
**Option A: Using GitHub Web Interface (Easiest)**

1. In your new repository, click **Add file** → **Upload files**
2. Drag and drop all files from `c:\Users\Jassi\Wavy Automotive Inc\` into the browser
3. Make sure to include:
   - `index.html`
   - `inventory.html`
   - `admin.html`
   - `css/` (all CSS files)
   - `js/` (all JavaScript files)
   - `assets/` (logos and images)
   - All markdown files
4. In the commit message box, type: "Initial commit: Wavy Automotive website"
5. Click **Commit changes**

**Option B: Using Git Command Line (Advanced)**

```bash
# Navigate to your project folder
cd "c:\Users\Jassi\Wavy Automotive Inc"

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Wavy Automotive website"

# Add remote repository (replace USERNAME and REPO with your info)
git remote add origin https://github.com/USERNAME/wavy-automotive.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under "Source", select **main branch**
5. Click **Save**
6. Wait 1-2 minutes
7. Your site will be available at: `https://USERNAME.github.io/wavy-automotive`

### Step 5: Custom Domain (Optional)
If you want to use `wavyautomotive.com`:

1. Purchase domain from GoDaddy, Namecheap, or similar
2. Go to domain registrar's DNS settings
3. Add these records:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   ---
   Type: A
   Name: @
   Value: 185.199.109.153
   ---
   Type: A
   Name: @
   Value: 185.199.110.153
   ---
   Type: A
   Name: @
   Value: 185.199.111.153
   ---
   Type: CNAME
   Name: www
   Value: USERNAME.github.io
   ```
4. Go back to GitHub > Settings > Pages
5. Under "Custom domain", enter your domain name
6. Wait for DNS to verify (5-60 minutes)
7. Check "Enforce HTTPS"

---

## 📋 Pre-Deployment Checklist

Before publishing, verify:

### Security
- [ ] Changed admin password from `admin123`
- [ ] No sensitive data in files
- [ ] No API keys exposed
- [ ] GitHub repository is public/private as intended

### Functionality
- [ ] Logo displays correctly
- [ ] Slideshow works (car images rotate)
- [ ] All forms submit successfully
- [ ] Admin panel opens with new password
- [ ] Inventory works
- [ ] Search functionality works
- [ ] Mobile responsive design works

### Content
- [ ] Company contact info updated (phone, email, address)
- [ ] Forms have correct field validation
- [ ] All links work
- [ ] No broken images

### SEO & Analytics
- [ ] Added Google Analytics (optional)
- [ ] Meta tags look good
- [ ] Title tags are descriptive
- [ ] Sitemap created (optional)

---

## 🎨 After Deployment Customizations

### Adding Google Analytics
1. Go to https://analytics.google.com
2. Create new property for your website
3. Copy Tracking ID
4. Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

### Setting Up Email Integration
See `EMAIL_SETUP.md` in your project for EmailJS integration details.

### Updating Content
To make changes after deployment:

1. Edit files locally in VS Code
2. Push changes to GitHub:
```bash
git add .
git commit -m "Update description"
git push
```
3. Changes appear on website in 1-2 minutes

---

## 🔒 SSL Certificate (HTTPS)

**GitHub Pages automatically provides free HTTPS!**

- All GitHub Pages sites use HTTPS by default
- No additional setup needed
- Automatic certificate renewal
- Enforced by GitHub

To verify: Look for 🔒 in browser address bar

---

## 📊 Repository Structure for GitHub

Your GitHub repository should look like:

```
wavy-automotive/
├── index.html
├── inventory.html
├── admin.html
├── assets/
│   ├── logo.png
│   ├── hero-image.svg
│   └── default-car.svg
├── css/
│   ├── styles.css
│   ├── modals.css
│   ├── inventory.css
│   └── admin.css
├── js/
│   ├── script.js
│   ├── inventory.js
│   └── admin.js
├── README.md
├── LICENSE (optional)
└── .gitignore (optional)
```

---

## 🆘 Troubleshooting

**Site not appearing after enabling Pages?**
- Wait 5-10 minutes for GitHub to build
- Refresh browser (Ctrl+F5)
- Check email for build errors

**Custom domain not working?**
- DNS can take 24-48 hours to propagate
- Verify DNS records are correct
- Check GitHub > Settings > Pages for verification status

**Forms not working?**
- Ensure email integration is set up separately (see EMAIL_SETUP.md)
- Forms save locally in localStorage
- Check Admin panel for submissions

**Images not loading?**
- Verify image paths are relative: `assets/logo.png`
- Check image files uploaded to GitHub
- Clear browser cache

**CSS/JavaScript not loading?**
- Hard refresh: Ctrl+Shift+Delete (cache) + Ctrl+F5
- Verify file paths in HTML
- Check GitHub Pages build logs

---

## 📞 GitHub Support

- Help: https://docs.github.com/en/pages
- Issues: https://github.com/support
- Community: https://github.community

---

## Next Steps After Deployment

1. ✅ Test website on multiple devices
2. ✅ Share link with stakeholders
3. ✅ Set up email forwarding for forms (see EMAIL_SETUP.md)
4. ✅ Monitor analytics
5. ✅ Make updates as needed
6. ✅ Plan SEO optimization
7. ✅ Set up domain email

---

## Your Website After Deploy

**GitHub Pages URL:**
```
https://USERNAME.github.io/wavy-automotive
```

**Custom Domain URL (if purchased):**
```
https://wavyautomotive.com
```

Both URLs will show:
- Dark theme with professional styling
- Car slideshow on homepage
- Comprehensive approval forms
- Inventory management
- Admin panel (password protected)
- Customer reviews
- Contact information
- Mobile responsive design

---

## Important Files

- `README.md` - Project documentation
- `EMAIL_SETUP.md` - Email integration guide
- `SHAREPOINT_SETUP.md` - Excel import guide
- `DEPLOYMENT_CHECKLIST.md` - Full pre-launch checklist

---

**Your website is ready to go live! 🚀**

Questions? See DEPLOYMENT_CHECKLIST.md for 100+ launch verification items.
