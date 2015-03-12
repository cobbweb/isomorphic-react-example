# Isomorphic React Example

> A basic example of using webpack to build isomorphic react modules

## Goals

- [x] Isomorphic
- [x] Uni-directional data flow
- [x] Reactive/realtime database everywhere (PouchDB/CouchDB)
- [x] `react-hot-loader` for development
- [x] Material UI
- [ ] Immutable centralised state (Atom concept, using Immutable-js)
- [ ] Route is state
- [ ] Test infrastructure
- [ ] Production config. Docker?

There's three different webpack configs: one for dev (with hot loading), and two for production.
Production builds two packages, a CommonJS compatible package to be consumed by node (for server-side rendering), and an optimised packing for sending the the client.

A basic Todos app is being built to demonstrate usage. See `src/app/Todos`.

## Usage

**Development**

```
$ npm run dev-server
```

This spins up the app server and webpack dev server


**Production**

```
$ npm run build // build webpack packages for node and client
$ npm run prod-server // boot up the prod server with React rendering
```