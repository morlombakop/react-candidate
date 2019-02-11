# React Typescript Interview Candidate Management App

This repository showcases an app that sorts and filters job seekers candidate from a table.

## Built in settings

- React + ReactDOM (16.7.0)
- Typescript (with TSLint setting)
- Prettier + tslint-config-prettier
- Test configuration using Jest and [react-testing-library](https://github.com/kentcdodds/react-testing-library)
- Parcel bundler (1.10.0~)

## How to set up the project

**Disclaimer**  
Since I like to use Yarn as my primary package manager, this repository will ignore `package-lock.json` file on commit.  
If you prefer npm to Yarn, Please modify `.gitignore` file following your flavor.

```
git clone git@github.com:morlombakop/react-candidate.git
cd react-candidate
yarn install
```

## How to start development for the application

    # With type checking
    yarn develop

    # Transpile only
    yarn start

Execute the command and you can run & test the application on `localhost:1234` in the browser.

## How to build the application

    yarn build

The default output directory is `/dist`. You can change the destination wherever you want.

```
// package.json
// ...
"scripts": {
  // ...
  "build": "... parcel build ./src/index.html -d YOUR_OUTPUT_DIR --public-url '/'" <- Change here
}
// ...
```

## How to test the application

    yarn test       # run test once
    yarn test:watch # watch mode

You have to create `__tests__` directory at the same location of files which you want to test.
Test file's name should be `SOURCE.test.ts/tsx/js` or `SOURCE.spec.ts/tsx/js`.
