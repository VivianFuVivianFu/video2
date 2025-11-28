// Mockup intro scene: Show phone with tagline

import { BRAND, VIDEO } from '../config.js';
import { drawRoundedRect, drawPhoneMockup, drawCenteredText, easeOut } from '../utils/canvas.js';

export function renderMockupIntroScene(ctx, frame, sceneFrame) {
  const { width, height } = VIDEO;
  const progress = sceneFrame / (5 * VIDEO.fps);

  // Background
  ctx.fillStyle = BRAND.colors.background;
  ctx.fillRect(0, 0, width, height);

  // Phone mockup slides in from bottom
  const phoneWidth = 700;
  const phoneHeight = 1400;
  const phoneX = (width - phoneWidth) / 2;
  const targetY = (height - phoneHeight) / 2 + 100;
  const startY = height + 100;
  const phoneY = startY + (targetY - startY) * easeOut(progress);

  const screen = drawPhoneMockup(ctx, phoneX, phoneY, phoneWidth, phoneHeight);

  // Status bar
  const statusBarHeight = 60;
  ctx.fillStyle = BRAND.colors.backgroundDark;
  ctx.fillRect(screen.screenX, screen.screenY, screen.screenWidth, statusBarHeight);

  // Time
  ctx.font = `600 28px ${BRAND.fonts.body}`;
  ctx.fillStyle = BRAND.colors.text;
  ctx.fillText('9:41', screen.screenX + 30, screen.screenY + 42);

  // Battery indicator
  ctx.strokeStyle = BRAND.colors.text;
  ctx.lineWidth = 2;
  ctx.strokeRect(screen.screenX + screen.screenWidth - 60, screen.screenY + 22, 40, 20);
  ctx.fillRect(screen.screenX + screen.screenWidth - 18, screen.screenY + 28, 4, 8);
  ctx.fillStyle = BRAND.colors.text;
  ctx.fillRect(screen.screenX + screen.screenWidth - 56, screen.screenY + 26, 32, 12);

  // Chat header
  const headerY = screen.screenY + statusBarHeight;
  const headerHeight = 120;

  ctx.fillStyle = BRAND.colors.white;
  ctx.fillRect(screen.screenX, headerY, screen.screenWidth, headerHeight);

  // Luma name and status
  ctx.font = `bold 42px ${BRAND.fonts.heading}`;
  ctx.fillStyle = BRAND.colors.text;
  ctx.fillText('Luma', screen.screenX + 30, headerY + 55);

  ctx.font = `400 28px ${BRAND.fonts.body}`;
  ctx.fillStyle = BRAND.colors.textLight;
  ctx.fillText('Always here for you', screen.screenX + 30, headerY + 95);

  // Chat background
  const chatY = headerY + headerHeight;
  const chatHeight = screen.screenHeight - statusBarHeight - headerHeight - 100;

  ctx.fillStyle = BRAND.colors.backgroundDark;
  ctx.fillRect(screen.screenX, chatY, screen.screenWidth, chatHeight);

  // Welcome message in center
  const welcomeY = chatY + chatHeight / 2;
  const bubbleWidth = screen.screenWidth - 100;
  const bubblePadding = 30;

  // Shadow
  ctx.shadowColor = BRAND.colors.shadow;
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 4;

  drawRoundedRect(
    ctx,
    screen.screenX + 50,
    welcomeY - 100,
    bubbleWidth,
    200,
    24,
    BRAND.colors.white
  );

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  ctx.font = `400 32px ${BRAND.fonts.body}`;
  ctx.fillStyle = BRAND.colors.text;
  ctx.textAlign = 'center';
  ctx.fillText('Hi there! How are you feeling today?', screen.screenX + screen.screenWidth / 2, welcomeY - 20);
  ctx.fillText('I'm here to listen and support you.', screen.screenX + screen.screenWidth / 2, welcomeY + 25);
  ctx.textAlign = 'left';

  // Tagline appears above phone
  if (progress > 0.3) {
    const taglineOpacity = Math.min(1, (progress - 0.3) / 0.5);
    ctx.globalAlpha = taglineOpacity;

    ctx.font = `600 48px ${BRAND.fonts.heading}`;
    ctx.fillStyle = BRAND.colors.primary;
    ctx.textAlign = 'center';
    ctx.fillText('Powered by psychology, neuroscience,', width / 2, targetY - 120);
    ctx.fillText('and emotional intelligence', width / 2, targetY - 60);

    ctx.globalAlpha = 1;
    ctx.textAlign = 'left';
  }
}
