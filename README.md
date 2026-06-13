# Wavy Automotive Inc. - Dealership Website

A complete dealership website for Wavy Automotive Inc. with inventory management, customer forms, referral programs, and admin panel.

## Features

### Customer Features
- **Homepage** with company information and slogan
- **Navigation Menu** with Home, Inventory, Referral, Contact, Admin, and Sell/Trade options
- **Hero Section** with "Find your car" call-to-action
- **Vehicle Search Bar** to search inventory by make and model
- **Feature Cards** including:
  - Same Day Approvals
  - Referral Programs
  - Huge Selection of Inventory
  - FREE Canada-wide Delivery
  - Lowest Interest Rates

### Modal Forms (Popup Windows)
- Same Day Approvals form
- Referral Program form
- Free Delivery form
- Financing/Bank selection with individual bank forms
- Sell/Trade Your Vehicle form
- Terms of Service
- Privacy Policy

### Inventory Management
- Browse complete vehicle inventory in separate window
- Filter by make, model, year, and price
- View detailed car information
- Inquire about specific vehicles
- Responsive design for all devices

### Customer Reviews
- Carousel displaying 10+ customer reviews
- Navigable with previous/next buttons
- 5-star ratings

### Contact Section
- Location and contact information
- Phone: +1 (368) 550-2669
- Email: sales@wavyautomotive.ca
- Address: 2140 McPhillips St, Winnipeg, MB

### Admin Panel
**Password Protected** (default: `admin123` - change this in `js/script.js`)

Features:
- **Inventory Management**
  - Add new vehicles
  - Edit existing vehicles
  - Delete vehicles
  - View all inventory in table format

- **Form Submissions**
  - View all customer form submissions
  - Filter by form type (approvals, referral, delivery, etc.)
  - Clear all submissions

- **Car Inquiries**
  - Track all vehicle inquiries
  - See customer contact information
  - View test drive requests
  - Customer messages

- **SharePoint Integration**
  - Connect to SharePoint Excel spreadsheet
  - Sync inventory with Excel file
  - Automatic updates from Excel source

### Financial Institutions
Partnership with 8 major financial institutions:
- TD
- RBC
- CIBC
- Quantifi
- Rifco
- Eden Park Inc.
- National Bank of Canada
- Santander Consumer Inc.

## File Structure

```
Wavy Automotive Inc/
├── index.html              # Main homepage
├── inventory.html          # Vehicle inventory page
├── admin.html              # Admin panel
├── css/
│   ├── styles.css         # Main styles
│   ├── modals.css         # Modal styles
│   ├── inventory.css      # Inventory page styles
│   └── admin.css          # Admin panel styles
├── js/
│   ├── script.js          # Main JavaScript functions
│   ├── inventory.js       # Inventory page functions
│   └── admin.js           # Admin panel functions
├── assets/
│   ├── logo.png           # Company logo (REPLACE WITH YOUR LOGO)
│   ├── hero-image.png     # Hero section image (REPLACE WITH YOUR IMAGE)
│   └── default-car.png    # Default car image placeholder
└── README.md              # This file
```

## Setup Instructions

### 1. Initial Setup
1. Replace the placeholder images in the `assets/` folder:
   - `logo.png` - Your company logo (recommended size: 60x60px minimum)
   - `hero-image.png` - Hero section banner image
   - `default-car.png` - Default car image when no image URL is available

2. Update the admin password in `js/script.js`:
   ```javascript
   const correctPassword = 'your_secure_password'; // Line in openAdminPanel() function
   ```

### 2. Adding Initial Inventory
1. Open the website in a browser (double-click `index.html`)
2. Click the "Admin" link in the top navigation
3. Enter the admin password
4. In the Admin Panel, click "Manage Inventory"
5. Click "+ Add New Vehicle" and fill in the vehicle details
6. Click "Save Vehicle"

### 3. SharePoint Integration (Optional)
1. Create an Excel file in your SharePoint account with the following columns:
   - Make
   - Model
   - Year
   - Price
   - Mileage
   - Color
   - Image URL

