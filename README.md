# Issue Redressal System

This is a web app built to address the needs of people who have issues and need immediate help. Our web app provides a simple way for customers to hire freelancers and organizations to resolve their issues. There is also an option to add government issues or redirect issues to government.

live demo : [issue-redressal-system](http://issue-redressal.herokuapp.com)

## To run project

In the project directory, you can run:

```sh
npm install
npm start
```

And to start backend server, open another shell and run:

```sh
npm install
cd client
npm test
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Modifications you can make

Currently, we are using mongoDB atlas(NoSQL) to store data and the url for the server is hardcoded. You can edit and put your own server url.

SQL server is also supported but requires few edits. it is present in `sqlserver` branch.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).