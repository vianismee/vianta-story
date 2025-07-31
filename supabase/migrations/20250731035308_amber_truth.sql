/*
  # Blog Application Database Schema

  1. New Tables
    - `blog_post`
      - `id` (bigint, primary key, auto-increment)
      - `created_at` (timestamptz, default now())
      - `post_slug` (text, unique, not null)
      - `header_image_url` (text)
      - `title` (text, not null)
      - `content` (jsonb, not null)
    - `post_metrics`
      - `id` (bigint, primary key, auto-increment)
      - `post_id` (bigint, foreign key to blog_post.id)
      - `view_count` (bigint, default 0)
      - `like_count` (bigint, default 0)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Storage
    - Create `blog-images` bucket for storing blog header images

  3. Security
    - Enable RLS on all tables
    - Add policies for public read access to blog posts
    - Add policies for authenticated users to manage posts
    - Set up storage policies for blog images

  4. Functions
    - Create function to increment view count
    - Create trigger to automatically create post metrics
*/

-- Create blog_post table
CREATE TABLE IF NOT EXISTS blog_post (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamptz DEFAULT now() NOT NULL,
  post_slug text UNIQUE NOT NULL,
  header_image_url text,
  title text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}'::jsonb
);

-- Create post_metrics table
CREATE TABLE IF NOT EXISTS post_metrics (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  post_id bigint REFERENCES blog_post(id) ON DELETE CASCADE NOT NULL,
  view_count bigint DEFAULT 0 NOT NULL,
  like_count bigint DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(post_id)
);

-- Enable Row Level Security
ALTER TABLE blog_post ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_post table
CREATE POLICY "Anyone can read blog posts"
  ON blog_post
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_post
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts"
  ON blog_post
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_post
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for post_metrics table
CREATE POLICY "Anyone can read post metrics"
  ON post_metrics
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can update view count"
  ON post_metrics
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert post metrics"
  ON post_metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete post metrics"
  ON post_metrics
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(post_slug_param text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  post_id_var bigint;
BEGIN
  -- Get the post ID from the slug
  SELECT id INTO post_id_var
  FROM blog_post
  WHERE post_slug = post_slug_param;
  
  -- If post exists, increment view count
  IF post_id_var IS NOT NULL THEN
    INSERT INTO post_metrics (post_id, view_count)
    VALUES (post_id_var, 1)
    ON CONFLICT (post_id)
    DO UPDATE SET 
      view_count = post_metrics.view_count + 1,
      updated_at = now();
  END IF;
END;
$$;

-- Create function to automatically create post metrics when a new blog post is created
CREATE OR REPLACE FUNCTION create_post_metrics()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO post_metrics (post_id, view_count, like_count)
  VALUES (NEW.id, 0, 0);
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create post metrics
DROP TRIGGER IF EXISTS create_post_metrics_trigger ON blog_post;
CREATE TRIGGER create_post_metrics_trigger
  AFTER INSERT ON blog_post
  FOR EACH ROW
  EXECUTE FUNCTION create_post_metrics();

-- Create storage bucket for blog images (this needs to be done in Supabase dashboard or via API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Create storage policies (these need to be created after the bucket exists)
-- CREATE POLICY "Anyone can view blog images"
--   ON storage.objects FOR SELECT
--   TO public
--   USING (bucket_id = 'blog-images');

-- CREATE POLICY "Authenticated users can upload blog images"
--   ON storage.objects FOR INSERT
--   TO authenticated
--   WITH CHECK (bucket_id = 'blog-images');

-- CREATE POLICY "Authenticated users can update blog images"
--   ON storage.objects FOR UPDATE
--   TO authenticated
--   USING (bucket_id = 'blog-images')
--   WITH CHECK (bucket_id = 'blog-images');

-- CREATE POLICY "Authenticated users can delete blog images"
--   ON storage.objects FOR DELETE
--   TO authenticated
--   USING (bucket_id = 'blog-images');