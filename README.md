# Blog using React & Redux

This is a blog application using React & Redux. This is the client-side only. The server-side can be found [here](https://github.com/douglasmuraoka/blog-server).

# Getting Started

First of all, you are going to need `npm` installed. Check [here](https://www.npmjs.com/get-npm) to install. This application was tested on a Node 10 environment.

After `npm` installed, install the application dependencies and build the bundle with:

```
npm i
npm run build
```

To serve the bundled application, install `serve`. Check [here](https://www.npmjs.com/package/serve) to install, or simply run:

```
npm i -g serve
```

Then serve the application:

```
serve -s bundle
```

Read `serve` instructions on the terminal to get access to the application and have fun! :)

## Features Overview

### On `/posts` view
  - Display a list of 10 latest posts
  - Every post should have short body preview limited by 100 chars
  - Post title should be linked to the post details view
  - Display "load more" button. Every click on this button should load 10 additional posts

### On `/posts/:id` view:
  - Display post details
  - Show 3 latest comments under the post
  - Display load button. Every click on this button should load 10 additional comments
  - You can leave a comment for a post, with at least 5 chars

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.