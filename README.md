## Lendo Frontend

## Structure
The app is built with React and consists of one main page with three tabs - one for each operation (add a word, add a synonym, and view a word's synonyms). User input is handled with controlled forms - the `<form>` tag is used to manage required fields and handle submission to the backend, while the form's inputs are managed with React's `useState` hook.

## Success / Error / Loading
The status of each API call is tracked by the enclosing component, and feedback is provided to the user about an operation's status once it finishes. This feedback takes the form of snackbars in the lower left corner of the screen.

## Running locally
The app can be run locally via `npm run dev`. This will run the app at `localhost:5173`.

## Public Deployment
The app has been deployed publicly to GCP's Cloud Run, and can be accessed at [https://lendo-web-k3tawfx6ta-ew.a.run.app](https://lendo-web-k3tawfx6ta-ew.a.run.app). Deployment is managed by the `cloudbuild.yaml` file in the project's root directory.