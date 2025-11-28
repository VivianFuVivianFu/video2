# Setup Guide for Luma Product Hunt Video Generator

## Prerequisites

### 1. Node.js
Make sure you have Node.js 16 or higher installed:

```bash
node --version
```

If not installed, download from: https://nodejs.org/

### 2. FFmpeg

FFmpeg is required to encode the final video.

#### Windows Installation:

**Option A: Using Chocolatey (Recommended)**
```bash
choco install ffmpeg
```

**Option B: Manual Installation**
1. Download FFmpeg from https://ffmpeg.org/download.html
2. Extract the archive
3. Add the `bin` folder to your system PATH
4. Verify installation:
```bash
ffmpeg -version
```

#### macOS Installation:
```bash
brew install ffmpeg
```

#### Linux Installation:
```bash
sudo apt update
sudo apt install ffmpeg
```

## Installation Steps

### 1. Install Dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

This will install:
- `canvas` - For rendering graphics
- `fluent-ffmpeg` - For video encoding
- `node-canvas-text` - For text rendering

### 2. Verify Installation

Check that all dependencies are installed:

```bash
npm list
```

### 3. Test FFmpeg

Verify FFmpeg is accessible:

```bash
ffmpeg -version
```

You should see version information.

## Running the Video Generator

### Generate the Full Video

```bash
npm run render
```

This will:
1. Create 1,800 frames (60s × 30fps)
2. Render all 6 scenes with animations
3. Encode the video with FFmpeg
4. Output to `demo/luma_producthunt.mp4`
5. Clean up temporary files

### Expected Output

```
🎬 Starting Luma Product Hunt video render...
📐 Resolution: 1080x1920
🎞️  FPS: 30
⏱️  Duration: 60s
📊 Total frames to render: 1800

🎨 Rendering frames...
⏳ Progress: 100% (1800/1800) | 180 fps | 10.0s elapsed

✅ Frame rendering complete!

🎥 Encoding video with FFmpeg...
⏳ Encoding: 100%

🎉 Video render complete!
📹 Output: demo/luma_producthunt.mp4
📦 File size: 18.45 MB

🧹 Cleaning up temporary frames...
⏱️  Total render time: 90.3s

✨ All done! Your Luma Product Hunt video is ready.
```

## Troubleshooting

### Issue: "canvas" module installation fails

**Windows:**
You may need to install Windows Build Tools:
```bash
npm install --global windows-build-tools
```

Or install Visual Studio Build Tools from:
https://visualstudio.microsoft.com/downloads/

**macOS:**
Install Xcode Command Line Tools:
```bash
xcode-select --install
```

**Linux:**
Install build dependencies:
```bash
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

### Issue: "FFmpeg not found"

Make sure FFmpeg is in your system PATH:

**Windows:**
1. Open System Properties → Environment Variables
2. Edit the PATH variable
3. Add the path to FFmpeg's `bin` folder
4. Restart your terminal

**macOS/Linux:**
Add to your `.bashrc` or `.zshrc`:
```bash
export PATH="/path/to/ffmpeg/bin:$PATH"
```

### Issue: "Out of memory" during rendering

Reduce memory usage by rendering in batches. Edit `src/render.js` to process fewer frames at once.

### Issue: Render is too slow

- Close other applications
- Reduce video quality by editing FFmpeg settings in `src/render.js`
- Use a faster preset: change `-preset medium` to `-preset fast`

## Customization

### Change video duration:
Edit `VIDEO.duration` in [src/config.js](src/config.js)

### Adjust scene timing:
Edit `TIMELINE` object in [src/config.js](src/config.js)

### Modify conversation:
Edit `CONVERSATION` array in [src/config.js](src/config.js)

### Update brand colors:
Edit `BRAND.colors` in [src/config.js](src/config.js)

## Performance Tips

- **Faster rendering:** Use a machine with a good CPU (multi-core)
- **Smaller file size:** Increase CRF value in FFmpeg settings (23 → 28)
- **Higher quality:** Decrease CRF value (23 → 18) or use `-preset slower`
- **Faster encoding:** Use `-preset fast` or `-preset ultrafast`

## Next Steps

Once the video is generated:

1. Review `demo/luma_producthunt.mp4`
2. Upload to your Product Hunt launch page
3. Share on social media
4. Get that 🐱 support!

## Support

If you encounter issues:
1. Check that Node.js and FFmpeg are properly installed
2. Review error messages carefully
3. Try deleting `node_modules` and running `npm install` again
4. Check that you have enough disk space (need ~500MB for temp files)

Happy rendering! ✨
