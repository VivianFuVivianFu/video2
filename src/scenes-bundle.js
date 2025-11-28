// All scene rendering functions - included directly in HTML to avoid module/escaping issues

const BRAND = {
  colors: {
    primary: '#8B7FE8',
    secondary: '#B4A7F5',
    accent: '#FFA8D5',
    background: '#FAFBFF',
    backgroundDark: '#F5F7FF',
    text: '#2D3748',
    textLight: '#718096',
    white: '#FFFFFF',
    shadow: 'rgba(139, 127, 232, 0.15)',
  },
};

const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
  duration: 60,
};

const TIMELINE = {
  opening: { start: 0, duration: 3 },
  mockupIntro: { start: 3, duration: 5 },
  conversation: { start: 8, duration: 30 },
  intelligenceLayer: { start: 38, duration: 10 },
  valueProps: { start: 48, duration: 6 },
  closing: { start: 54, duration: 6 },
};

const CONVERSATION = [
  { type: 'user', text: "I\u0027m feeling overwhelmed with everything lately…", delay: 0 },
  { type: 'luma', text: "I hear you. That feeling of overwhelm is your mind asking for support. Let\u0027s gently explore what\u0027s weighing on you.", delay: 2 },
  { type: 'user', text: "Work deadlines and family expectations. I feel like I\u0027m failing.", delay: 5 },
  { type: 'luma', text: "Our inner critic can be loud when we\u0027re stretched thin. If your best friend felt this way, would you see them as failing?", delay: 7 },
  { type: 'user', text: "No… I\u0027d tell them they\u0027re doing their best.", delay: 11 },
  { type: 'luma', text: "Exactly. You deserve that same compassion. What\u0027s one thing you managed today, even a small win?", delay: 13 },
  { type: 'user', text: "I made it to work on time and called my mom.", delay: 17 },
  { type: 'luma', text: "That\u0027s resilience. Most people shut down under stress. You\u0027re still showing up — and that says so much about your strength.", delay: 19 },
];

// Utility functions
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function easeOut(t) {
  return t * (2 - t);
}

function drawGradient(ctx, x, y, w, h, colors) {
  const gradient = ctx.createLinearGradient(x, y, x + w, y + h);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.5, colors[1]);
  gradient.addColorStop(1, colors[2]);
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, w, h);
}

function drawRoundedRect(ctx, x, y, w, h, r, fill) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
}

// Scene functions
function renderOpeningScene(ctx, frame, sceneFrame) {
  const progress = sceneFrame / (3 * VIDEO.fps);
  drawGradient(ctx, 0, 0, VIDEO.width, VIDEO.height, [BRAND.colors.primary, BRAND.colors.secondary, BRAND.colors.accent]);

  const opacity = Math.min(1, easeInOut(progress * 2));
  ctx.globalAlpha = opacity;
  ctx.font = 'bold 180px Arial';
  ctx.fillStyle = BRAND.colors.white;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('LUMA', VIDEO.width / 2, VIDEO.height * 0.4);

  if (progress > 0.4) {
    const subtitleOpacity = Math.min(1, (progress - 0.4) / 0.4);
    ctx.globalAlpha = subtitleOpacity;
    ctx.font = '600 52px Arial';
    ctx.fillText('Your AI Emotional Companion', VIDEO.width / 2, VIDEO.height * 0.4 + 150);
    ctx.font = '400 42px Arial';
    ctx.fillText('Designed for women who want to', VIDEO.width / 2, VIDEO.height * 0.4 + 230);
    ctx.fillText('grow, heal, and feel understood', VIDEO.width / 2, VIDEO.height * 0.4 + 290);
  }

  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}

