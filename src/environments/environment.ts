// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseApiKey: 'AIzaSyC0rQyoGwBIhqgSyM_BOTGz_UN6jO8hCQ8',
  firebaseSignupUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  firebaseSignInWithPasswordUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  firebaseSetUserProfileUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=',
  firebaseGetUserProfileUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=',
  sendEmailVerificationUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=',
  veryUserIdentityUrl:'https://identitytoolkit.googleapis.com/v1/accounts:update?key=',
  dataBaseUrl: 'https://recipe-d6253.firebaseio.com/recipes.json',
  sampleProfileImage:'https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
