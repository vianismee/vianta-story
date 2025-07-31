/*
  # Add Sample Blog Data

  1. Sample Data
    - Insert sample blog posts for testing
    - Create corresponding post metrics

  2. Notes
    - This is optional sample data for development/testing
    - Remove or modify as needed for production
*/

-- Insert sample blog posts
INSERT INTO blog_post (post_slug, title, content, header_image_url) VALUES
(
  'welcome-to-vianta-story',
  'Welcome to Vianta Story',
  '{
    "type": "doc",
    "content": [
      {
        "type": "heading",
        "attrs": { "level": 1 },
        "content": [{ "type": "text", "text": "Welcome to Vianta Story" }]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Welcome to our blog! This is where we share our adventures, discoveries, and stories from around the world."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Whether you''re looking for travel inspiration, cozy cafe recommendations, or just want to read about our latest adventures, you''ve come to the right place."
          }
        ]
      },
      {
        "type": "blockquote",
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "Every journey begins with a single step, and every story begins with a single word."
              }
            ]
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Stay tuned for more exciting content coming your way!"
          }
        ]
      }
    ]
  }',
  'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
),
(
  'best-cozy-cafes-in-town',
  'Best Cozy Cafes in Town',
  '{
    "type": "doc",
    "content": [
      {
        "type": "heading",
        "attrs": { "level": 1 },
        "content": [{ "type": "text", "text": "Best Cozy Cafes in Town" }]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "There''s nothing quite like finding the perfect cafe - a place where the coffee is exceptional, the atmosphere is warm, and you can spend hours lost in a good book or deep conversation."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": { "level": 2 },
        "content": [{ "type": "text", "text": "The Morning Brew" }]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Located in the heart of downtown, The Morning Brew offers the perfect blend of rustic charm and modern comfort. Their signature latte art is almost too beautiful to drink!"
          }
        ]
      },
      {
        "type": "heading",
        "attrs": { "level": 2 },
        "content": [{ "type": "text", "text": "Cozy Corner Cafe" }]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "True to its name, this little gem tucked away on Maple Street feels like your grandmother''s living room - if your grandmother made the best pastries in town."
          }
        ]
      },
      {
        "type": "blockquote",
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "A good cafe is like a good friend - it''s there when you need it, makes you feel better, and never judges you for ordering that third cup of coffee."
              }
            ]
          }
        ]
      }
    ]
  }',
  'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
),
(
  'travel-photography-tips',
  'Essential Travel Photography Tips',
  '{
    "type": "doc",
    "content": [
      {
        "type": "heading",
        "attrs": { "level": 1 },
        "content": [{ "type": "text", "text": "Essential Travel Photography Tips" }]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Capturing the essence of your travels through photography is an art form that combines technical skill with creative vision. Here are some essential tips to help you take stunning travel photos."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": { "level": 2 },
        "content": [{ "type": "text", "text": "Golden Hour Magic" }]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "The hour after sunrise and before sunset provides the most flattering natural light. Plan your shoots around these times for warm, soft lighting that makes everything look magical."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": { "level": 2 },
        "content": [{ "type": "text", "text": "Tell a Story" }]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "The best travel photos don''t just show a place - they tell a story. Include people, capture emotions, and look for moments that convey the spirit of your destination."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Remember, the best camera is the one you have with you. Don''t let perfect equipment stop you from capturing perfect moments!"
          }
        ]
      }
    ]
  }',
  'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
);