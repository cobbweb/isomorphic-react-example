# Isomorphic React Example

A basic example of using webpack to build isomorphic react modules

There's three different webpack configs: one for dev (with hot loading), and two for production.
Production builds to packages, a CommonJS compatible package to be consumed by node (for server-side rendering), and an optimised packing for sending the the client.

## Usage

**Development**

```
$ nodemon index.js
```

This spins up the app server and webpack dev server


**Production**

```
$ npm run build // build webpack packages for node and client
$ npm run prod // boot up the prod server with React rendering
```