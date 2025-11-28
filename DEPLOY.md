# Deploy to Vercel

## Quick Deploy

1. **Go to Vercel**: https://vercel.com/new
2. **Import this repository**: `https://github.com/VivianFuVivianFu/video2`
3. **Click "Deploy"** - No configuration needed!

Vercel will automatically:
- Detect the `vercel.json` configuration
- Serve the video with proper MIME types
- Enable video streaming with byte-range requests
- Cache assets for optimal performance

## What Gets Deployed

- **Homepage**: `/` → Redirects to demo page
- **Demo Page**: `/demo/index.html` → Beautiful video preview
- **Video File**: `/demo/luma_producthunt.mp4` → Your 60-second launch video
- **Direct Video**: `/video` → Direct link to MP4

## Video Details

- **Duration**: 60 seconds
- **Resolution**: 1080×1920 (Portrait)
- **File Size**: 1.65 MB
- **Format**: H.264 MP4
- **Quality**: Product-launch ready

## Testing After Deploy

Once deployed, your Vercel URL will look like:
```
https://video2-xyz123.vercel.app
```

Test these URLs:
- `https://video2-xyz123.vercel.app/` - Main page
- `https://video2-xyz123.vercel.app/demo/` - Demo page
- `https://video2-xyz123.vercel.app/video` - Direct video link

## Troubleshooting

### Video Not Playing

If the video doesn't play:

1. **Check MIME type**: The `vercel.json` sets proper `video/mp4` type
2. **Check file size**: GitHub has a 100MB limit (our video is 1.65MB ✓)
3. **Browser compatibility**: Try Chrome, Firefox, or Safari
4. **Mobile**: Ensure `playsinline` attribute is present (it is ✓)

### 404 Error

If you get a 404:
1. Verify the video file is in the repo: `demo/luma_producthunt.mp4`
2. Check that `.gitignore` doesn't exclude `*.mp4` files
3. Ensure you pushed the latest commit with the video

### Slow Loading

The video is only 1.65MB and should load quickly. If it's slow:
1. Check your internet connection
2. Vercel's CDN should cache the file globally
3. Use the `/video` direct link for faster access

## Custom Domain

To use a custom domain:
1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain (e.g., `video.luma.ai`)
4. Follow Vercel's DNS configuration steps

## Analytics

Enable Vercel Analytics to track:
- Video views
- Geographic distribution
- Device types
- Loading performance

## Support

- **Vercel Docs**: https://vercel.com/docs
- **GitHub Repo**: https://github.com/VivianFuVivianFu/video2
- **Issues**: Report at GitHub Issues

---

🤖 Generated with [Claude Code](https://claude.ai)
