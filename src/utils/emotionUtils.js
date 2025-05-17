const emotionData = require('../assets/emotion-wheel.json');

function getEmotionData() {
  return emotionData.emotions;
}

// Emoji-Emotion mapping logic implementing hierarchical emotion classification
// Object-oriented structure for easy integration into emotion analysis systems

class EmojiEmotionMapper {
  constructor(emojiData) {
    this.emojiMap = new Map();
    this.initializeData(emojiData);
    this.emotionScale = {
      "Happy": { baseScore: 75, weight: 1.0 },
      "Surprised": { baseScore: 60, weight: 0.8 },
      "Neutral": { baseScore: 50, weight: 0.5 },
      "Sad": { baseScore: 35, weight: -0.6 },
      "Fearful": { baseScore: 25, weight: -0.7 },
      "Angry": { baseScore: 15, weight: -0.8 },
      "Disgusted": { baseScore: 10, weight: -0.9 }
    };
  }

  initializeData(data) {
    // Parse CSV data
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',');
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const emoji = values[0];
      const unicode = values[1];
      const score = parseInt(values[2], 10);
      const primary = values[3];
      const secondary = values[4];
      const tertiary = values[5];
      const nlTertiary = values[6] || tertiary;

      this.emojiMap.set(unicode, {
        emoji,
        unicode,
        score,
        emotion: {
          primary,
          secondary,
          tertiary
        },
        translations: {
          nl: {
            tertiary: nlTertiary
          }
        }
      });
      
      // Enable emoji lookup as well
      this.emojiMap.set(emoji, this.emojiMap.get(unicode));
    }
  }

  // Get emotion data for an emoji
  getEmotionData(emoji) {
    return this.emojiMap.get(emoji);
  }

  // Find emojis that express a specific tertiary emotion
  findEmojisByEmotion(emotionName, level = 'tertiary') {
    const results = [];
    this.emojiMap.forEach((data, key) => {
      if (typeof key === 'string' && key.startsWith('U+')) { // Only process unicode entries
        if (data.emotion[level]?.toLowerCase() === emotionName.toLowerCase()) {
          results.push(data);
        }
      }
    });
    return results;
  }

  // Map a text sentiment score (0-100) to appropriate emojis
  getEmojisForSentimentScore(score) {
    const closestEmojis = [];
    const threshold = 10; // Acceptable distance from score
    
    this.emojiMap.forEach((data, key) => {
      if (typeof key === 'string' && key.startsWith('U+')) {
        const distance = Math.abs(data.score - score);
        if (distance <= threshold) {
          closestEmojis.push({
            emoji: data.emoji,
            score: data.score,
            distance: distance
          });
        }
      }
    });
    
    // Sort by closest match
    return closestEmojis.sort((a, b) => a.distance - b.distance);
  }

  // Get visualization coordinates for emotion wheel
  getWheelCoordinates(emoji) {
    const data = this.getEmotionData(emoji);
    if (!data) return null;
    
    const angle = (data.score / 100) * 2 * Math.PI;
    let radius = 0.5; // Default radius
    
    // Adjust radius based on emotion intensity
    if (['Terrified', 'Furious', 'Revolted', 'Delighted', 'Ecstatic'].includes(data.emotion.tertiary)) {
      radius = 0.9; // High intensity emotions are closer to edge
    } else if (['Sad', 'Worried', 'Annoyed', 'Pleasant', 'Relaxed'].includes(data.emotion.tertiary)) {
      radius = 0.6; // Medium intensity
    } else {
      radius = 0.3; // Low intensity
    }
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      emotion: data.emotion,
      score: data.score
    };
  }
}

// Usage example:
function initializeEmojiEmotionSystem(csvData) {
  const mapper = new EmojiEmotionMapper(csvData);
  
  // Examples:
  // Find happy emojis
  const happyEmojis = mapper.findEmojisByEmotion('Happy', 'primary');
  
  // Get emojis for a sentiment score of 75
  const matchingEmojis = mapper.getEmojisForSentimentScore(75);
  
  // Get wheel coordinates for visualization
  const happyCoords = mapper.getWheelCoordinates('😁');
  
  return mapper;
}

/**
 * Get emoticons matching a mood score and intensity level
 * @param {number} moodScore - Value from 1-100 (bad to good)
 * @param {number} intensity - Value from 1-10 (low to high)
 * @param {number} limit - Max number of emoticons to return (default 8)
 * @returns {Array} Array of matching emotion objects
 */
