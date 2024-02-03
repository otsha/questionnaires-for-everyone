# Questionnaires for Everyone!

A web application designed for questionnaire translation. Offers forward translation (from source language to target language), backward translation (from target language to source language), manual tweaking of translated items, and GPT-4-generated feedback of translation quality. Translations can be exported to a `.csv` file or copied to clipboard.

Languages offered:
- English (US)
- German
- Portuguese (PT)
- **(Untested)** Finnish

The application server can be found [here](https://github.com/otsha/questionnaires-for-everyone-server).

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

