# Frontend Overview

## Project Overview
This is the frontend repository for the code snippet submission and display web application. It is built using React and Tailwind CSS for styling. Axios is used for making HTTP requests to the backend server, and the Judge0 API is utilized for retrieving the output of the submitted code snippets.

## Getting Started
1. Clone this repository:
git clone (https://github.com/Devvarshney11/code-snippet-app-frontend.git)

2. Navigate to the cloned directory:
cd code-snippet-app

3. Install dependencies:
npm install

4. Run the development server:
npm start

5. The application should now be running on `http://localhost:3000`.

## Features
- Users can submit code snippets along with relevant information.
- Submitted entries are displayed in a tabular format on page 2.
- The source code is limited to the initial 100 characters for display.
- The application utilizes the Judge0 API to retrieve the output of submitted code snippets.
- Tailwind CSS is used for responsive and sleek UI design.

## Bonus Tasks Completed
- Utilized Judge0 API to retrieve code snippet output.
- **Note:** Redis caching is implemented in the backend (refer to backend README for details).

## Links
- [Backend Repository](https://github.com/Devvarshney11/code-snippet-app-backend/)
- [Hosted Frontend Application](https://code-snippet-app-task.netlify.app/)