function getMatchingEmoticons(moodScore, intensity, limit = 8) {
  // Map intensity from 1-10 scale to low/medium/high
  let intensityLevel;
  if (intensity <= 3) intensityLevel = 'low';
  else if (intensity <= 7) intensityLevel = 'medium';
  else intensityLevel = 'high';
  
  // Clone emotion icons array from the module scope
  const emotionIcons = [
    { emoji: '🤮', unicode: 'U+1F92E', score: 5, primary: 'Disgust', secondary: 'Revulsion', arousal: 'high' },
    { emoji: '🤢', unicode: 'U+1F922', score: 8, primary: 'Disgust', secondary: 'Nausea', arousal: 'medium' },
    { emoji: '😡', unicode: 'U+1F621', score: 10, primary: 'Anger', secondary: 'Rage', arousal: 'high' },
    { emoji: '🤬', unicode: 'U+1F92C', score: 12, primary: 'Anger', secondary: 'Fury', arousal: 'high' },
    { emoji: '😠', unicode: 'U+1F620', score: 15, primary: 'Anger', secondary: 'Annoyance', arousal: 'medium' },
    { emoji: '😭', unicode: 'U+1F62D', score: 18, primary: 'Sadness', secondary: 'Grief', arousal: 'high' },
    { emoji: '😨', unicode: 'U+1F628', score: 20, primary: 'Fear', secondary: 'Terror', arousal: 'high' },
    { emoji: '🫨', unicode: 'U+1FAE8', score: 22, primary: 'Fear', secondary: 'Anxiety', arousal: 'high' },
    { emoji: '😱', unicode: 'U+1F631', score: 25, primary: 'Fear', secondary: 'Shock', arousal: 'high' },
    { emoji: '😰', unicode: 'U+1F630', score: 28, primary: 'Fear', secondary: 'Anxiety', arousal: 'medium' },
    { emoji: '😖', unicode: 'U+1F616', score: 30, primary: 'Disgust', secondary: 'Suffering', arousal: 'medium' },
    { emoji: '🥹', unicode: 'U+1F979', score: 32, primary: 'Sadness', secondary: 'Hurt', arousal: 'medium' },
    { emoji: '😢', unicode: 'U+1F622', score: 35, primary: 'Sadness', secondary: 'Sorrow', arousal: 'medium' },
    { emoji: '🫠', unicode: 'U+1FAE0', score: 37, primary: 'Sadness', secondary: 'Resignation', arousal: 'low' },
    { emoji: '😣', unicode: 'U+1F623', score: 38, primary: 'Sadness', secondary: 'Struggle', arousal: 'medium' },
    { emoji: '😫', unicode: 'U+1F62B', score: 40, primary: 'Sadness', secondary: 'Exhaustion', arousal: 'medium' },
    { emoji: '😩', unicode: 'U+1F629', score: 42, primary: 'Sadness', secondary: 'Weariness', arousal: 'medium' },
    { emoji: '🥲', unicode: 'U+1F972', score: 45, primary: 'Sadness', secondary: 'Hope', arousal: 'low' },
    { emoji: '😐', unicode: 'U+1F610', score: 48, primary: 'Neutral', secondary: 'Blank', arousal: 'low' },
    { emoji: '😑', unicode: 'U+1F611', score: 50, primary: 'Neutral', secondary: 'Expressionless', arousal: 'low' },
    { emoji: '😶', unicode: 'U+1F636', score: 52, primary: 'Neutral', secondary: 'Empty', arousal: 'low' },
    { emoji: '🫥', unicode: 'U+1FAE5', score: 54, primary: 'Neutral', secondary: 'Hidden', arousal: 'low' },
    { emoji: '😬', unicode: 'U+1F62C', score: 55, primary: 'Neutral', secondary: 'Awkward', arousal: 'medium' },
    { emoji: '🤨', unicode: 'U+1F928', score: 56, primary: 'Surprise', secondary: 'Skepticism', arousal: 'low' },
    { emoji: '😕', unicode: 'U+1F615', score: 58, primary: 'Surprise', secondary: 'Confusion', arousal: 'low' },
    { emoji: '🫣', unicode: 'U+1FAE3', score: 60, primary: 'Surprise', secondary: 'Curiosity', arousal: 'medium' },
    { emoji: '🙂', unicode: 'U+1F642', score: 62, primary: 'Joy', secondary: 'Mild_Happiness', arousal: 'low' },
    { emoji: '😉', unicode: 'U+1F609', score: 65, primary: 'Joy', secondary: 'Playfulness', arousal: 'medium' },
    { emoji: '😊', unicode: 'U+1F60A', score: 68, primary: 'Joy', secondary: 'Contentment', arousal: 'low' },
    { emoji: '😇', unicode: 'U+1F607', score: 70, primary: 'Joy', secondary: 'Serenity', arousal: 'low' },
    { emoji: '😌', unicode: 'U+1F60C', score: 72, primary: 'Joy', secondary: 'Peace', arousal: 'low' },
    { emoji: '😋', unicode: 'U+1F60B', score: 75, primary: 'Joy', secondary: 'Satisfaction', arousal: 'medium' },
    { emoji: '😄', unicode: 'U+1F604', score: 78, primary: 'Joy', secondary: 'Cheerfulness', arousal: 'medium' },
    { emoji: '😎', unicode: 'U+1F60E', score: 80, primary: 'Joy', secondary: 'Confidence', arousal: 'medium' },
    { emoji: '😍', unicode: 'U+1F60D', score: 85, primary: 'Love', secondary: 'Adoration', arousal: 'medium' },
    { emoji: '🤩', unicode: 'U+1F929', score: 88, primary: 'Excitement', secondary: 'Amazement', arousal: 'high' },
    { emoji: '😂', unicode: 'U+1F602', score: 90, primary: 'Excitement', secondary: 'Laughter', arousal: 'high' },
    { emoji: '🥰', unicode: 'U+1F970', score: 95, primary: 'Love', secondary: 'Affection', arousal: 'medium' },
    { emoji: '😁', unicode: 'U+1F601', score: 100, primary: 'Love', secondary: 'Ecstasy', arousal: 'high' }
  ];
  
  // First filter by matching intensity level
  let matchingEmotions = emotionIcons.filter(emotion => emotion.arousal === intensityLevel);
  
  // If we don't have enough matches with exact intensity, get some close matches
  if (matchingEmotions.length < limit) {
    // Sort all emotions by how close their score is to the target mood score
    const sortedEmotions = [...emotionIcons].sort((a, b) => {
      return Math.abs(a.score - moodScore) - Math.abs(b.score - moodScore);
    });
    
    // Take the closest ones not already in matching emotions
    for (const emotion of sortedEmotions) {
      if (!matchingEmotions.includes(emotion)) {
        matchingEmotions.push(emotion);
      }
      if (matchingEmotions.length >= limit) break;
    }
  } else {
    // Sort by score proximity if we have enough matches
    matchingEmotions.sort((a, b) => {
      return Math.abs(a.score - moodScore) - Math.abs(b.score - moodScore);
    });
  }
  
  // Return the top matches (up to the limit)
  return matchingEmotions.slice(0, limit);
}

