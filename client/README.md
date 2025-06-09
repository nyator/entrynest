# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Deployment

- Set the environment variable `VITE_API_URL` to your backend Render URL (e.g. `https://your-backend.onrender.com/api`) in your Vercel/Render dashboard.
- The frontend will use this variable for all API requests.
- No proxy is needed in production.
