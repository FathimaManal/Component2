# 🚀 Storybook Deployment Guide

This guide covers deploying your Storybook to various platforms for sharing and collaboration.

## 📱 Option 1: Chromatic (Recommended)

Chromatic is the official Storybook deployment platform with visual testing capabilities.

### Setup

1. **Install Chromatic:**
   ```bash
   npm install -D chromatic
   ```

2. **Get Project Token:**
   - Visit [chromatic.com](https://chromatic.com)
   - Sign up with GitHub
   - Create a new project
   - Copy your project token

3. **Configure Environment:**
   ```bash
   # Set your project token as environment variable
   export CHROMATIC_PROJECT_TOKEN=your-token-here
   
   # Or add to .env file
   echo "CHROMATIC_PROJECT_TOKEN=your-token-here" >> .env
   ```

4. **Deploy:**
   ```bash
   npm run deploy-chromatic
   ```

### Benefits
- ✅ **Visual Testing**: Automatic visual regression testing
- ✅ **GitHub Integration**: PR comments and status checks
- ✅ **Team Collaboration**: Share with stakeholders
- ✅ **Accessibility Testing**: Built-in a11y checks
- ✅ **Free Tier**: 5,000 snapshots/month

### GitHub Actions Integration

Add this to `.github/workflows/chromatic.yml`:

```yaml
name: 'Chromatic Deployment'
on: push
jobs:
  chromatic-deployment:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Publish to Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

## 🌐 Option 2: Vercel

Vercel provides fast, global hosting with automatic deployments.

### Setup

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   npm run deploy-vercel
   ```

4. **Configure Auto-Deploy:**
   - Connect your GitHub repository
   - Vercel will auto-deploy on every push
   - Get a unique URL for each deployment

### Benefits
- ✅ **Global CDN**: Fast loading worldwide
- ✅ **Auto-Deploy**: Deploy on every git push
- ✅ **Preview URLs**: Unique URLs for each PR
- ✅ **Custom Domains**: Use your own domain
- ✅ **Free Tier**: Unlimited deployments

### Custom Domain Setup

1. **Add Domain in Vercel Dashboard**
2. **Update DNS Records**
3. **Wait for SSL Certificate**

## 📚 Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

### Setup

1. **Install gh-pages:**
   ```bash
   npm install -D gh-pages
   ```

2. **Configure Repository:**
   - Go to Settings → Pages
   - Set source to "GitHub Actions"

3. **Deploy:**
   ```bash
   npm run deploy-gh-pages
   ```

### Benefits
- ✅ **Free Hosting**: No cost involved
- ✅ **GitHub Integration**: Direct from your repo
- ✅ **Custom Domains**: Use your own domain
- ✅ **SSL**: Automatic HTTPS

### Custom Domain Setup

1. **Add CNAME file to `storybook-static/`:**
   ```
   yourdomain.com
   ```

2. **Update DNS Records:**
   ```
   CNAME yourdomain.com username.github.io
   ```

3. **Wait for DNS Propagation**

## 🔧 Configuration Files

### Vercel Configuration (`vercel.json`)
```json
{
  "buildCommand": "npm run build-storybook",
  "outputDirectory": "storybook-static",
  "framework": null
}
```

### Chromatic Configuration (`chromatic.json`)
```json
{
  "projectToken": "your-token-here",
  "buildScriptName": "build-storybook",
  "storybookBuildDir": "storybook-static"
}
```

### GitHub Actions (`.github/workflows/deploy-storybook.yml`)
```yaml
name: Deploy Storybook
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build-storybook
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./storybook-static
```

## 🚀 Quick Deploy Commands

```bash
# Chromatic
npm run deploy-chromatic

# Vercel
npm run deploy-vercel

# GitHub Pages
npm run deploy-gh-pages

# Build only
npm run build-storybook
```

## 🔍 Troubleshooting

### Common Issues

1. **Build Fails:**
   ```bash
   # Check Storybook build locally
   npm run build-storybook
   
   # Verify dependencies
   npm install
   ```

2. **Deployment Fails:**
   - Check environment variables
   - Verify API tokens
   - Check build output directory

3. **Assets Not Loading:**
   - Verify base path in Storybook config
   - Check relative vs absolute paths
   - Ensure proper CORS headers

### Environment Variables

```bash
# Chromatic
CHROMATIC_PROJECT_TOKEN=your-token

# Vercel
VERCEL_TOKEN=your-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id

# GitHub Pages
GITHUB_TOKEN=your-token
```

## 📊 Performance Optimization

### Build Optimization

1. **Tree Shaking:**
   ```js
   // .storybook/main.ts
   export default {
     stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
     addons: ['@storybook/addon-essentials'],
     framework: '@storybook/react-vite',
     core: {
       builder: '@storybook/builder-vite'
     }
   }
   ```

2. **Bundle Analysis:**
   ```bash
   npm install -D @storybook/addon-bundle-analyzer
   ```

3. **Lazy Loading:**
   ```js
   // Load stories dynamically
   const stories = import.meta.glob('../src/**/*.stories.@(js|jsx|ts|tsx)')
   ```

## 🔐 Security Considerations

1. **Environment Variables:**
   - Never commit tokens to git
   - Use GitHub Secrets for CI/CD
   - Rotate tokens regularly

2. **Access Control:**
   - Set up team permissions in Chromatic
   - Configure Vercel team access
   - Use GitHub branch protection

3. **Content Security:**
   - Review external dependencies
   - Monitor for vulnerabilities
   - Keep dependencies updated

## 📈 Monitoring & Analytics

### Chromatic Analytics
- Visual regression reports
- Build performance metrics
- Team collaboration insights

### Vercel Analytics
- Page load performance
- User experience metrics
- Error tracking

### GitHub Insights
- Deployment frequency
- Build success rates
- Performance trends

## 🎯 Next Steps

1. **Choose your platform** (Chromatic recommended)
2. **Set up deployment** using the scripts
3. **Configure CI/CD** for automatic deployments
4. **Share your Storybook** with your team
5. **Monitor performance** and iterate

## 📚 Resources

- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Storybook Deployment Guide](https://storybook.js.org/docs/react/sharing/publish-storybook) 