/**
 * Find emotions by name, using bidirectional lookup
 * @param {string} query - Emotion name to search for
 * @return {Array} - Matching emotions
 */
function findEmotionsByName(query) {
  const emotionData = getEmotionData();
  const results = [];
  const lowercaseQuery = query.toLowerCase();
  
  // Search through all primary emotions
  emotionData.forEach(primary => {
    if (primary.primary.en.toLowerCase().includes(lowercaseQuery)) {
      results.push({
        type: 'primary',
        primary: primary.primary.en,
        value: primary.primary.en
      });
    }
    
    // Search through secondary emotions
    primary.secondaryEmotions.forEach(secondary => {
      if (secondary.secondary.en.toLowerCase().includes(lowercaseQuery)) {
        results.push({
          type: 'secondary',
          primary: primary.primary.en,
          value: secondary.secondary.en
        });
      }
      
      // Search through tertiary emotions
      secondary.tertiaryEmotions.forEach(tertiary => {
        if (tertiary.en.toLowerCase().includes(lowercaseQuery)) {
          results.push({
            type: 'tertiary',
            primary: primary.primary.en,
            secondary: secondary.secondary.en,
            value: tertiary.en
          });
        }
      });
    });
  });
  
  return results;
}

// Export for module use (use CommonJS style to match your project)
module.exports = { 
  getEmotionData,
  getMatchingEmoticons,
  findEmotionsByName,
  EmojiEmotionMapper,
  initializeEmojiEmotionSystem
};