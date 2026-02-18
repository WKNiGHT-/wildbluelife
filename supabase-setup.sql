-- =============================================
-- Wildblue Life - Supabase Database Setup
-- Run this in Supabase Dashboard > SQL Editor
-- =============================================

-- Vouches: track when neighbors vouch for a business
CREATE TABLE vouches (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  business_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Community questions: the "Ask the Community" feature
CREATE TABLE community_questions (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  question text NOT NULL,
  author text NOT NULL,
  category text,
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Community responses: answers to community questions
CREATE TABLE community_responses (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  question_id bigint REFERENCES community_questions(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  recommended_by text NOT NULL,
  comment text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Helpful votes on reviews
CREATE TABLE helpful_votes (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  business_name text NOT NULL,
  reviewer text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Row Level Security: allow anonymous reads and inserts
ALTER TABLE vouches ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE helpful_votes ENABLE ROW LEVEL SECURITY;

-- Vouches: anyone can read and insert
CREATE POLICY "Anyone can read vouches" ON vouches FOR SELECT USING (true);
CREATE POLICY "Anyone can insert vouches" ON vouches FOR INSERT WITH CHECK (true);

-- Community questions: anyone can read and insert
CREATE POLICY "Anyone can read questions" ON community_questions FOR SELECT USING (true);
CREATE POLICY "Anyone can insert questions" ON community_questions FOR INSERT WITH CHECK (true);

-- Community responses: anyone can read and insert
CREATE POLICY "Anyone can read responses" ON community_responses FOR SELECT USING (true);
CREATE POLICY "Anyone can insert responses" ON community_responses FOR INSERT WITH CHECK (true);

-- Helpful votes: anyone can read and insert
CREATE POLICY "Anyone can read helpful votes" ON helpful_votes FOR SELECT USING (true);
CREATE POLICY "Anyone can insert helpful votes" ON helpful_votes FOR INSERT WITH CHECK (true);
