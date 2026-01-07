# Welcome to your Lovable project

## Project info

**Live Site**: https://letmeaskchatgpt.github.io/

**Lovable Project**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Automatic Deployment to GitHub Pages

This project is automatically deployed to GitHub Pages at https://letmeaskchatgpt.github.io/ whenever changes are pushed to the `main` branch.

The deployment workflow:
1. Automatically triggers on push to `main`
2. Builds the project using Vite
3. Deploys the `dist` folder to GitHub Pages

You can also trigger a manual deployment:
1. Go to the "Actions" tab in GitHub
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" and select the `main` branch

### Initial Setup (Repository Owner)

After merging this PR, the repository owner needs to configure GitHub Pages:
1. Go to repository Settings → Pages
2. Under "Build and deployment", set Source to **GitHub Actions**

### Deploy via Lovable

Alternatively, you can open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I use a custom domain?

Yes, you can connect a custom domain to your GitHub Pages site!

To connect a custom domain:
1. Go to repository Settings → Pages
2. Under "Custom domain", enter your domain name
3. Configure your DNS settings as instructed

Read more in the official documentation:
- [GitHub Pages: Configuring a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Lovable: Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
