-- Youth Platform Database Schema

-- Learning modules table
CREATE TABLE IF NOT EXISTS learning_modules (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) CHECK (type IN ('interactive', 'quiz', 'story', 'video')),
  category VARCHAR(100),
  difficulty VARCHAR(50) CHECK (difficulty IN ('easy', 'medium', 'hard')),
  duration_minutes INTEGER,
  flb_reward NUMERIC(18, 8) NOT NULL,
  xp_reward INTEGER NOT NULL,
  content JSONB,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) CHECK (category IN ('learn', 'earn', 'connect', 'create')),
  difficulty VARCHAR(50) CHECK (difficulty IN ('easy', 'medium', 'hard')),
  type VARCHAR(50) CHECK (type IN ('daily', 'weekly', 'special')),
  reward_flb NUMERIC(18, 8) NOT NULL,
  reward_xp INTEGER NOT NULL,
  requirements JSONB,
  active BOOLEAN DEFAULT true,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tribes table
CREATE TABLE IF NOT EXISTS tribes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  region VARCHAR(100),
  category VARCHAR(100),
  member_count INTEGER DEFAULT 0,
  activity_level VARCHAR(50) CHECK (activity_level IN ('low', 'medium', 'high')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(10),
  requirement_type VARCHAR(50),
  requirement_value INTEGER,
  reward_flb NUMERIC(18, 8),
  reward_xp INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User completed modules tracking
CREATE TABLE IF NOT EXISTS user_completed_modules (
  user_id INTEGER REFERENCES user_profiles(id),
  module_id INTEGER REFERENCES learning_modules(id),
  score INTEGER,
  flb_earned NUMERIC(18, 8),
  xp_earned INTEGER,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, module_id)
);

-- User completed challenges tracking
CREATE TABLE IF NOT EXISTS user_completed_challenges (
  user_id INTEGER REFERENCES user_profiles(id),
  challenge_id INTEGER REFERENCES challenges(id),
  flb_earned NUMERIC(18, 8),
  xp_earned INTEGER,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, challenge_id)
);

-- User achievements tracking
CREATE TABLE IF NOT EXISTS user_achievements (
  user_id INTEGER REFERENCES user_profiles(id),
  achievement_id INTEGER REFERENCES achievements(id),
  achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, achievement_id)
);

-- User stories table
CREATE TABLE IF NOT EXISTS user_stories (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES user_profiles(id),
  title VARCHAR(255),
  content TEXT NOT NULL,
  category VARCHAR(100),
  flb_earned NUMERIC(18, 8),
  xp_earned INTEGER,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample learning modules
INSERT INTO learning_modules (title, description, type, category, difficulty, duration_minutes, flb_reward, xp_reward, content) VALUES
('Wisdom of West Africa', 'Explore proverbs from Nigeria, Ghana, and Senegal', 'interactive', 'Cultural Heritage', 'easy', 15, 25, 50, '{"proverbs": [{"text": "When the spider webs unite, they can tie up a lion", "language": "Akan (Ghana)", "meaning": "Unity and cooperation can overcome any challenge"}]}'),
('Ubuntu Philosophy Mastery', 'Test your understanding of African humanistic philosophy', 'quiz', 'Philosophy', 'medium', 10, 40, 75, '{"questions": [{"question": "What does Ubuntu mean?", "options": ["I am because we are", "Individual success", "Competition", "Self-reliance"], "correct": 0}]}'),
('Health Impact Stories', 'Share your community health experiences', 'story', 'Health Advocacy', 'easy', 20, 35, 60, '{"prompt": "Tell us about a health impact in your community"}'),
('Blockchain for Social Good', 'Learn blockchain applications for African challenges', 'video', 'Technology', 'hard', 30, 60, 120, '{"video_url": "/videos/blockchain-social.mp4"}');

-- Insert sample challenges
INSERT INTO challenges (title, description, category, difficulty, type, reward_flb, reward_xp, requirements) VALUES
('Learn 3 Yoruba Proverbs', 'Discover wisdom from West Africa', 'learn', 'easy', 'daily', 25, 40, '{"modules_to_complete": 3, "category": "Cultural Heritage"}'),
('Share Ubuntu Story', 'Tell how you helped someone today', 'create', 'medium', 'daily', 40, 60, '{"stories_to_share": 1, "category": "Philosophy"}'),
('Connect with Tribe Members', 'Expand your African network', 'connect', 'easy', 'daily', 30, 45, '{"connections_to_make": 2}'),
('Master Health Course', 'Complete all health advocacy modules', 'learn', 'hard', 'weekly', 150, 250, '{"modules_to_complete": 5, "category": "Health Advocacy"});

-- Insert sample tribes
INSERT INTO tribes (name, description, region, category, member_count, activity_level) VALUES
('Digital Innovators', 'Young Africans building the future with tech', 'Pan-African', 'Technology', 234, 'high'),
('Health Heroes', 'Passionate about community health and wellness', 'Pan-African', 'Health', 156, 'medium'),
('Cultural Keepers', 'Preserving and sharing African traditions', 'Pan-African', 'Culture', 189, 'high'),
('Eco Warriors', 'Fighting climate change across Africa', 'Pan-African', 'Environment', 98, 'low');

-- Insert sample achievements
INSERT INTO achievements (title, description, icon, requirement_type, requirement_value, reward_flb, reward_xp) VALUES
('First Steps', 'Complete your first learning module', '👶', 'modules', 1, 10, 25),
('Wisdom Seeker', 'Learn 10 African proverbs', '🧠', 'modules', 10, 50, 100),
('Community Builder', 'Join your first tribe', '🏗️', 'tribes', 1, 15, 30),
('Streak Master', 'Maintain 30-day learning streak', '🔥', 'streak', 30, 100, 200),
('Ubuntu Spirit', 'Share 50 community stories', '❤️', 'stories', 50, 75, 150),
('Health Champion', 'Complete all health courses', '🩺', 'health_modules', 5, 80, 160);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_completed_modules_user_id ON user_completed_modules(user_id);
CREATE INDEX IF NOT EXISTS idx_user_completed_challenges_user_id ON user_completed_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_modules_category ON learning_modules(category);
CREATE INDEX IF NOT EXISTS idx_challenges_type ON challenges(type);
CREATE INDEX IF NOT EXISTS idx_user_stories_user_id ON user_stories(user_id);

COMMIT;