function renderMockupIntroScene(ctx, frame, sceneFrame) {
  const progress = sceneFrame / (5 * VIDEO.fps);
  ctx.fillStyle = BRAND.colors.background;
  ctx.fillRect(0, 0, VIDEO.width, VIDEO.height);

  const phoneWidth = 700;
  const phoneHeight = 1400;
  const phoneX = (VIDEO.width - phoneWidth) / 2;
  const targetY = (VIDEO.height - phoneHeight) / 2 + 100;
  const startY = VIDEO.height + 100;
  const phoneY = startY + (targetY - startY) * easeOut(progress);

  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 20;
  drawRoundedRect(ctx, phoneX, phoneY, phoneWidth, phoneHeight, 60, '#1a1a1a');

  ctx.shadowColor = 'transparent';
  const screenX = phoneX + 12;
  const screenY = phoneY + 12;
  const screenWidth = phoneWidth - 24;
  const screenHeight = phoneHeight - 24;
  drawRoundedRect(ctx, screenX, screenY, screenWidth, screenHeight, 54, BRAND.colors.backgroundDark);

  ctx.fillStyle = BRAND.colors.white;
  ctx.fillRect(screenX, screenY + 60, screenWidth, 120);
  ctx.font = 'bold 42px Arial';
  ctx.fillStyle = BRAND.colors.text;
  ctx.textAlign = 'left';
  ctx.fillText('Luma', screenX + 30, screenY + 110);

  const welcomeY = screenY + screenHeight / 2;
  ctx.shadowColor = BRAND.colors.shadow;
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 4;
  drawRoundedRect(ctx, screenX + 50, welcomeY - 100, screenWidth - 100, 200, 24, BRAND.colors.white);

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.font = '400 32px Arial';
  ctx.fillStyle = BRAND.colors.text;
  ctx.textAlign = 'center';
  ctx.fillText('Hi there! How are you feeling today?', screenX + screenWidth / 2, welcomeY - 20);
  ctx.fillText("I'm here to listen and support you.", screenX + screenWidth / 2, welcomeY + 25);

  if (progress > 0.3) {
    ctx.globalAlpha = Math.min(1, (progress - 0.3) / 0.5);
    ctx.font = '600 48px Arial';
    ctx.fillStyle = BRAND.colors.primary;
    ctx.fillText('Powered by psychology, neuroscience,', VIDEO.width / 2, targetY - 120);
    ctx.fillText('and emotional intelligence', VIDEO.width / 2, targetY - 60);
    ctx.globalAlpha = 1;
  }

  ctx.textAlign = 'left';
}

function renderConversationScene(ctx, frame, sceneFrame) {
  const timeInScene = sceneFrame / VIDEO.fps;
  ctx.fillStyle = BRAND.colors.background;
  ctx.fillRect(0, 0, VIDEO.width, VIDEO.height);

  const phoneWidth = 700;
  const phoneHeight = 1400;
  const phoneX = (VIDEO.width - phoneWidth) / 2;
  const phoneY = (VIDEO.height - phoneHeight) / 2 + 100;

  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 20;
  drawRoundedRect(ctx, phoneX, phoneY, phoneWidth, phoneHeight, 60, '#1a1a1a');

  ctx.shadowColor = 'transparent';
  const screenX = phoneX + 12;
  const screenY = phoneY + 12;
  const screenWidth = phoneWidth - 24;
  const screenHeight = phoneHeight - 24;
  drawRoundedRect(ctx, screenX, screenY, screenWidth, screenHeight, 54, BRAND.colors.backgroundDark);

  ctx.fillStyle = BRAND.colors.white;
  ctx.fillRect(screenX, screenY + 60, screenWidth, 100);
  ctx.font = 'bold 38px Arial';
  ctx.fillStyle = BRAND.colors.text;
  ctx.textAlign = 'left';
  ctx.fillText('Luma', screenX + 30, screenY + 110);

  let messagesToShow = CONVERSATION.filter(msg => timeInScene >= msg.delay);
  let currentY = screenY + 200;

  messagesToShow.forEach((msg) => {
    const isUser = msg.type === 'user';
    const maxWidth = screenWidth - 180;
    const bubbleX = isUser ? screenX + screenWidth - maxWidth - 40 : screenX + 40;

    const appearProgress = Math.min(1, (timeInScene - msg.delay) / 0.3);
    ctx.globalAlpha = appearProgress;

    ctx.shadowColor = BRAND.colors.shadow;
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 4;

    ctx.font = '32px Arial';
    const lines = [];
    let line = '';
    const words = msg.text.split(' ');

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
    const longestLine = lines.reduce((a, b) => a.length > b.length ? a : b);
    const bubbleWidth = Math.min(maxWidth, ctx.measureText(longestLine).width + 48);

    drawRoundedRect(ctx, bubbleX, currentY, bubbleWidth, bubbleHeight, 24, isUser ? BRAND.colors.primary : BRAND.colors.white);

    ctx.shadowColor = 'transparent';
    ctx.fillStyle = isUser ? BRAND.colors.white : BRAND.colors.text;

    let textY = currentY + 24 + 32;
    lines.forEach(line => {
      ctx.fillText(line, bubbleX + 24, textY);
      textY += 44;
    });

    currentY += bubbleHeight + 30;
  });

  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
}

