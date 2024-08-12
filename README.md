# Questionnaires for Everyone!

**[Project report (arXiv preprint)](https://arxiv.org/pdf/2407.20608)**

**[Server code](https://github.com/otsha/questionnaires-for-everyone-server)**

![](https://cdn.myportfolio.com/db8b5c62-81f1-42fe-88a8-b16d358a1a1c/7bff51a7-3db1-4b18-94e7-46af543c7832_rw_1920.png?h=ea8e27498fb795f568ebfb65ffd3ebb3)

A web application designed for questionnaire translation. Offers forward translation (from source language to target language), backward translation (from target language to source language), manual tweaking of translated items, and GPT-4-generated feedback of translation quality. Translations can be exported to a `.csv` file or copied to clipboard.

Languages offered:
- English (US)
- German
- Portuguese (PT)
- **(Untested)** Finnish

## Running the Frontend Locally

You need to have Node.js and npm installed. Make sure to also set up the server.

- Configure the .env file with the base URL of the server:

```.env
VITE_API_URL=http://127.0.0.1:5000 (if you are using the server's default settings)
```

- Install the required dependencies with:

```bash
npm install
```

- Then, run the application in developer mode:

```bash
npm run dev
```

- Finally, navigate to `http://localhost:5173` in your browser (this will be different if you edited the configuration).

## Deploying

You should be able to deploy the frontend to Netlify directly from a forked copy of the repository.

The build command is `vite build`.

