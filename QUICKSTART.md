# Wavy Automotive Website - Quick Start Guide

## Getting Started in 5 Minutes

### Step 1: Add Your Logo and Images
1. Prepare your images:
   - **Logo** (60x60px minimum, PNG with transparency)
   - **Hero Image** (1200x400px, PNG or JPG) - the banner with "Find your car" button
   - **Car Placeholder** (280x200px) - for vehicles without images

2. Place them in the `assets/` folder and name them:
   - `assets/logo.png`
   - `assets/hero-image.png`
   - `assets/default-car.png`

### Step 2: Open the Website
1. Double-click `index.html` in the project folder
2. The website will open in your default browser

### Step 3: Test Basic Features
- Click navigation links
- Click "Find your car" button (opens new window)
- Click feature cards to see modals
- Try the search bar

### Step 4: Access Admin Panel
1. Click "Admin" link in the top navigation
2. Enter password: `admin123`
3. Admin panel opens in a new window

### Step 5: Add Your First Vehicle
1. In Admin Panel, click "Manage Inventory"
2. Click "+ Add New Vehicle"
3. Fill in vehicle details:
   - Make: Toyota
   - Model: Camry
   - Year: 2022
   - Price: 24999
   - Mileage: 15000
   - Color: Silver
   - Image URL: (leave blank for placeholder)
4. Click "Save Vehicle"

### Step 6: View Your Vehicle
1. Go back to homepage
2. Click "Find your car"
3. Your new vehicle appears in the inventory

## Quick Password Change

**IMPORTANT**: Change the default admin password!

1. Open `js/script.js` in a text editor
2. Find the `openAdminPanel()` function (around line 70)
3. Change this line:
   ```javascript
   const correctPassword = 'admin123'; // Change this!
   ```
4. To your new password:
   ```javascript
   const correctPassword = 'YourNewSecurePassword123!'; // Your password
   ```
5. Save the file

## Where to Store Your Logo

The logo file needs to be exactly **60x60 pixels** (or larger, but keep aspect ratio):

1. Create an `assets` folder in your project if it doesn't exist
2. Save your logo as `logo.png` inside the `assets` folder
3. The path should be: `assets/logo.png`

If your logo is a different format (JPG, SVG), update the image source in `index.html`:
```html
<img src="assets/logo.svg" alt="Wavy Automotive Logo" class="logo">
```

## Add Sample Data (Optional)

The website comes with sample vehicles. To add your own:

### Via Admin Panel:
1. Click "Admin" (password: `admin123`)
2. Click "+ Add New Vehicle"
3. Fill details and save

### Bulk Import:
You can manually add vehicles by editing `index.html` search JavaScript or using the admin panel's bulk import feature.

## Customize Text

### Company Name and Slogan
Edit `index.html` and find these lines (around line 37):
```html
<h1 class="company-name">Wavy Automotive Inc.</h1>
<p class="slogan">Ride The Wave of Quality</p>
```

### Contact Information
Find and update:
```html
<div class="contact-item">
    <h4>Phone</h4>
    <p>+1 (368) 550-2669</p>
</div>
```

### Location
```html
<p>2140 McPhillips St, Winnipeg, MB</p>
```

## Integration with SharePoint

To connect your inventory to an Excel sheet on SharePoint:

1. Create an Excel file in SharePoint with columns:
   - Make
   - Model
   - Year
   - Price
   - Mileage
   - Color
   - Image URL

2. Copy the SharePoint URL and Spreadsheet ID

3. In Admin Panel:
   - Click "SharePoint Sync" tab
   - Paste URL and ID
   - Click "Setup SharePoint Sync"

**Note**: Full automation requires backend setup. This provides manual sync capability.

## Color Customization

Main colors used:
- **Primary Blue**: `#0099cc` - Links, buttons
- **Dark Blue**: `#003d82` - Headings
- **Accent Yellow**: `#ffcc00` - Call-to-action buttons
- **Light Blue BG**: `#87ceeb` - Hero section

To change colors:
1. Open `css/styles.css`
2. Use Find & Replace (Ctrl+H)
3. Replace old color code with new one

Example:
- Find: `#0099cc`
- Replace with: `#your-color-code`

## Responsive Design

Website automatically adapts to:
- Desktop screens (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (480px - 767px)
- Small phones (<480px)

No additional setup needed!

## Data Storage

Currently, all data is stored in browser's localStorage:
- Inventory is saved when you add vehicles
- Form submissions are saved automatically
- Admin settings are saved

This data persists even after closing the browser.

**Note**: If you clear browser cache/data, all data will be lost. For production, use a real database.

## Troubleshooting

### Admin panel password won't work
- Password is **case-sensitive**
- Default is `admin123` (all lowercase)
- If changed, check your `js/script.js` file

### Logo not showing
- Check file is named `logo.png`
- Check it's in `assets/` folder
- Try refreshing page (Ctrl+F5)
- Check file is PNG format with transparency

### Vehicle inventory empty
- Add vehicles through Admin Panel
- Or check browser Storage settings
- Try a different browser

### Inventory window not opening
- Check if popup blocker is active
- Disable browser popup blocker
- Try right-clicking "Find your car" and select "Open in new tab"

## Next Steps

1. ✅ Add your logo
2. ✅ Change admin password
3. ✅ Customize company info
4. ✅ Add sample vehicles
5. ⬜ Set up SharePoint (optional)
6. ⬜ Deploy to web hosting
7. ⬜ Set up domain name
8. ⬜ Add SSL certificate
9. ⬜ Configure email notifications

## Deployment

To put your site online:

1. **Choose a hosting provider** (GoDaddy, Bluehost, AWS, etc.)
2. **Upload files** via FTP
3. **Set up domain name** (wavyautomotive.ca)
4. **Add SSL certificate** (HTTPS)
5. **Set up backend** for form emails and database

For detailed deployment guide, see README.md

## Support

Need help? Check:
- README.md - Full documentation
- Check browser console for errors (F12)
- Verify all file paths are correct
- Ensure images are in `assets/` folder

## Questions?

Contact information for Wavy Automotive:
- Phone: +1 (368) 550-2669
- Email: sales@wavyautomotive.ca

---

**Happy selling!** 🚗
