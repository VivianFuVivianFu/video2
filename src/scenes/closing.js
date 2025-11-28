// Closing scene: CTA and Product Hunt message

import { BRAND, VIDEO } from '../config.js';
import { drawRoundedRect, drawPhoneMockup, easeInOut } from '../utils/canvas.js';

export function renderClosingScene(ctx, frame, sceneFrame) {
  const { width, height } = VIDEO;
  const sceneDuration = 6 * VIDEO.fps;
  const progress = sceneFrame / sceneDuration;

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, BRAND.colors.background);
  gradient.addColorStop(1, BRAND.colors.backgroundDark);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Phone mockup (smaller, on the side)
  const phoneWidth = 450;
  const phoneHeight = 900;
  const phoneX = 120;
  const phoneY = (height - phoneHeight) / 2;

  // Phone fades in
  const phoneOpacity = Math.min(1, progress * 2);
  ctx.globalAlpha = phoneOpacity;

  const screen = drawPhoneMockup(ctx, phoneX, phoneY, phoneWidth, phoneHeight);

  // Simple app screen
  ctx.fillStyle = BRAND.colors.backgroundDark;
  ctx.fillRect(screen.screenX, screen.screenY, screen.screenWidth, screen.screenHeight);

  // Luma logo on phone
  ctx.font = `bold 72px ${BRAND.fonts.heading}`;
  const logoGradient = ctx.createLinearGradient(
    screen.screenX,
    screen.screenY + screen.screenHeight / 2 - 100,
    screen.screenX + screen.screenWidth,
    screen.screenY + screen.screenHeight / 2 + 100
  );
  logoGradient.addColorStop(0, BRAND.colors.primary);
  logoGradient.addColorStop(1, BRAND.colors.accent);
  ctx.fillStyle = logoGradient;
  ctx.textAlign = 'center';
  ctx.fillText('LUMA', screen.screenX + screen.screenWidth / 2, screen.screenY + screen.screenHeight / 2);

  ctx.globalAlpha = 1;

  // Main content on the right
  const contentX = phoneX + phoneWidth + 120;
  const contentWidth = width - contentX - 100;

  // Logo text
  if (progress > 0.2) {
    const logoTextOpacity = Math.min(1, (progress - 0.2) / 0.3);
    ctx.globalAlpha = logoTextOpacity;

    ctx.font = `bold 120px ${BRAND.fonts.heading}`;
    ctx.fillStyle = BRAND.colors.primary;
    ctx.textAlign = 'left';
    ctx.fillText('LUMA', contentX, 500);

    ctx.globalAlpha = 1;
  }

  // Main CTA
  if (progress > 0.35) {
    const ctaOpacity = Math.min(1, (progress - 0.35) / 0.3);
    ctx.globalAlpha = ctaOpacity;

    ctx.font = `bold 62px ${BRAND.fonts.heading}`;
    ctx.fillStyle = BRAND.colors.text;
    ctx.textAlign = 'left';
    ctx.fillText('Grow emotionally', contentX, 650);
    ctx.fillText('intelligent.', contentX, 730);

    ctx.globalAlpha = 1;
  }

  // Product Hunt message
  if (progress > 0.5) {
    const phOpacity = Math.min(1, (progress - 0.5) / 0.3);
    ctx.globalAlpha = phOpacity;

    // Accent box
    const boxWidth = contentWidth - 40;
    const boxHeight = 200;
    const boxY = 850;

    ctx.shadowColor = BRAND.colors.shadow;
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;

    const boxGradient = ctx.createLinearGradient(contentX, boxY, contentX + boxWidth, boxY + boxHeight);
    boxGradient.addColorStop(0, BRAND.colors.primary);
    boxGradient.addColorStop(1, BRAND.colors.secondary);

    drawRoundedRect(ctx, contentX, boxY, boxWidth, boxHeight, 24, boxGradient);

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    ctx.font = `600 46px ${BRAND.fonts.heading}`;
    ctx.fillStyle = BRAND.colors.white;
    ctx.textAlign = 'left';
    ctx.fillText('Launching on Product Hunt', contentX + 40, boxY + 65);

    ctx.font = `bold 52px ${BRAND.fonts.heading}`;
    ctx.fillText('Today', contentX + 40, boxY + 130);

    ctx.globalAlpha = 1;
  }

  // Product Hunt cat
  if (progress > 0.65) {
    const catOpacity = Math.min(1, (progress - 0.65) / 0.3);
    ctx.globalAlpha = catOpacity;

    ctx.font = `52px ${BRAND.fonts.body}`;
    ctx.fillStyle = BRAND.colors.text;
    ctx.textAlign = 'left';
    ctx.fillText("We'd love your support! 🐱✨", contentX, 1150);

    ctx.globalAlpha = 1;
  }

  // Download/website text
  if (progress > 0.75) {
    const urlOpacity = Math.min(1, (progress - 0.75) / 0.25);
    ctx.globalAlpha = urlOpacity;

    ctx.font = `400 36px ${BRAND.fonts.body}`;
    ctx.fillStyle = BRAND.colors.textLight;
    ctx.textAlign = 'left';
    ctx.fillText('Download now or visit our website', contentX, height - 150);

    ctx.globalAlpha = 1;
  }

  // Reset
  ctx.textAlign = 'left';
  ctx.globalAlpha = 1;
}