function renderIntelligenceLayerScene(ctx, frame, sceneFrame) {
  const progress = sceneFrame / (10 * VIDEO.fps);
  const gradient = ctx.createLinearGradient(0, 0, 0, VIDEO.height);
  gradient.addColorStop(0, BRAND.colors.background);
  gradient.addColorStop(1, BRAND.colors.backgroundDark);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, VIDEO.width, VIDEO.height);

  ctx.globalAlpha = Math.min(1, progress * 3);
  ctx.font = 'bold 68px Arial';
  ctx.fillStyle = BRAND.colors.primary;
  ctx.textAlign = 'center';
  ctx.fillText("Luma's Intelligence at Work", VIDEO.width / 2, 250);
  ctx.globalAlpha = 1;

  const features = [
    { icon: '🧠', text: 'Emotion detection' },
    { icon: '📊', text: 'Behavioral pattern inference' },
    { icon: '✨', text: 'Personalized micro-interventions' },
    { icon: '💭', text: 'Context memory across conversations' },
    { icon: '🎯', text: 'Psychology-based coaching engines' },
  ];

  const cardWidth = 900;
  const cardHeight = 140;
  const startY = 420;

  features.forEach((feature, index) => {
    const appearDelay = 0.15 + (index * 0.12);
    const cardProgress = Math.max(0, Math.min(1, (progress - appearDelay) / 0.15));

    if (cardProgress > 0) {
      const cardX = (VIDEO.width - cardWidth) / 2;
      const cardY = startY + (index * 170);
      const slideOffset = (1 - easeOut(cardProgress)) * 200;

      ctx.globalAlpha = cardProgress;
      ctx.shadowColor = BRAND.colors.shadow;
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 10;

      drawRoundedRect(ctx, cardX + slideOffset, cardY, cardWidth, cardHeight, 24, BRAND.colors.white);

      ctx.shadowColor = 'transparent';
      ctx.fillStyle = BRAND.colors.primary;
      ctx.fillRect(cardX + slideOffset, cardY, 8, cardHeight);

      ctx.font = '64px Arial';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(feature.icon, cardX + slideOffset + 50, cardY + cardHeight / 2);

      ctx.font = '600 42px Arial';
      ctx.fillStyle = BRAND.colors.text;
      ctx.fillText(feature.text, cardX + slideOffset + 150, cardY + cardHeight / 2);
    }
  });

  if (progress > 0.7) {
    ctx.globalAlpha = Math.min(1, (progress - 0.7) / 0.3);
    ctx.font = 'italic 44px Arial';
    ctx.fillStyle = BRAND.colors.textLight;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('Not therapy. Real-time emotional intelligence.', VIDEO.width / 2, VIDEO.height - 180);
  }

  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}

function renderValuePropsScene(ctx, frame, sceneFrame) {
  const progress = sceneFrame / (6 * VIDEO.fps);
  drawGradient(ctx, 0, 0, VIDEO.width, VIDEO.height, [BRAND.colors.primary, BRAND.colors.secondary, BRAND.colors.accent]);

  const valueProps = [
    { title: 'Feel understood', subtitle: 'instantly.' },
    { title: 'Track emotional', subtitle: 'patterns.' },
    { title: 'Grow with personalized', subtitle: 'guidance.' },
    { title: 'Built for women\u0027s real', subtitle: 'emotional journeys.' },
  ];

  const cardWidth = 460;
  const cardHeight = 380;
  const spacing = 60;
  const gridWidth = cardWidth * 2 + spacing;
  const gridHeight = cardHeight * 2 + spacing;
  const startX = (VIDEO.width - gridWidth) / 2;
  const startY = (VIDEO.height - gridHeight) / 2;

  const positions = [
    { x: startX, y: startY },
    { x: startX + cardWidth + spacing, y: startY },
    { x: startX, y: startY + cardHeight + spacing },
    { x: startX + cardWidth + spacing, y: startY + cardHeight + spacing },
  ];

  const accentColors = [BRAND.colors.primary, BRAND.colors.secondary, BRAND.colors.accent, BRAND.colors.primary];

  valueProps.forEach((prop, index) => {
    const appearDelay = 0.1 + (index * 0.15);
    const cardProgress = Math.max(0, Math.min(1, (progress - appearDelay) / 0.2));

    if (cardProgress > 0) {
      const pos = positions[index];
      const scale = 0.7 + (0.3 * easeOut(cardProgress));

      ctx.save();
      ctx.globalAlpha = cardProgress;
      ctx.translate(pos.x + cardWidth / 2, pos.y + cardHeight / 2);
      ctx.scale(scale, scale);
      ctx.translate(-cardWidth / 2, -cardHeight / 2);

      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 15;

      drawRoundedRect(ctx, 0, 0, cardWidth, cardHeight, 32, BRAND.colors.white);

      ctx.shadowColor = 'transparent';
      ctx.fillStyle = accentColors[index];
      ctx.fillRect(0, 0, cardWidth, 12);

      ctx.font = 'bold 72px Arial';
      ctx.fillStyle = accentColors[index];
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('0' + (index + 1), cardWidth / 2, 120);

      ctx.font = 'bold 46px Arial';
      ctx.fillStyle = BRAND.colors.text;
      ctx.fillText(prop.title, cardWidth / 2, 220);

      ctx.font = '600 44px Arial';
      ctx.fillStyle = BRAND.colors.primary;
      ctx.fillText(prop.subtitle, cardWidth / 2, 280);

      ctx.restore();
    }
  });

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}

