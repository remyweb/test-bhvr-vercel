# Deployment Guide for Render.com

This guide will help you deploy your BHVR application to Render.com.

## Prerequisites

- A [Render.com](https://render.com) account (free tier available)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Quick Start (Recommended)

### Option 1: Using Render Blueprint

1. **Commit and push all changes** to your Git repository:
   ```bash
   git add .
   git commit -m "Configure for Render deployment"
   git push
   ```

2. **Go to Render Dashboard**
   - Visit [https://dashboard.render.com/](https://dashboard.render.com/)
   - Click "New +" and select "Blueprint"

3. **Connect your repository**
   - Select your Git provider
   - Authorize Render to access your repository
   - Select the repository containing this project

4. **Render will automatically detect** the `render.yaml` file and configure your service

5. **Click "Apply"** to start the deployment

### Option 2: Manual Setup

1. **Push your code to a Git repository**

2. **Go to Render Dashboard**
   - Visit [https://dashboard.render.com/](https://dashboard.render.com/)
   - Click "New +" and select "Web Service"

3. **Connect your repository**
   - Select your Git provider and repository

4. **Configure the service**
   - **Name**: `bhvr-app` (or your preferred name)
   - **Runtime**: Node
   - **Build Command**: `bun install && bun run build`
   - **Start Command**: `bun run start`
   - **Branch**: `main` (or your default branch)

5. **Environment Variables** (optional)
   - `NODE_ENV`: `production` (usually auto-set)

6. **Instance Type**
   - Select "Free" or your preferred plan

7. **Click "Create Web Service"**

## What Gets Deployed

The deployment includes:
- **Backend API**: Hono server running on Render's assigned PORT
- **Frontend**: React app (static files served by the backend)
- **API Routes**: Available at `/api` and `/api/hello`
- **Frontend**: Available at `/` (root URL)

## Project Structure

```
├── Dockerfile              # Docker configuration for Render
├── render.yaml            # Render Blueprint configuration
├── .dockerignore          # Files to exclude from Docker build
├── server/                # Backend (Hono)
│   └── dist/             # Built server files
├── client/                # Frontend (React + Vite)
│   └── dist/             # Built static files
└── shared/                # Shared types
    └── dist/             # Built shared files
```

## How It Works

1. **Build Process**:
   - Runs `bun install` to install all dependencies
   - Runs `bun run build` which uses Turbo to build:
     - Shared types
     - Server (TypeScript → JavaScript in `server/dist`)
     - Client (React → static files in `client/dist`)

2. **Runtime**:
   - Runs `bun run start` which executes `server/dist/index.js`
   - Server uses Render's `PORT` environment variable (automatically provided)
   - Serves API routes at `/api/*`
   - Serves static frontend files for all other routes
   - Frontend can make API calls to `/api/hello`

## API Endpoints

- `GET /api` - Returns "Hello Hono!"
- `GET /api/hello` - Returns JSON response with success message
- `GET /*` - Serves the React frontend

## Updating Your Deployment

Render will automatically redeploy when you push changes to your connected Git branch.

To manually trigger a deployment:
1. Go to your service in the Render dashboard
2. Click "Manual Deploy" → "Deploy latest commit"

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Ensure all dependencies are in package.json files
- Verify TypeScript compiles locally with `bun run build`
- Make sure all three workspaces (shared, server, client) build successfully

### App Doesn't Start
- Check that `server/dist/index.js` exists after build
- Verify the start command is `bun run start`
- Check runtime logs in Render dashboard for errors

### 404 Errors on API Calls
- Ensure API routes are prefixed with `/api`
- Check that the server is serving static files correctly
- Verify `client/dist` has the built files

### Frontend Can't Connect to API
- Update your frontend API calls to use `/api` prefix
- Example: `fetch('/api/hello')` instead of `fetch('http://localhost:4000/hello')`
- Use the `client/src/lib/api.ts` utility for API calls

## Local Testing

To test the production build locally:

```bash
# Build everything
bun run build

# Start the production server
bun run start

# Visit http://localhost:4000
```

## Environment Variables

You can add environment variables in the Render dashboard:
1. Go to your service
2. Click "Environment"
3. Add key-value pairs
4. Service will redeploy automatically

Common variables you might need:
- `NODE_ENV`: `production` (usually auto-set)
- Custom API keys or secrets as needed

## Support

For issues specific to Render:
- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com/)

For application issues:
- Check your application logs in Render dashboard
- Review the build and deploy logs
- See `RENDER_CONFIG.md` for manual configuration reference
