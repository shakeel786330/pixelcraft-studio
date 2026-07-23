-- PixelCraft Studio Database Schema
-- Run this SQL in your Supabase project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles Table (for admin users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Portfolio Projects Table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  technologies TEXT[] DEFAULT ARRAY[]::text[],
  project_url TEXT,
  featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Pricing Packages Table
CREATE TABLE IF NOT EXISTS pricing_packages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] DEFAULT ARRAY[]::text[],
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_company TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  image_url TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Project Requests Table
CREATE TABLE IF NOT EXISTS project_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT,
  business_name TEXT NOT NULL,
  service TEXT NOT NULL,
  budget TEXT NOT NULL,
  deadline TEXT,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Services: Public read, admin write
CREATE POLICY "Allow public read services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow admin insert services"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Allow admin update services"
  ON services FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Allow admin delete services"
  ON services FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Portfolio Projects: Public read, admin write
CREATE POLICY "Allow public read portfolio"
  ON portfolio_projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow admin insert portfolio"
  ON portfolio_projects FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Allow admin update portfolio"
  ON portfolio_projects FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Allow admin delete portfolio"
  ON portfolio_projects FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Pricing Packages: Public read, admin write
CREATE POLICY "Allow public read pricing"
  ON pricing_packages FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow admin insert pricing"
  ON pricing_packages FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Allow admin update pricing"
  ON pricing_packages FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Allow admin delete pricing"
  ON pricing_packages FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Testimonials: Public read, admin write
CREATE POLICY "Allow public read testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow admin insert testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Allow admin update testimonials"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Allow admin delete testimonials"
  ON testimonials FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Contact Messages: Public insert, admin read
CREATE POLICY "Allow public insert contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow admin read contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Allow admin update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Project Requests: Public insert, admin read
CREATE POLICY "Allow public insert project requests"
  ON project_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow admin read project requests"
  ON project_requests FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Allow admin update project requests"
  ON project_requests FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Profiles: Allow users to read their own profile
CREATE POLICY "Allow users read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Allow admin read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  ));

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_order ON services ("order");
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio_projects (category);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_projects (featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_order ON portfolio_projects ("order");
CREATE INDEX IF NOT EXISTS idx_pricing_order ON pricing_packages ("order");
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials ("order");
CREATE INDEX IF NOT EXISTS idx_contact_read ON contact_messages (read);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages (created_at);
CREATE INDEX IF NOT EXISTS idx_requests_status ON project_requests (status);
CREATE INDEX IF NOT EXISTS idx_requests_created ON project_requests (created_at);
CREATE INDEX IF NOT EXISTS idx_profiles_admin ON profiles (is_admin);

-- Seed sample data (optional)
INSERT INTO services (title, description, icon, "order") VALUES
  ('Web Development', 'Custom website development with modern technologies', 'code', 1),
  ('WordPress', 'WordPress site setup and customization', 'wordpress', 2),
  ('E-commerce', 'Full e-commerce solutions with payment integration', 'ecommerce', 3),
  ('Graphic Design', 'Professional graphic design for your brand', 'design', 4)
ON CONFLICT DO NOTHING;

INSERT INTO pricing_packages (name, price, description, features, "order") VALUES
  ('Starter', 20, '1 Page WordPress Website', ARRAY['1 Page WordPress Website', 'Responsive Design', 'Contact Form', 'Basic Customization', '2 Revisions'], 1),
  ('Business', 60, 'Up to 5 Pages Business Site', ARRAY['Up to 5 Pages', 'Responsive Design', 'Elementor', 'Contact Form', 'Basic SEO', 'Speed Optimization', '5 Revisions'], 2),
  ('Premium', 120, 'Advanced Custom Website', ARRAY['Up to 10 Pages', 'Custom Design', 'WooCommerce Setup', 'Payment Gateway', 'SEO Optimization', 'Speed Optimization', 'Security Setup'], 3)
ON CONFLICT DO NOTHING;
