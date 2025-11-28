// Value proposition cards scene

import { BRAND, VIDEO, VALUE_PROPS } from '../config.js';
import { drawRoundedRect, easeOut, easeInOut } from '../utils/canvas.js';

export function renderValuePropsScene(ctx, frame, sceneFrame) {
  const { width, height } = VIDEO;
  const sceneDuration = 6 * VIDEO.fps;
  const progress = sceneFrame / sceneDuration;

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, BRAND.colors.primary);
  gradient.addColorStop(0.5, BRAND.colors.secondary);
  gradient.addColorStop(1, BRAND.colors.accent);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Cards in 2x2 grid
  const cardWidth = 460;
  const cardHeight = 380;
  const spacing = 60;
  const gridWidth = cardWidth * 2 + spacing;
  const gridHeight = cardHeight * 2 + spacing;
  const startX = (width - gridWidth) / 2;
  const startY = (height - gridHeight) / 2;

  const positions = [
    { x: startX, y: startY }, // Top left
    { x: startX + cardWidth + spacing, y: startY }, // Top right
    { x: startX, y: startY + cardHeight + spacing }, // Bottom left
    { x: startX + cardWidth + spacing, y: startY + cardHeight + spacing }, // Bottom right
  ];

  VALUE_PROPS.forEach((prop, index) => {
    // Stagger appearance
    const appearDelay = 0.1 + (index * 0.15);
    const cardProgress = Math.max(0, Math.min(1, (progress - appearDelay) / 0.2));

    if (cardProgress > 0) {
      const pos = positions[index];

      // Scale and fade in
      const scale = 0.7 + (0.3 * easeOut(cardProgress));
      const opacity = cardProgress;

      ctx.save();
      ctx.globalAlpha = opacity;

      // Translate to card center for scaling
      ctx.translate(pos.x + cardWidth / 2, pos.y + cardHeight / 2);
      ctx.scale(scale, scale);
      ctx.translate(-(cardWidth / 2), -(cardHeight / 2));

      // Card shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 15;

      // Card background
      drawRoundedRect(ctx, 0, 0, cardWidth, cardHeight, 32, BRAND.colors.white);

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Accent color bar
      const accentColors = [
        BRAND.colors.primary,
        BRAND.colors.secondary,
        BRAND.colors.accent,
        BRAND.colors.primary,
      ];
      ctx.fillStyle = accentColors[index];
      ctx.fillRect(0, 0, cardWidth, 12);

      // Icon/Number
      ctx.font = `bold 72px ${BRAND.fonts.heading}`;
      ctx.fillStyle = accentColors[index];
      ctx.textAlign = 'center';
      ctx.fillText(`0${index + 1}`, cardWidth / 2, 120);

      // Title
      ctx.font = `bold 46px ${BRAND.fonts.heading}`;
      ctx.fillStyle = BRAND.colors.text;
      ctx.textAlign = 'center';

      // Word wrap for title
      const words = prop.title.split(' ');
      let line = '';
      let lineY = 210;

      words.forEach((word, i) => {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);

        if (metrics.width > cardWidth - 60 && i > 0) {
          ctx.fillText(line.trim(), cardWidth / 2, lineY);
          line = word + ' ';
          lineY += 55;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line.trim(), cardWidth / 2, lineY);

      // Subtitle
      ctx.font = `600 44px ${BRAND.fonts.heading}`;
      ctx.fillStyle = BRAND.colors.primary;
      ctx.fillText(prop.subtitle, cardWidth / 2, lineY + 60);

      ctx.restore();
    }
  });

  // Reset text alignment
  ctx.textAlign = 'left';
}