function renderClosingScene(ctx, frame, sceneFrame) {
  const progress = sceneFrame / (6 * VIDEO.fps);
  const gradient = ctx.createLinearGradient(0, 0, 0, VIDEO.height);
  gradient.addColorStop(0, BRAND.colors.background);
  gradient.addColorStop(1, BRAND.colors.backgroundDark);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, VIDEO.width, VIDEO.height);

  const phoneWidth = 450;
  const phoneHeight = 900;
  const phoneX = 120;
  const phoneY = (VIDEO.height - phoneHeight) / 2;

  ctx.globalAlpha = Math.min(1, progress * 2);
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.shadowBlur = 40;
  drawRoundedRect(ctx, phoneX, phoneY, phoneWidth, phoneHeight, 60, '#1a1a1a');

  ctx.shadowColor = 'transparent';
  const screenX = phoneX + 12;
  const screenY = phoneY + 12;
  const screenWidth = phoneWidth - 24;
  const screenHeight = phoneHeight - 24;
  drawRoundedRect(ctx, screenX, screenY, screenWidth, screenHeight, 54, BRAND.colors.backgroundDark);

  const logoGradient = ctx.createLinearGradient(screenX, screenY + screenHeight / 2 - 100, screenX + screenWidth, screenY + screenHeight / 2 + 100);
  logoGradient.addColorStop(0, BRAND.colors.primary);
  logoGradient.addColorStop(1, BRAND.colors.accent);
  ctx.fillStyle = logoGradient;
  ctx.font = 'bold 72px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('LUMA', screenX + screenWidth / 2, screenY + screenHeight / 2);

  ctx.globalAlpha = 1;

  const contentX = phoneX + phoneWidth + 120;

  if (progress > 0.2) {
    ctx.globalAlpha = Math.min(1, (progress - 0.2) / 0.3);
    ctx.font = 'bold 120px Arial';
    ctx.fillStyle = BRAND.colors.primary;
    ctx.textAlign = 'left';
    ctx.fillText('LUMA', contentX, 500);
  }

  if (progress > 0.35) {
    ctx.globalAlpha = Math.min(1, (progress - 0.35) / 0.3);
    ctx.font = 'bold 62px Arial';
    ctx.fillStyle = BRAND.colors.text;
    ctx.fillText('Grow emotionally', contentX, 650);
    ctx.fillText('intelligent.', contentX, 730);
  }

  if (progress > 0.5) {
    ctx.globalAlpha = Math.min(1, (progress - 0.5) / 0.3);
    const boxWidth = 500;
    const boxHeight = 200;
    const boxY = 850;

    ctx.shadowColor = BRAND.colors.shadow;
    ctx.shadowBlur = 30;
    const boxGradient = ctx.createLinearGradient(contentX, boxY, contentX + boxWidth, boxY + boxHeight);
    boxGradient.addColorStop(0, BRAND.colors.primary);
    boxGradient.addColorStop(1, BRAND.colors.secondary);

    drawRoundedRect(ctx, contentX, boxY, boxWidth, boxHeight, 24, boxGradient);

    ctx.shadowColor = 'transparent';
    ctx.font = '600 46px Arial';
    ctx.fillStyle = BRAND.colors.white;
    ctx.fillText('Launching on Product Hunt', contentX + 40, boxY + 65);

    ctx.font = 'bold 52px Arial';
    ctx.fillText('Today', contentX + 40, boxY + 130);
  }

  if (progress > 0.65) {
    ctx.globalAlpha = Math.min(1, (progress - 0.65) / 0.3);
    ctx.font = '52px Arial';
    ctx.fillStyle = BRAND.colors.text;
    ctx.fillText("We'd love your support! 🐱✨", contentX, 1150);
  }

  if (progress > 0.75) {
    ctx.globalAlpha = Math.min(1, (progress - 0.75) / 0.25);
    ctx.font = '400 36px Arial';
    ctx.fillStyle = BRAND.colors.textLight;
    ctx.fillText('Download now or visit our website', contentX, VIDEO.height - 150);
  }

  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
}

// Main render function
window.renderFrame = function(frameNumber) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const timeInSeconds = frameNumber / VIDEO.fps;

  ctx.clearRect(0, 0, VIDEO.width, VIDEO.height);

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
};
