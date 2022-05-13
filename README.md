# e-commerce fullstack app

This project was made as part of the final evaluation for the fullstack engineer path on [CodeAcademy](https://codeacademy.com/) learning platform.
The architecture is based on : 
- Backend = a REST API to control communication with a postgres database. The backend is hosted on another Github repo, check below.
- Frontend = made with React and Redux for state management.

If you want to test it, don't forget to run both backend and frontend server !

## Backend REST API
Made with Node/Express.
See more details on the [dedicated Github project page](https://github.com/kimlesieur/ecommerce-app-REST-API).
You'll find some docs made with Swagger to get routes details.

## Available Scripts

In the root project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


## Authentication

Authentication was implemented with express-session, passport to manage local authentication strategy and the Google OAuth access strategy.
- JSON Web Token access : 
- Google OAuth access : 

## Frontend app Dependencies

- Create-react-app : This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.
- 

## to-do
[x] Create the register form
[x] Add a Google OAuth access
[x] Add a refresh token 
[x] 
