# Email Integration Setup Guide

## Overview
Your website now supports automatic email sending for all customer forms. This guide will walk you through setting up EmailJS to send form submissions directly to `sales@wavyautomotive.ca`.

## Setup Steps (2 minutes)

### 1. Create EmailJS Account
- Visit https://www.emailjs.com/
- Click "Sign Up Free"
- Create an account (free tier is sufficient)
- Verify your email

### 2. Create Email Service
- Go to **Email Services** in the dashboard
- Click **Add New Service**
- Select **Gmail** (or your email provider)
- Click **Connect**
- Sign in with your Gmail account (sales@wavyautomotive.ca)
- Grant permissions
- Copy the **Service ID** (you'll need this)

### 3. Create Email Template
- Go to **Email Templates**
- Click **Create New Template**
- Template Name: `wavy_automotive_form`
- From Name: `Wavy Automotive Website`
- From Email: `{{from_email}}`
- To Email: `sales@wavyautomotive.ca`
- Subject: `New {{form_type}} Form Submission`
- Template Content:
```
Hello,

New form submission received:

Type: {{form_type}}
Date: {{timestamp}}

Customer Details:
{{message_body}}

Please review and follow up with the customer as soon as possible.

---
Wavy Automotive Inc.
Automatically generated form submission
```
- Click **Save Template**
- Copy the **Template ID**

### 4. Get Your Public Key
- Go to **Account** settings
- Copy your **Public Key**

### 5. Update Your Website
Replace the placeholder values in `js/script.js` (around line 130):

```javascript
// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID_HERE';
const EMAILJS_TEMPLATE_ID = 'wavy_automotive_form';

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}
```

### 6. Add EmailJS Script to index.html
Add this line inside the `<head>` section of `index.html` (after line 6):

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
```

## Testing the Integration

1. Open your website: `file:///c:/Users/Jassi/Wavy Automotive Inc/index.html`
2. Click any feature card (e.g., "Same Day Approvals")
3. Fill out the form
4. Click Submit
5. Check `sales@wavyautomotive.ca` for the email (may take 10-30 seconds)

## Free Tier Limits
- EmailJS Free: 200 emails/month
- No credit card required
- Upgrade available if you need more

## Troubleshooting

**Email not received?**
- Check spam/junk folder
- Verify SMTP credentials in EmailJS dashboard
- Check console for JavaScript errors (F12)

**Console error: "emailjs is not defined"?**
- Ensure the EmailJS script tag is added to index.html
- Wait for page to fully load before submitting forms

**"Service ID invalid" error?**
- Double-check Service ID in script.js
- Ensure service is active in EmailJS dashboard

## Alternative: Manual Email Collection
If you prefer not to use EmailJS, forms are automatically saved locally and visible in the **Admin Panel**:
1. Click "Admin" → enter password: `admin123`
2. Go to "Submissions" tab
3. All form submissions are listed with contact information

You can manually send emails from this list, or export and process them in bulk.

## Security Note
Keep your EmailJS keys secure. In production (when uploading to web hosting), consider:
- Using backend authentication
- Environment variables for sensitive keys
- Regular key rotation

## Support
- EmailJS Support: https://www.emailjs.com/docs/
- Contact: support@emailjs.com
