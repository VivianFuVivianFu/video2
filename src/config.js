// Luma Brand Colors & Video Configuration

export const BRAND = {
  colors: {
    primary: '#8B7FE8', // Soft purple
    secondary: '#B4A7F5', // Light purple
    accent: '#FFA8D5', // Soft pink
    background: '#FAFBFF', // Off-white
    backgroundDark: '#F5F7FF',
    text: '#2D3748',
    textLight: '#718096',
    white: '#FFFFFF',
    shadow: 'rgba(139, 127, 232, 0.15)',
  },
  gradients: {
    main: 'linear-gradient(135deg, #8B7FE8 0%, #B4A7F5 50%, #FFA8D5 100%)',
    subtle: 'linear-gradient(180deg, #FAFBFF 0%, #F5F7FF 100%)',
    card: 'linear-gradient(135deg, rgba(139, 127, 232, 0.05) 0%, rgba(180, 167, 245, 0.05) 100%)',
  },
  fonts: {
    heading: 'SF Pro Display, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
    body: 'SF Pro Text, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
  }
};

export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
  duration: 60, // seconds
  outputPath: 'demo/luma_producthunt.mp4',
};

// Scene timing (in seconds)
export const TIMELINE = {
  opening: { start: 0, duration: 3 },
  mockupIntro: { start: 3, duration: 5 },
  conversation: { start: 8, duration: 30 },
  intelligenceLayer: { start: 38, duration: 10 },
  valueProps: { start: 48, duration: 6 },
  closing: { start: 54, duration: 6 },
};

// Conversation script
export const CONVERSATION = [
  {
    type: 'user',
    text: "I'm feeling overwhelmed with everything lately…",
    delay: 0,
  },
  {
    type: 'luma',
    text: "I hear you. That feeling of overwhelm is your mind asking for support. Let's gently explore what's weighing on you.",
    delay: 2,
  },
  {
    type: 'user',
    text: "Work deadlines and family expectations. I feel like I'm failing.",
    delay: 5,
  },
  {
    type: 'luma',
    text: "Our inner critic can be loud when we're stretched thin. If your best friend felt this way, would you see them as failing?",
    delay: 7,
  },
  {
    type: 'user',
    text: "No… I'd tell them they're doing their best.",
    delay: 11,
  },
  {
    type: 'luma',
    text: "Exactly. You deserve that same compassion. What's one thing you managed today, even a small win?",
    delay: 13,
  },
  {
    type: 'user',
    text: "I made it to work on time and called my mom.",
    delay: 17,
  },
  {
    type: 'luma',
    text: "That's resilience. Most people shut down under stress. You're still showing up — and that says so much about your strength.",
    delay: 19,
  },
];

// Intelligence layer features
export const INTELLIGENCE_FEATURES = [
  { icon: '🧠', text: 'Emotion detection' },
  { icon: '📊', text: 'Behavioral pattern inference' },
  { icon: '✨', text: 'Personalized micro-interventions' },
  { icon: '💭', text: 'Context memory across conversations' },
  { icon: '🎯', text: 'Psychology-based coaching engines' },
];

// Value proposition cards
export const VALUE_PROPS = [
  { title: 'Feel understood', subtitle: 'instantly.' },
  { title: 'Track emotional', subtitle: 'patterns.' },
  { title: 'Grow with personalized', subtitle: 'guidance.' },
  { title: 'Built for women's real', subtitle: 'emotional journeys.' },
];
