# Luma Product Hunt Launch Video Generator

A professional video rendering system that creates a polished, cinematic Product Hunt launch video for Luma AI.

## 🎬 Video Specifications

- **Resolution:** 1080x1920 (Portrait)
- **Duration:** 60 seconds
- **FPS:** 30
- **Output:** `/demo/luma_producthunt.mp4`

## 📋 Video Structure

### 1. Opening (0-3s)
Soft gradient background with Luma logo and tagline

### 2. Mockup Intro (3-8s)
Mobile UI mockup with "Powered by psychology, neuroscience, and emotional intelligence"

### 3. Conversation Demo (8-38s)
Animated chat conversation showing:
- User expressing feelings of overwhelm
- Luma providing empathetic, psychology-based responses
- Typing indicators and smooth animations
- Real mobile UI components

### 4. Intelligence Layer (38-48s)
Feature cards showing:
- Emotion detection
- Behavioral pattern inference
- Personalized micro-interventions
- Context memory
- Psychology-based coaching

### 5. Value Propositions (48-54s)
Four animated cards highlighting:
- Feel understood instantly
- Track emotional patterns
- Grow with personalized guidance
- Built for women's real emotional journeys

### 6. Closing (54-60s)
Call-to-action with Product Hunt launch announcement + cat emoji 🐱✨

## 🚀 Installation

```bash
npm install
```

### Requirements

- Node.js 16+
- FFmpeg installed and available in PATH

#### Installing FFmpeg:

**Windows:**
```bash
# Using Chocolatey
choco install ffmpeg

# Or download from https://ffmpeg.org/download.html
```

**macOS:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt install ffmpeg
```

## 🎨 Usage

### Render the complete video:

```bash
npm run render
```

This will:
1. Generate 1800 frames (60 seconds × 30 fps)
2. Render all scenes with animations
3. Encode to MP4 using FFmpeg
4. Save to `demo/luma_producthunt.mp4`
5. Clean up temporary files

## 📁 Project Structure

```
producthunt video/
├── src/
│   ├── config.js                 # Brand colors, timeline, conversation script
│   ├── render.js                 # Main rendering pipeline
│   ├── utils/
│   │   └── canvas.js            # Canvas drawing utilities
│   └── scenes/
│       ├── opening.js           # Logo reveal scene
│       ├── mockupIntro.js       # Phone mockup intro
│       ├── conversation.js      # Animated chat conversation
│       ├── intelligenceLayer.js # AI features visualization
│       ├── valueProps.js        # Value proposition cards
│       └── closing.js           # CTA and closing
├── demo/                        # Output directory
│   └── luma_producthunt.mp4    # Final video
├── temp/                        # Temporary frames (auto-deleted)
├── package.json
└── README.md
```

## 🎨 Brand Colors

- **Primary:** `#8B7FE8` (Soft purple)
- **Secondary:** `#B4A7F5` (Light purple)
- **Accent:** `#FFA8D5` (Soft pink)
- **Background:** `#FAFBFF` (Off-white)

## ✨ Features

- **High-quality rendering** with smooth animations
- **Mobile UI mockup** with realistic phone frame
- **Typing indicators** with animated dots
- **Smooth transitions** between scenes
- **Professional shadows and gradients**
- **Automated FFmpeg encoding**
- **Progress tracking** during render

## 🛠️ Customization

### Modify conversation:
Edit `CONVERSATION` in [src/config.js](src/config.js)

### Adjust timing:
Edit `TIMELINE` in [src/config.js](src/config.js)

### Change colors:
Edit `BRAND.colors` in [src/config.js](src/config.js)

### Modify scenes:
Edit individual scene files in [src/scenes/](src/scenes/)

## 📊 Performance

Typical render time on modern hardware:
- Frame generation: ~5-10 minutes
- FFmpeg encoding: ~1-2 minutes
- **Total:** ~6-12 minutes

Output file size: ~15-25 MB

## 🎯 Production Quality

This video generator creates product-launch quality content with:
- Cinematic transitions
- Professional typography
- Smooth animations
- Warm, empowering visual style
- Clear value proposition
- Strong call-to-action

Perfect for Product Hunt launches! 🐱✨
