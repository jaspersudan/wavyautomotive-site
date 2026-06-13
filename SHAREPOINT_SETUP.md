# SharePoint Excel Inventory Integration Guide

## Overview
Automatically sync your SharePoint Excel inventory sheet with your website. This guide will help you set up one-way sync (Excel → Website) or two-way sync.

## Your SharePoint File
URL: `https://wavyautomotive-my.sharepoint.com/:x:/g/personal/jass_wavyautomotive_ca/IQCekNXAMEVRR5K06eNhLUdLAdNqi-ZlXLYzrzCBUYROn2Q?e=7YCCr1&nav=MTVfezAwMDAwMDAwLTAwMDEtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMH0`

## Required Excel Format

Your SharePoint Excel must have these column headers (exact names):

| make | model | year | price | mileage | color | description |
|------|-------|------|-------|---------|-------|-------------|
| Toyota | Camry | 2022 | 24999 | 15000 | Silver | Sedan, excellent condition |
| Honda | Civic | 2021 | 19999 | 28000 | Black | Reliable commuter car |

**Required Columns:**
- `make` - Vehicle manufacturer
- `model` - Vehicle model
- `year` - Year of manufacture
- `price` - Price in dollars (number only, no $)
- `mileage` - Mileage in kilometers (number only)
- `color` - Vehicle color
- `description` - Optional brief description

## Setup Methods

### Method 1: Manual CSV Import (Recommended for Now)
Easiest method - no coding required

**Steps:**
1. Open your SharePoint Excel sheet
2. Select all data (including headers)
3. Copy (Ctrl+C)
4. Paste into Excel or Google Sheets
5. Save as CSV (Comma Separated Values)
6. In Admin Panel:
   - Go to "SharePoint" tab
   - Click "Import CSV File"
   - Select your CSV file
   - Click "Import Inventory"
7. Done! Your inventory is now on the website

### Method 2: Automatic Sync with Power Automate (Advanced)
Setup a flow to automatically export to CSV weekly

**Steps:**
1. Go to `https://make.powerautomate.com`
2. Create new "Scheduled Cloud Flow"
3. Set to run weekly
4. Add SharePoint "Get Items" action
5. Convert to CSV format
6. Save CSV to a shared location
7. Your website can fetch from this CSV automatically

## Using Admin Panel SharePoint Feature

1. Click **Admin** link → Enter password: `admin123`
2. Go to **SharePoint** tab
3. Options available:
   - **Import CSV** - Upload a CSV export from your Excel
   - **View Current Inventory** - See all loaded vehicles
   - **Sync Status** - Shows last sync time
   - **Manual Refresh** - Force re-import from CSV

## Excel to Website Sync Frequency

**Manual Method:** Import whenever you update Excel (can be daily)
**Automatic Method:** Weekly sync via Power Automate

## Example Excel Data

Save as `.csv` with this format:

```
make,model,year,price,mileage,color,description
Toyota,Camry,2022,24999,15000,Silver,Sedan - Well maintained
Honda,Civic,2021,19999,28000,Black,Reliable commuter
Toyota,RAV4,2023,34999,8000,Blue,SUV - Like new condition
Ford,F-150,2022,38999,12000,Red,Truck - Work ready
Honda,Accord,2021,21999,32000,White,Sedan - Clean interior
```

## Adding Images to Vehicles

Currently, images are placeholders. To add real images:

1. In Excel, add column: `image_url`
2. Upload images to cloud storage (Google Drive, OneDrive)
3. Get shareable links
4. Paste URLs in Excel
5. Import CSV
6. Images will display on inventory page

Example:
```
make,model,year,price,mileage,color,image_url
Toyota,Camry,2022,24999,15000,Silver,https://example.com/camry.jpg
```

## Troubleshooting

**CSV won't import?**
- Ensure headers match exactly (lowercase)
- No empty rows before data
- All required columns present
- File format is `.csv` (not .xlsx)

**Inventory not updating on website?**
- Click "Manual Refresh" in Admin > SharePoint
- Clear browser cache (Ctrl+F5)
- Check console (F12) for errors

**Images not showing?**
- Verify image URLs are publicly accessible
- Test URLs in browser directly
- Use direct image links, not shareable folders

## Automation Recommendations

**For Regular Updates:**
- Manual import: Daily or weekly
- Power Automate: Fully automated weekly
- Zapier: Connect Excel to webhook (paid)

**Best Practice:**
1. Update vehicles in Excel
2. Export to CSV weekly
3. Import to website via Admin Panel
4. Website instantly shows new inventory
5. Customers see latest vehicles

## Security Notes

- Keep Excel file updated regularly
- Admin panel is password-protected (`admin123` - change this!)
- CSV data is stored in browser localStorage
- No sensitive data should be in vehicle descriptions

## Support

- SharePoint Help: https://support.microsoft.com/sharepoint
- Power Automate: https://docs.microsoft.com/power-automate
- Contact: sales@wavyautomotive.ca

## Next Steps

1. Format your Excel file per the template above
2. Save as CSV
3. Use Admin Panel to import
4. Test with a few vehicles first
5. Go live when confident
