// Opening scene: Logo reveal and tagline

import { BRAND, VIDEO } from '../config.js';
import { drawGradientBackground, drawCenteredText, easeInOut } from '../utils/canvas.js';

export function renderOpeningScene(ctx, frame, sceneFrame) {
  const { width, height } = VIDEO;
  const progress = sceneFrame / (3 * VIDEO.fps);

  // Gradient background
  const colors = [BRAND.colors.primary, BRAND.colors.secondary, BRAND.colors.accent];
  drawGradientBackground(ctx, width, height, colors);

  // Logo (text-based since we don't have image assets)
  const logoOpacity = Math.min(1, easeInOut(progress * 2));
  ctx.globalAlpha = logoOpacity;

  // "LUMA" logo
  const logoY = height * 0.4;
  ctx.font = `bold 180px ${BRAND.fonts.heading}`;
  ctx.fillStyle = BRAND.colors.white;
  ctx.textAlign = 'center';
  ctx.fillText('LUMA', width / 2, logoY);

  // Subtitle with delay
  if (progress > 0.4) {
    const subtitleOpacity = Math.min(1, (progress - 0.4) / 0.4);
    ctx.globalAlpha = subtitleOpacity;

    // Line 1
    ctx.font = `600 52px ${BRAND.fonts.heading}`;
    ctx.fillStyle = BRAND.colors.white;
    ctx.textAlign = 'center';
    ctx.fillText('Your AI Emotional Companion', width / 2, logoY + 150);

    // Line 2
    ctx.font = `400 42px ${BRAND.fonts.body}`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.textAlign = 'center';
    ctx.fillText('Designed for women who want to', width / 2, logoY + 230);
    ctx.fillText('grow, heal, and feel understood', width / 2, logoY + 290);
  }

  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
}
