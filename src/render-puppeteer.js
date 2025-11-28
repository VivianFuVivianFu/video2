// Browser-based rendering using Puppeteer (works on Windows without build tools)

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
  duration: 60,
};

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

  // Launch browser
  console.log('\n🌐 Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: VIDEO.width,
    height: VIDEO.height,
    deviceScaleFactor: 1,
  });

  // Load the HTML renderer
  const htmlPath = path.join(projectRoot, 'src', 'renderer-clean.html');
  console.log('Loading HTML from:', htmlPath);
  await page.goto(`file://${htmlPath}`, { waitUntil: 'domcontentloaded' });

  // Wait for the renderer to be ready
  await new Promise(resolve => setTimeout(resolve, 500));
  const hasFunction = await page.evaluate(() => {
    return typeof window.renderFrame;
  });

  if (hasFunction !== 'function') {
    throw new Error('renderFrame is not available. Check the HTML file.');
  }

  console.log('✅ Renderer loaded successfully!');

  console.log('\n🎨 Rendering frames...');
  const startTime = Date.now();

  // Render each frame
  for (let frame = 0; frame < totalFrames; frame++) {
    // Set current frame
    await page.evaluate((f) => {
      window.renderFrame(f);
    }, frame);

    // Wait a tiny bit for rendering
    await new Promise(resolve => setTimeout(resolve, 10));

    // Screenshot
    const frameFile = path.join(framesDir, `frame_${String(frame).padStart(5, '0')}.png`);
    await page.screenshot({
      path: frameFile,
      type: 'png',
    });

    // Progress
    if (frame % 30 === 0 || frame === totalFrames - 1) {
      const progress = ((frame + 1) / totalFrames * 100).toFixed(1);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const fps = ((frame + 1) / (elapsed || 1)).toFixed(1);
      process.stdout.write(`\r⏳ Progress: ${progress}% (${frame + 1}/${totalFrames}) | ${fps} fps | ${elapsed}s elapsed`);
    }
  }

  await browser.close();

  console.log('\n\n✅ Frame rendering complete!');

  // Check if FFmpeg is available
  console.log('\n🎥 Encoding video with FFmpeg...');

  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
  } catch (e) {
    console.log('\n⚠️  FFmpeg not found! Please install FFmpeg to encode the video.');
    console.log('📦 Frames saved to:', framesDir);
    console.log('\n📝 To install FFmpeg on Windows:');
    console.log('   1. Download from https://ffmpeg.org/download.html');
    console.log('   2. Or use: choco install ffmpeg');
    console.log('\n Once installed, run this command to encode:');
    console.log(`   ffmpeg -framerate ${VIDEO.fps} -i "${framesDir}\\frame_%05d.png" -c:v libx264 -pix_fmt yuv420p -preset medium -crf 23 "${path.join(demoDir, 'luma_producthunt.mp4')}"`);
    return;
  }

  const outputPath = path.join(demoDir, 'luma_producthunt.mp4');

  const ffmpegCmd = `ffmpeg -y -framerate ${VIDEO.fps} -i "${framesDir}\\frame_%05d.png" -c:v libx264 -pix_fmt yuv420p -preset medium -crf 23 "${outputPath}"`;

  try {
    execSync(ffmpegCmd, { stdio: 'inherit' });

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
  } catch (err) {
    console.error('\n❌ FFmpeg encoding failed:', err.message);
    console.log('📦 Frames saved to:', framesDir);
  }
}

render().catch((err) => {
  console.error('❌ Render failed:', err);
  process.exit(1);
});
