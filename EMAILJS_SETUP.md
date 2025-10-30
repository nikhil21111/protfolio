# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email

## Step 2: Add Email Service
1. Go to "Email Services" in dashboard
2. Click "Add New Service"
3. Choose "Gmail"
4. Connect your Gmail account: `vekariyanikhil54@gmail.com`
5. Copy the **Service ID** (looks like: `service_xxxxxxx`)

## Step 3: Create Email Template
1. Go to "Email Templates" in dashboard
2. Click "Create New Template"
3. Set up the template:

**Subject:**
```
New Message from {{subject}}
```

**Content:**
```
You have received a new message from your portfolio website!

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. Copy the **Template ID** (looks like: `template_xxxxxxx`)

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (looks like: `xxxxxxxxxxxxxxxx`)

## Step 5: Update Environment Variables
1. Open `.env.local` file in your project root
2. Replace the values:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

## Step 6: Restart Dev Server
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Testing
1. Open your portfolio
2. Fill out the contact form
3. Click "Send Message"
4. Check your Gmail inbox: `vekariyanikhil54@gmail.com`

## Free Tier Limits
- 200 emails per month
- Perfect for a portfolio website
- No credit card required

## Fallback
If EmailJS is not configured, the form will automatically fall back to opening the user's email client with pre-filled content (mailto: link).

## Troubleshooting
- Make sure to restart the dev server after updating .env.local
- Check that your Gmail is connected in EmailJS dashboard
- Verify all IDs are copied correctly (no extra spaces)
- Test the template in EmailJS dashboard before deploying
