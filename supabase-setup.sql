-- ============================================
-- La'Resto Database Setup for Supabase
-- ============================================
-- Run this SQL in Supabase SQL Editor to create
-- all necessary tables and security policies
-- ============================================

-- Create reservations table
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    guests TEXT,
    date DATE,
    time TEXT,
    special_requests TEXT,
    terms_agreement BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create private_dining table
CREATE TABLE IF NOT EXISTS public.private_dining (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT,
    guest_count TEXT,
    preferred_date DATE,
    contact_name TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    special_requests TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.private_dining ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running this script)
DROP POLICY IF EXISTS "Allow public inserts" ON public.reservations;
DROP POLICY IF EXISTS "Allow public inserts" ON public.private_dining;
DROP POLICY IF EXISTS "Allow authenticated users to read reservations" ON public.reservations;
DROP POLICY IF EXISTS "Allow authenticated users to read private dining" ON public.private_dining;

-- Create policies to allow public inserts (website form submissions)
CREATE POLICY "Allow public inserts" ON public.reservations
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow public inserts" ON public.private_dining
    FOR INSERT TO anon
    WITH CHECK (true);

-- Create policies to allow authenticated users to read all records
-- (This allows you to view submissions in the admin dashboard)
CREATE POLICY "Allow authenticated users to read reservations" ON public.reservations
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to read private dining" ON public.private_dining
    FOR SELECT TO authenticated
    USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON public.reservations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON public.reservations(date);
CREATE INDEX IF NOT EXISTS idx_reservations_email ON public.reservations(email);

CREATE INDEX IF NOT EXISTS idx_private_dining_created_at ON public.private_dining(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_private_dining_date ON public.private_dining(preferred_date);
CREATE INDEX IF NOT EXISTS idx_private_dining_email ON public.private_dining(contact_email);

-- Optional: Add comments to tables and columns for documentation
COMMENT ON TABLE public.reservations IS 'Stores restaurant reservation requests from the website';
COMMENT ON TABLE public.private_dining IS 'Stores private dining and event inquiries from the website';

COMMENT ON COLUMN public.reservations.id IS 'Unique identifier for each reservation';
COMMENT ON COLUMN public.reservations.created_at IS 'Timestamp when the reservation was submitted';
COMMENT ON COLUMN public.reservations.terms_agreement IS 'Whether the customer agreed to reservation policies';

COMMENT ON COLUMN public.private_dining.id IS 'Unique identifier for each inquiry';
COMMENT ON COLUMN public.private_dining.created_at IS 'Timestamp when the inquiry was submitted';
COMMENT ON COLUMN public.private_dining.event_type IS 'Type of event (private dinner, corporate, celebration, etc.)';

-- ============================================
-- Setup complete! 
-- You can now:
-- 1. View data in Table Editor
-- 2. Test form submissions
-- 3. Use the admin dashboard (admin.html)
-- ============================================
