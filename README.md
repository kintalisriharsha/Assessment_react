# Authentication Forms React App - Complete Setup Guide

## Initial Project Setup

1. Create a new Vite project:
```bash
npm create vite@latest auth-forms -- --template react-ts
cd Assessment_react
```

2. Install required dependencies:
```bash
npm install formik yup react-router-dom @types/react-router-dom
```

3. Install npm packages
```bash
npm install
```
4. Run the Assessment_react folder
```
npm run dev
```

## Project Structure

Create the following folder structure:
```
auth-forms/
├── src/
│   ├── components/
│   │   ├── AuthForm.tsx
│   │   └── PasswordStrength.tsx
│   ├── types/
│   │   └── auth.types.ts
│   ├── utils/
│   │   └── validation.ts
│   ├── styles/
│   │   └── auth.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── package.json
```

## CSS Setup

1. Create a new file `src/index.css`:
```css
.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.floating-label {
  position: absolute;
  pointer-events: none;
  left: 12px;
  top: 8px;
  transition: 0.2s ease all;
  color: #666;
}

.floating-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.floating-input:focus + .floating-label,
.floating-input:not(:placeholder-shown) + .floating-label {
  transform: translateY(-20px) scale(0.8);
  color: #007bff;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.success-message {
  color: #28a745;
  text-align: center;
  margin-bottom: 1rem;
}

/* Confetti Animation */
@keyframes confettiFall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
  }
}

.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
}
```

2. Import the CSS in your `App.tsx`:
```typescript
import './styles/auth.css';
```

## GitHub Setup and Deployment

1. Initialize Git repository:
```bash
git init
```

2. Create `.gitignore` file:
```
node_modules
dist
.env
.env.local
.DS_Store
*.log
```

3. Create repository on GitHub:
   - Go to github.com
   - Click "New repository"
   - Name it "auth-forms"
   - Leave it public
   - Don't initialize with README (we already have one)

4. Push to GitHub:
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/auth-forms.git
git push -u origin main
```

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://YOUR_USERNAME.github.io/auth-forms"
}
```

3. Update `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/auth-forms/', // Add this line
});
```

4. Deploy:
```bash
npm run deploy
```

## Environment Variables

Create `.env` file for any environment variables:
```
VITE_API_URL=your_api_url_here
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Troubleshooting

Common issues and solutions:

1. **Build fails**: Check if all dependencies are installed:
```bash
npm install
```

2. **CSS not loading**: Ensure the path to CSS file is correct and imported in `App.tsx`

3. **TypeScript errors**: Run type checking:
```bash
npm run typecheck
```

4. **Vite config issues**: Make sure `vite.config.ts` is in the root directory and properly configured

5. **GitHub Pages 404**: Check if `base` in `vite.config.ts` matches your repository name

Remember to update the README.md with any additional setup steps or requirements specific to your implementation.
