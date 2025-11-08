# Render.com Configuration Reference

If you're manually configuring your Render service (not using Blueprint), use these settings:

## Service Settings

- **Name**: `bhvr-app` (or your preferred name)
- **Runtime**: Node
- **Build Command**: `bun install && bun run build`
- **Start Command**: `bun run start`
- **Branch**: `main` (or your default branch)

## Environment Variables

Add these in the Render dashboard under "Environment":

- `NODE_ENV`: `production`

## Important Notes

1. **Bun Support**: Render has native Bun support. The build and start commands will automatically use Bun.

2. **Build Process**: 
   - `bun install` installs all dependencies
   - `bun run build` builds all three workspaces (shared, server, client) using Turbo

3. **Port**: Render automatically provides the `PORT` environment variable. The server is already configured to use it.

4. **Health Check**: Set to `/api` (optional)

## Troubleshooting

### If deployment fails:

1. **Check Build Logs**: Ensure all three workspaces build successfully
2. **Verify Start Command**: Make sure `server/dist/index.js` exists after build
3. **Check Dependencies**: All dependencies must be in package.json files

### Manual Deploy Steps:

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your Git repository
4. Enter the settings above
5. Click "Create Web Service"

### Using Blueprint (Recommended):

1. Commit and push your changes (including `render.yaml`)
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Blueprint"
4. Select your repository
5. Render automatically reads `render.yaml`
6. Click "Apply"