2. In the Admin Panel, go to "SharePoint Sync" tab
3. Paste your SharePoint site URL and Spreadsheet ID
4. Click "Setup SharePoint Sync"
5. Click "Sync Now" to sync your inventory

Note: Full SharePoint integration requires backend API support with OAuth authentication.

### 4. Customization

#### Update Company Information
Edit `index.html` and update:
- Company name: "Wavy Automotive Inc."
- Slogan: "Ride The Wave of Quality"
- Contact information in the Contact section
- Social media links (if desired)

#### Modify Navigation Links
Edit the navigation menu in `index.html` to add or remove menu items.

#### Add More Financial Institutions
Add more bank cards in the financing section of `index.html`.

#### Customize Colors
Edit CSS files to match your brand colors:
- Primary color: `#0099cc` (light blue)
- Dark color: `#003d82` (dark blue)
- Accent color: `#ffcc00` (yellow)

## How Customers Use the Website

### Finding Vehicles
1. **Search by Make/Model**: Use the search bar on the homepage
2. **Browse All Inventory**: Click "Find your car" button or "Inventory" in navigation
3. **View Details**: Click "View Details" on any vehicle
4. **Inquire**: Click "Inquire" to express interest in a vehicle

### Applying for Credit
1. Click "Same Day Approvals!" on the homepage
2. Fill out the quick application form
3. Submit - you'll be contacted within 24 hours

### Referring Friends
1. Click "Referral Programs Available"
2. Fill out referral information
3. Earn $500 for each successful referral

### Arranging Delivery
1. Click "FREE Canada-wide Delivery"
2. Enter delivery address and preferences
3. Confirm - delivery will be arranged

### Financing Options
1. Click "Lowest Interest Rates"
2. Select a financial institution
3. Fill out pre-approval form
4. Get instant approval

### Selling/Trading Vehicle
1. Click "Sell/Trade" in the navigation
2. Enter your vehicle details
3. Submit - we'll contact you with an offer

## Data Storage

Currently, the website uses browser **localStorage** to store data:
- Inventory data
- Form submissions
- Car inquiries
- Admin configuration

For production deployment:
1. Implement a backend database (e.g., MongoDB, SQL)
2. Create API endpoints to handle data
3. Add user authentication for admin panel
4. Implement email notifications
5. Add payment gateway integration if selling online

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Notes

### Important: Change Default Admin Password
The default admin password is `admin123`. This should be changed immediately in production to a secure password.

### For Production:
1. Move password validation to backend
2. Implement proper authentication (JWT, OAuth)
3. Use HTTPS
4. Validate all form inputs server-side
5. Implement CSRF protection
6. Add rate limiting to forms
7. Encrypt sensitive data

## Support & Maintenance

### Regular Updates Needed:
- Update vehicle inventory regularly
- Monitor form submissions
- Update customer reviews
- Maintain SharePoint Excel file
- Review and respond to car inquiries

### Troubleshooting:

**Admin panel won't open**: 
- Check password is correct (case-sensitive)
- Ensure popup blocker isn't preventing window

**Inventory not showing**: 
- Check browser localStorage (F12 > Storage > Local Storage)
- Try adding a vehicle through admin panel

**SharePoint sync not working**: 
- Verify SharePoint URL and Spreadsheet ID are correct
- Check SharePoint file permissions
- Requires backend API implementation for full functionality

## Contact Information

**Wavy Automotive Inc.**
- Phone: +1 (368) 550-2669
- Email: sales@wavyautomotive.ca
- Location: 2140 McPhillips St, Winnipeg, MB

## License

This website is the exclusive property of Wavy Automotive Inc. Do not redistribute or modify without permission.

## Future Enhancements

Potential features to add:
- User account creation and login
- Saved vehicle favorites
- Email notifications
- SMS notifications
- Online chat support
- Virtual showroom
- 360° vehicle photos
- Video tours
- Trade-in valuator
- Payment processing
- Service appointment booking
- Warranty management
- Social media integration

---

**Last Updated**: May 2026
**Version**: 1.0
