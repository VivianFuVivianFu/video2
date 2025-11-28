// Main rendering pipeline

import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ffmpeg from 'fluent-ffmpeg';

import { VIDEO, TIMELINE } from './config.js';
import { renderOpeningScene } from './scenes/opening.js';
import { renderMockupIntroScene } from './scenes/mockupIntro.js';
import { renderConversationScene } from './scenes/conversation.js';
import { renderIntelligenceLayerScene } from './scenes/intelligenceLayer.js';
import { renderValuePropsScene } from './scenes/valueProps.js';
import { renderClosingScene } from './scenes/closing.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Scene router
function renderFrame(ctx, frameNumber) {
  const timeInSeconds = frameNumber / VIDEO.fps;

  // Determine which scene to render
  if (timeInSeconds < TIMELINE.opening.start + TIMELINE.opening.duration) {
    const sceneFrame = Math.floor((timeInSeconds - TIMELINE.opening.start) * VIDEO.fps);
    renderOpeningScene(ctx, frameNumber, sceneFrame);
  } else if (timeInSeconds < TIMELINE.mockupIntro.start + TIMELINE.mockupIntro.duration) {
    const sceneFrame = Math.floor((timeInSeconds - TIMELINE.mockupIntro.start) * VIDEO.fps);
    renderMockupIntroScene(ctx, frameNumber, sceneFrame);
  } else if (timeInSeconds < TIMELINE.conversation.start + TIMELINE.conversation.duration) {
    const sceneFrame = Math.floor((timeInSeconds - TIMELINE.conversation.start) * VIDEO.fps);
    renderConversationScene(ctx, frameNumber, sceneFrame);
  } else if (timeInSeconds < TIMELINE.intelligenceLayer.start + TIMELINE.intelligenceLayer.duration) {
    const sceneFrame = Math.floor((timeInSeconds - TIMELINE.intelligenceLayer.start) * VIDEO.fps);
    renderIntelligenceLayerScene(ctx, frameNumber, sceneFrame);
  } else if (timeInSeconds < TIMELINE.valueProps.start + TIMELINE.valueProps.duration) {
    const sceneFrame = Math.floor((timeInSeconds - TIMELINE.valueProps.start) * VIDEO.fps);
    renderValuePropsScene(ctx, frameNumber, sceneFrame);
  } else if (timeInSeconds < TIMELINE.closing.start + TIMELINE.closing.duration) {
    const sceneFrame = Math.floor((timeInSeconds - TIMELINE.closing.start) * VIDEO.fps);
    renderClosingScene(ctx, frameNumber, sceneFrame);
  }
}

// Main rendering function
async function render() {
  console.log('🎬 Starting Luma Product Hunt video render...');
  console.log(`📐 Resolution: ${VIDEO.width}x${VIDEO.height}`);
  console.log(`🎞️  FPS: ${VIDEO.fps}`);
  console.log(`⏱️  Duration: ${VIDEO.duration}s`);

  const totalFrames = VIDEO.duration * VIDEO.fps;
  console.log(`📊 Total frames to render: ${totalFrames}`);

  // Create output directories
  const framesDir = path.join(projectRoot, 'temp', 'frames');
  const demoDir = path.join(projectRoot, 'demo');

  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }

  if (!fs.existsSync(demoDir)) {
    fs.mkdirSync(demoDir, { recursive: true });
  }

  // Create canvas
  const canvas = createCanvas(VIDEO.width, VIDEO.height);
  const ctx = canvas.getContext('2d');

  // Render frames
  console.log('\n🎨 Rendering frames...');
  const startTime = Date.now();

  for (let frame = 0; frame < totalFrames; frame++) {
    // Clear canvas
    ctx.clearRect(0, 0, VIDEO.width, VIDEO.height);

    // Render current frame
    renderFrame(ctx, frame);

    // Save frame
    const frameFile = path.join(framesDir, `frame_${String(frame).padStart(5, '0')}.png`);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(frameFile, buffer);

    // Progress
    if (frame % 30 === 0 || frame === totalFrames - 1) {
      const progress = ((frame + 1) / totalFrames * 100).toFixed(1);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const fps = ((frame + 1) / (elapsed || 1)).toFixed(1);
      process.stdout.write(`\r⏳ Progress: ${progress}% (${frame + 1}/${totalFrames}) | ${fps} fps | ${elapsed}s elapsed`);
    }
  }

  console.log('\n\n✅ Frame rendering complete!');

  // Encode video with FFmpeg
  console.log('\n🎥 Encoding video with FFmpeg...');

  const outputPath = path.join(projectRoot, VIDEO.outputPath);

  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(path.join(framesDir, 'frame_%05d.png'))
      .inputFPS(VIDEO.fps)
      .videoCodec('libx264')
      .outputOptions([
        '-pix_fmt yuv420p',
        '-preset medium',
        '-crf 23',
      ])
      .output(outputPath)
      .on('start', (commandLine) => {
        console.log('FFmpeg command:', commandLine);
      })
      .on('progress', (progress) => {
        if (progress.percent) {
          process.stdout.write(`\r⏳ Encoding: ${progress.percent.toFixed(1)}%`);
        }
      })
      .on('end', () => {
        console.log('\n\n🎉 Video render complete!');
        console.log(`📹 Output: ${outputPath}`);

        // Calculate file size
        const stats = fs.statSync(outputPath);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`📦 File size: ${fileSizeMB} MB`);

        // Clean up frames
        console.log('\n🧹 Cleaning up temporary frames...');
        fs.rmSync(framesDir, { recursive: true, force: true });

        const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`⏱️  Total render time: ${totalTime}s`);
        console.log('\n✨ All done! Your Luma Product Hunt video is ready.');

        resolve();
      })
      .on('error', (err) => {
        console.error('\n❌ FFmpeg error:', err.message);
        reject(err);
      })
      .run();
  });
}

// Run
render().catch((err) => {
  console.error('❌ Render failed:', err);
  process.exit(1);
});
