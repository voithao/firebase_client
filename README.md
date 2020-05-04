# voithao

## Project setup

```bash
npm install
```

## Firebase setup

Add your firebase config to file - src/config.ts

You can deploy firestore components with next commands:

```
# Rulles
firebase deploy --only firestore
# Hosting
firebase deploy --only hosting
# Functions
firebase deploy --only functions
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
npm run doc
```

### Run your unit tests

```bash
npm run test:unit
```

### Run your end-to-end tests

```bash
npm run test:e2e
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
