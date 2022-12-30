# Frontend for PIS project (WUT)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:coverage`

Launches the test runner and creates test report with coverage statistics

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

This command will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

## Deploy to production server

Our production server is prepared for application deployment with the use of Jenkins job. You need to login into server (mion network -> virtual machine) and create port passthrough (or use ngrok) to access Jenkins web interface. 

You also need to create ngrok url for backend running on server, and change backend url in application for that ngrok url. Those changes need to be applied to "prezentacja" branch, and with ngrok still running you can start the Jenkins job.

After Jenklins job finishes, create ngrok url for frontend connection, add it to cors rules in backend project, build backend project and you should be able to test application.
