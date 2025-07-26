# Contact Database Setup Guide

This guide will help you set up the contact form database functionality for your RedCoat application.

## Database Setup

### 1. Create the Contacts Table

Run the following SQL commands in your PostgreSQL database to create the contacts table:

```sql
-- Create contact table to store contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    form_type VARCHAR(20) NOT NULL CHECK (form_type IN ('general', 'sponsor')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Create index on form_type for filtering
CREATE INDEX IF NOT EXISTS idx_contacts_form_type ON contacts(form_type);

-- Create index on created_at for date-based queries
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
```

You can run this by:
1. Using the `contact_table.sql` file in this directory
2. Running it directly in your PostgreSQL client
3. Using a database management tool like pgAdmin

### 2. API Endpoints

The following endpoints are now available:

#### Public Endpoints (No Authentication Required)
- `POST /api/contact` - Submit contact form (general or sponsor)

#### Admin Endpoints (Authentication Required)
- `GET /api/admin/contacts/all` - Get all contact submissions
- `GET /api/admin/contacts/type/:formType` - Get contacts by type (general/sponsor)
- `GET /api/admin/contacts/:id` - Get specific contact by ID
- `DELETE /api/admin/contacts/:id` - Delete a contact submission
- `GET /api/admin/contacts/stats/overview` - Get contact statistics

### 3. Frontend Features

#### Contact Forms
- Both general and sponsor contact forms now save to the database
- Email notifications are still sent as before
- Form validation and phone number formatting remain the same

#### Admin Dashboard
- New "Contact Management" page accessible from admin dashboard
- View all contact submissions with filtering options
- Delete individual submissions
- View statistics and analytics
- Real-time updates when submissions are deleted

### 4. Database Schema

The `contacts` table contains the following fields:

- `id` - Auto-incrementing primary key
- `name` - Contact's full name (required)
- `email` - Contact's email address (required)
- `phone` - Contact's phone number (optional)
- `message` - Contact's message (required)
- `form_type` - Type of form ('general' or 'sponsor')
- `created_at` - Timestamp when the submission was created

### 5. Security

- All admin endpoints require authentication via JWT token
- Contact form submissions are validated on both frontend and backend
- SQL injection protection through parameterized queries
- Input sanitization and validation

### 6. Testing

To test the functionality:

1. Start your API server: `npm start` (in redcoat_api directory)
2. Start your React app: `npm start` (in redcoatApp directory)
3. Navigate to the contact page and submit a form
4. Login to admin dashboard and check the Contact Management page
5. Verify that the submission appears in the database

### 7. Troubleshooting

If you encounter issues:

1. Check that the database table was created successfully
2. Verify your database connection in `db.js`
3. Check the server logs for any error messages
4. Ensure all required environment variables are set
5. Verify that the admin authentication is working properly

### 8. Environment Variables

Make sure these environment variables are set in your `.env` file:

```
DB_USER=your_db_user
DB_HOST=your_db_host
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
DB_PORT=5432
GENERAL_EMAIL=your_general_email
SPONSOR_EMAIL=your_sponsor_email
FROM_EMAIL=your_from_email
SENDGRID_API_KEY=your_sendgrid_key
JWT_SECRET=your_jwt_secret
```

The contact database functionality is now fully integrated into your RedCoat application! 