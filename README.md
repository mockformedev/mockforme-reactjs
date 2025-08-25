# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) that requires **Node version 18**

## Available Scripts

In the project directory, you can run:

## Install depdendencies
### `npm install`

## Start project
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


# MockForMe Integration
You can easily mock your APIs in development using the [mockforme](https://www.npmjs.com/package/mockforme) package

## `Install mockforme as a dev dependency`
### Yarn
```
yarn add mockforme -D
```
### NPM
```
npm i mockforme --save-dev
```

## Initialize mockforme in src/index.js
```
import { mockforme } from 'mockforme';

const env = "development"; // you can put it in .env file or constant file.

if (env === "development") {
  const ACCESS_TOKEN = ''; // you can move access token to constant or environment file.
  mockforme(ACCESS_TOKEN).run();
}
```
> **Note:** To get access token visit: [https://dashboard.mockforme.com/user/token](https://dashboard.mockforme.com/user/token)

> Once the configuration is complete, you can create mock APIs directly from the [MockForMe dashboard](https://dashboard.mockforme.com).
> Simply go to Create Collection → Create API → Define API Responses.
> 
> For example, we’ve created a mock API with the **endpoint** `/user/me` and **method** `GET` in mockforme, which is being used in the `src/App.js` file.

<hr />
✅ That’s it! Just add these few lines and `mockforme` will start mocking your APIs.

<br />

👉 Watch how to create mock API using mockforme in YouTube video:
[https://www.youtube.com/watch?v=V1_leclmpTw](https://www.youtube.com/watch?v=V1_leclmpTw)