# PixelCraft Studio - Professional Digital Creative Agency Website

A complete, production-ready website for PixelCraft Studio built with React, TypeScript, Tailwind CSS, and Supabase.

## 🎯 Features

- **Premium Dark Design**: Modern, professional aesthetic with smooth animations
- **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- **Supabase Integration**: All data stored permanently in the cloud
- **Admin Dashboard**: Secure admin panel to manage content
- **Dynamic Content**: Services, portfolio projects, pricing, testimonials all managed via Supabase
- **Contact Management**: Contact forms and project requests stored in Supabase
- **Authentication**: Secure admin login using Supabase Auth
- **SEO Optimized**: Meta tags, semantic HTML, and proper structure
- **Performance**: Fast loading, lazy loading images, optimized code

## 📋 Pages

1. **Home** - Hero section with featured projects, services preview, testimonials
2. **Services** - All services displayed in beautiful cards
3. **Portfolio** - Gallery with filtering by category
4. **Pricing** - Pricing packages with features and FAQ
5. **About** - Company information
6. **Contact** - Contact form that saves to Supabase
7. **Project Request** - Detailed project inquiry form
8. **Admin Dashboard** - Secure admin panel with full CRUD operations

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Hooks + Zustand

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- Supabase account (free tier available)

### Step 1: Clone the Repository

```bash
git clone https://github.com/shakeel786330/pixelcraft-studio.git
cd pixelcraft-studio
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project's **URL** and **Anon Key** from the Settings > API section
3. Keep these safe - you'll need them next

### Step 4: Create Database Tables

1. In your Supabase project, go to **SQL Editor**
2. Click **New Query** and paste the entire SQL schema from `supabase-schema.sql`
3. Click **Run**

The schema creates these tables:
- `profiles` - Admin users
- `services` - Service offerings
- `portfolio_projects` - Portfolio projects
- `pricing_packages` - Pricing tiers
- `testimonials` - Client testimonials
- `contact_messages` - Contact form submissions
- `project_requests` - Project inquiry submissions

### Step 5: Configure Environment Variables

1. Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

2. Replace with your actual Supabase credentials

### Step 6: Set Up Admin User

1. In Supabase, go to **Authentication > Users**
2. Click **Create a new user**
3. Enter an email and password
4. After creating, go to the **profiles** table
5. Find the newly created user and update:
   - Set `is_admin` to `true`

### Step 7: Configure Row Level Security (RLS)

In Supabase SQL Editor, run these policies for each table:

**For Public Read Access (services, pricing, testimonials, portfolio):**

```sql
-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Public can read
CREATE POLICY "Public read services"
ON services FOR SELECT
TO anon, authenticated
USING (true);

-- Only admins can edit
CREATE POLICY "Admins can update services"
ON services FOR UPDATE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE id = auth.uid()
  AND is_admin = true
));
```

**For Contact & Project Request Submissions:**

```sql
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view messages"
ON contact_messages FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE id = auth.uid()
  AND is_admin = true
));
```

## 🏃 Running Locally

```bash
npm run dev
```

The website will open at `http://localhost:5173`

## 🔨 Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

## 📝 Adding Content

### Add Services

1. Go to Admin Dashboard (`/admin`)
2. Navigate to Services
3. Click "Add Service"
4. Fill in details and save

### Add Portfolio Projects

1. In Admin Dashboard, go to Portfolio
2. Upload project image
3. Add project details, technologies, and URL
4. Mark as featured if needed

### Add Pricing Packages

1. In Admin Dashboard, go to Pricing
2. Create new package
3. Add features as an array
4. Set order for display sequence

### Add Testimonials

1. In Admin Dashboard, go to Testimonials
2. Add client name, company, content, rating
3. Optionally upload client photo

## 🔐 Security

- Admin routes are protected with `ProtectedRoute` component
- All API keys are stored in environment variables
- Supabase RLS policies ensure data integrity
- Service role key is never exposed to frontend
- Authentication via secure Supabase Auth

## 📊 Admin Dashboard Features

- **Dashboard Overview**: Quick stats and metrics
- **Portfolio Management**: Create, edit, delete projects
- **Services Management**: Manage service offerings
- **Pricing Management**: Update pricing packages
- **Testimonials**: Manage client testimonials
- **Message Inbox**: View contact form submissions
- **Project Requests**: View and manage project inquiries
- **Settings**: Configure general website settings

## 🌐 Deployment

### Deploy on Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy

### Deploy on Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect your repository
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Add environment variables
7. Deploy

## 📱 Responsive Design

The website is fully responsive and tested on:
- Mobile phones (375px and up)
- Tablets (768px and up)
- Desktops (1024px and up)
- Large screens (1920px and up)

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```js
colors: {
  'primary': '#6366F1',
  'primary-dark': '#4F46E5',
  'secondary': '#EC4899',
  'dark': '#0F172A',
  'dark-secondary': '#1E293B',
}
```

### Typography

Modify `src/index.css` for font families and sizes

### Animations

Adjust animation speeds in `tailwind.config.js` keyframes section

## 🆘 Troubleshooting

### Supabase Connection Issues

- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Check that your Supabase project is active
- Ensure RLS policies are properly configured

### Admin Login Not Working

- Confirm admin user exists in Supabase `profiles` table
- Check that `is_admin` is set to `true`
- Clear browser cache and cookies
- Try incognito/private browsing mode

### Images Not Loading

- Upload images to Supabase Storage
- Update image URLs in the database
- Ensure storage bucket is public

### Database Errors

- Check browser console for error messages
- Verify all required tables exist
- Confirm RLS policies are enabled
- Check Supabase dashboard for detailed error logs

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Supabase documentation
3. Check React and TypeScript documentation
4. Review console logs for error details

## 📄 License

This project is licensed under the MIT License

## 🙏 Acknowledgments

- Built with React and TypeScript
- Styled with Tailwind CSS
- Animations by Framer Motion
- Backend powered by Supabase
- Icons by Lucide React

---

**PixelCraft Studio - Design. Build. Grow.**
