// Canvas utility functions for drawing UI elements

import { BRAND } from '../config.js';

/**
 * Draw gradient background
 */
export function drawGradientBackground(ctx, width, height, colors) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.5, colors[1]);
  gradient.addColorStop(1, colors[2]);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Draw rounded rectangle
 */
export function drawRoundedRect(ctx, x, y, width, height, radius, fillStyle) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
}

/**
 * Draw text with word wrap
 */
export function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  const lines = [];

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && i > 0) {
      lines.push(line);
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  lines.forEach((line, index) => {
    ctx.fillText(line.trim(), x, currentY);
    currentY += lineHeight;
  });

  return lines.length * lineHeight;
}

/**
 * Draw chat message bubble
 */
export function drawMessageBubble(ctx, message, x, y, maxWidth, isUser) {
  const padding = 24;
  const borderRadius = 24;
  const fontSize = 32;
  const lineHeight = 44;

  ctx.font = `${fontSize}px ${BRAND.fonts.body}`;

  // Calculate bubble dimensions
  const words = message.split(' ');
  let lines = [];
  let line = '';

  for (let word of words) {
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth - (padding * 2) && line !== '') {
      lines.push(line.trim());
      line = word + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim());

  const bubbleWidth = Math.min(maxWidth, ctx.measureText(lines.reduce((a, b) => a.length > b.length ? a : b)).width + (padding * 2));
  const bubbleHeight = (lines.length * lineHeight) + (padding * 2);

  // Draw bubble background
  const bubbleColor = isUser ? BRAND.colors.primary : BRAND.colors.white;
  const textColor = isUser ? BRAND.colors.white : BRAND.colors.text;

  // Add shadow
  ctx.shadowColor = BRAND.colors.shadow;
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 4;

  drawRoundedRect(ctx, x, y, bubbleWidth, bubbleHeight, borderRadius, bubbleColor);

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Draw text
  ctx.fillStyle = textColor;
  ctx.font = `${fontSize}px ${BRAND.fonts.body}`;

  let currentY = y + padding + fontSize;
  lines.forEach(line => {
    ctx.fillText(line, x + padding, currentY);
    currentY += lineHeight;
  });

  return { width: bubbleWidth, height: bubbleHeight };
}

/**
 * Draw typing indicator
 */
export function drawTypingIndicator(ctx, x, y, progress) {
  const dotSize = 12;
  const spacing = 16;
  const bubbleWidth = 100;
  const bubbleHeight = 60;
  const borderRadius = 24;

  // Draw bubble
  ctx.shadowColor = BRAND.colors.shadow;
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 4;

  drawRoundedRect(ctx, x, y, bubbleWidth, bubbleHeight, borderRadius, BRAND.colors.white);

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  // Draw animated dots
  const dotsY = y + bubbleHeight / 2;
  const startX = x + (bubbleWidth - (dotSize * 3 + spacing * 2)) / 2;

  for (let i = 0; i < 3; i++) {
    const dotX = startX + (dotSize + spacing) * i;
    const offset = Math.sin(progress * Math.PI * 2 + i * Math.PI / 3) * 6;

    ctx.beginPath();
    ctx.arc(dotX + dotSize / 2, dotsY + offset, dotSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = BRAND.colors.textLight;
    ctx.fill();
  }
}

/**
 * Draw phone mockup frame
 */
export function drawPhoneMockup(ctx, x, y, width, height) {
  const borderRadius = 60;
  const borderWidth = 12;

  // Phone frame
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 20;

  drawRoundedRect(ctx, x, y, width, height, borderRadius, '#1a1a1a');

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  // Screen area
  const screenX = x + borderWidth;
  const screenY = y + borderWidth;
  const screenWidth = width - borderWidth * 2;
  const screenHeight = height - borderWidth * 2;

  drawRoundedRect(ctx, screenX, screenY, screenWidth, screenHeight, borderRadius - 6, BRAND.colors.backgroundDark);

  // Notch
  const notchWidth = 200;
  const notchHeight = 40;
  const notchX = x + (width - notchWidth) / 2;
  const notchY = y + borderWidth;

  drawRoundedRect(ctx, notchX, notchY, notchWidth, notchHeight, 20, '#1a1a1a');

  return { screenX, screenY, screenWidth, screenHeight };
}

/**
 * Ease in-out function
 */
export function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

/**
 * Ease out function
 */
export function easeOut(t) {
  return t * (2 - t);
}

/**
 * Draw text with center alignment
 */
export function drawCenteredText(ctx, text, x, y, fontSize, color, fontWeight = 'normal') {
  ctx.font = `${fontWeight} ${fontSize}px ${BRAND.fonts.heading}`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}
