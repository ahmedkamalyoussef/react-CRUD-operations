# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

![Screenshot 2024-09-24 052514](https://github.com/user-attachments/assets/d5027690-5145-4633-ab3c-6b418216bf85)
![Screenshot 2024-09-24 052503](https://github.com/user-attachments/assets/0e7d5a9f-0940-423f-81b4-81fb1ec3a23a)
![Screenshot 2024-09-22 034928](https://github.com/user-attachments/assets/ff363d86-d2bb-420c-bb25-79daba76c581)
![Screenshot 2024-09-24 052653](https://github.com/user-attachments/assets/7905c5b2-f498-458a-b81a-0593ad31ea64)
![Screenshot 2024-09-24 052644](https://github.com/user-attachments/assets/142daa22-abce-4377-978f-478c6114a9c3)
![Screenshot 2024-09-24 052538](https://github.com/user-attachments/assets/d6a7831d-0ab1-4e31-9aad-89bd89d82baf)
![Screenshot 2024-09-24 052525](https://github.com/user-attachments/assets/36658a32-932f-443c-a07f-90cd270cfb6f)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
