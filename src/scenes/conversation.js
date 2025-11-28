// Conversation scene: Animated chat with typing indicators

import { BRAND, VIDEO, CONVERSATION } from '../config.js';
import { drawRoundedRect, drawPhoneMockup, drawMessageBubble, drawTypingIndicator, easeOut } from '../utils/canvas.js';

export function renderConversationScene(ctx, frame, sceneFrame) {
  const { width, height } = VIDEO;
  const sceneDuration = 30 * VIDEO.fps;
  const progress = sceneFrame / sceneDuration;

  // Background
  ctx.fillStyle = BRAND.colors.background;
  ctx.fillRect(0, 0, width, height);

  // Phone mockup
  const phoneWidth = 700;
  const phoneHeight = 1400;
  const phoneX = (width - phoneWidth) / 2;
  const phoneY = (height - phoneHeight) / 2 + 100;

  const screen = drawPhoneMockup(ctx, phoneX, phoneY, phoneWidth, phoneHeight);

  // Status bar
  const statusBarHeight = 60;
  ctx.fillStyle = BRAND.colors.backgroundDark;
  ctx.fillRect(screen.screenX, screen.screenY, screen.screenWidth, statusBarHeight);

  ctx.font = `600 28px ${BRAND.fonts.body}`;
  ctx.fillStyle = BRAND.colors.text;
  ctx.fillText('9:41', screen.screenX + 30, screen.screenY + 42);

  // Chat header
  const headerY = screen.screenY + statusBarHeight;
  const headerHeight = 100;

  ctx.fillStyle = BRAND.colors.white;
  ctx.fillRect(screen.screenX, headerY, screen.screenWidth, headerHeight);

  ctx.font = `bold 38px ${BRAND.fonts.heading}`;
  ctx.fillStyle = BRAND.colors.text;
  ctx.fillText('Luma', screen.screenX + 30, headerY + 50);

  ctx.font = `400 24px ${BRAND.fonts.body}`;
  ctx.fillStyle = BRAND.colors.textLight;
  ctx.fillText('Online', screen.screenX + 30, headerY + 80);

  // Chat area
  const chatY = headerY + headerHeight;
  const chatHeight = screen.screenHeight - statusBarHeight - headerHeight;

  ctx.fillStyle = BRAND.colors.backgroundDark;
  ctx.fillRect(screen.screenX, chatY, screen.screenWidth, chatHeight);

  // Calculate which messages to show based on time
  const timeInScene = sceneFrame / VIDEO.fps;
  let messagesToShow = [];
  let showTyping = false;
  let typingProgress = 0;
  let nextMessageIndex = 0;

  for (let i = 0; i < CONVERSATION.length; i++) {
    const msg = CONVERSATION[i];
    if (timeInScene >= msg.delay) {
      messagesToShow.push({
        ...msg,
        timeSinceAppeared: timeInScene - msg.delay
      });
      nextMessageIndex = i + 1;
    }
  }

  // Check if we should show typing indicator
  if (nextMessageIndex < CONVERSATION.length) {
    const nextMsg = CONVERSATION[nextMessageIndex];
    const timeUntilNext = nextMsg.delay - timeInScene;

    if (timeUntilNext < 1.5 && nextMsg.type === 'luma') {
      showTyping = true;
      typingProgress = (1.5 - timeUntilNext) / 1.5;
    }
  }

  // Calculate scroll offset to keep latest messages visible
  let totalHeight = 0;
  const messageSpacing = 30;
  const maxVisibleHeight = chatHeight - 150;

  // Measure total height first
  const tempMeasurements = [];
  messagesToShow.forEach((msg) => {
    const isUser = msg.type === 'user';
    const maxWidth = screen.screenWidth - 180;

    ctx.font = `32px ${BRAND.fonts.body}`;
    const words = msg.text.split(' ');
    let lines = [];
    let line = '';

    for (let word of words) {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth - 48 && line !== '') {
        lines.push(line.trim());
        line = word + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());

    const bubbleHeight = (lines.length * 44) + 48;
    tempMeasurements.push(bubbleHeight);
    totalHeight += bubbleHeight + messageSpacing;
  });

  const scrollOffset = Math.max(0, totalHeight - maxVisibleHeight);

  // Draw messages
  let currentY = chatY + 40 - scrollOffset;

  messagesToShow.forEach((msg, index) => {
    const isUser = msg.type === 'user';
    const maxWidth = screen.screenWidth - 180;
    const bubbleX = isUser
      ? screen.screenX + screen.screenWidth - maxWidth - 40
      : screen.screenX + 40;

    // Animate message appearance
    const appearProgress = Math.min(1, msg.timeSinceAppeared / 0.3);
    const scale = 0.8 + (0.2 * easeOut(appearProgress));
    const opacity = appearProgress;

    ctx.save();
    ctx.globalAlpha = opacity;

    const dimensions = drawMessageBubble(ctx, msg.text, bubbleX, currentY, maxWidth, isUser);

    ctx.restore();

    currentY += dimensions.height + messageSpacing;
  });

  // Draw typing indicator
  if (showTyping) {
    const typingX = screen.screenX + 40;
    ctx.globalAlpha = typingProgress;
    drawTypingIndicator(ctx, typingX, currentY, typingProgress * 10);
    ctx.globalAlpha = 1;
  }

  // Keyboard area at bottom
  const keyboardHeight = 100;
  const keyboardY = screen.screenY + screen.screenHeight - keyboardHeight;

  ctx.fillStyle = BRAND.colors.white;
  ctx.fillRect(screen.screenX, keyboardY, screen.screenWidth, keyboardHeight);

  // Input field
  drawRoundedRect(
    ctx,
    screen.screenX + 20,
    keyboardY + 20,
    screen.screenWidth - 40,
    60,
    30,
    BRAND.colors.backgroundDark
  );

  ctx.font = `28px ${BRAND.fonts.body}`;
  ctx.fillStyle = BRAND.colors.textLight;
  ctx.fillText('Message', screen.screenX + 50, keyboardY + 58);
}
