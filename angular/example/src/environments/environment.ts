// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyACruFIGBKbMtks_KVEk8cTvrQmLVH4BnA',
    authDomain: '',
    databaseURL: 'https://imagenes-b75e3.firebaseio.com/',
    projectId: 'imagenes-b75e3',
    storageBucket: 'imagenes-b75e3.appspot.com',
    messagingSenderId: 'xxx'
  }
};