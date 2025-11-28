// Intelligence layer scene: Show AI features with animations

import { BRAND, VIDEO, INTELLIGENCE_FEATURES } from '../config.js';
import { drawRoundedRect, drawCenteredText, easeOut, easeInOut } from '../utils/canvas.js';

export function renderIntelligenceLayerScene(ctx, frame, sceneFrame) {
  const { width, height } = VIDEO;
  const sceneDuration = 10 * VIDEO.fps;
  const progress = sceneFrame / sceneDuration;

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, BRAND.colors.background);
  gradient.addColorStop(1, BRAND.colors.backgroundDark);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Title fades in
  const titleOpacity = Math.min(1, progress * 3);
  ctx.globalAlpha = titleOpacity;

  ctx.font = `bold 68px ${BRAND.fonts.heading}`;
  ctx.fillStyle = BRAND.colors.primary;
  ctx.textAlign = 'center';
  ctx.fillText("Luma's Intelligence at Work", width / 2, 250);

  ctx.globalAlpha = 1;

  // Feature cards appear in sequence
  const cardWidth = 900;
  const cardHeight = 140;
  const cardSpacing = 30;
  const startY = 420;

  INTELLIGENCE_FEATURES.forEach((feature, index) => {
    // Stagger the appearance
    const appearDelay = 0.15 + (index * 0.12);
    const cardProgress = Math.max(0, Math.min(1, (progress - appearDelay) / 0.15));

    if (cardProgress > 0) {
      const cardX = (width - cardWidth) / 2;
      const cardY = startY + (index * (cardHeight + cardSpacing));

      // Slide in from right
      const slideOffset = (1 - easeOut(cardProgress)) * 200;
      const opacity = cardProgress;

      ctx.globalAlpha = opacity;

      // Card background with gradient
      const cardGradient = ctx.createLinearGradient(cardX, cardY, cardX + cardWidth, cardY + cardHeight);
      cardGradient.addColorStop(0, BRAND.colors.white);
      cardGradient.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

      ctx.shadowColor = BRAND.colors.shadow;
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 10;

      drawRoundedRect(
        ctx,
        cardX + slideOffset,
        cardY,
        cardWidth,
        cardHeight,
        24,
        cardGradient
      );

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Icon
      ctx.font = `64px ${BRAND.fonts.body}`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(feature.icon, cardX + slideOffset + 50, cardY + cardHeight / 2);

      // Feature text
      ctx.font = `600 42px ${BRAND.fonts.heading}`;
      ctx.fillStyle = BRAND.colors.text;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(feature.text, cardX + slideOffset + 150, cardY + cardHeight / 2);

      // Subtle accent line
      ctx.fillStyle = BRAND.colors.primary;
      ctx.fillRect(cardX + slideOffset, cardY, 8, cardHeight);

      ctx.globalAlpha = 1;
    }
  });

  // Subtitle at bottom
  if (progress > 0.7) {
    const subtitleOpacity = Math.min(1, (progress - 0.7) / 0.3);
    ctx.globalAlpha = subtitleOpacity;

    ctx.font = `italic 44px ${BRAND.fonts.body}`;
    ctx.fillStyle = BRAND.colors.textLight;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('Not therapy. Real-time emotional intelligence.', width / 2, height - 180);

    ctx.globalAlpha = 1;
  }

  // Reset alignment
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}
