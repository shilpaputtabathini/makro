// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'http://internal-oms-alb-private-uat-u7-1075649175.ap-southeast-1.elb.amazonaws.com/',
  apiUrl: 'https://delivery-bknd-alb.siammakro.co.th/',
  // apiUrl: 'http://oms-alb-public-uat-u10-155869332.ap-southeast-1.elb.amazonaws.com:8080/',
  paymentUrl: 'https://ocs-sit-payment-staging1makroclick.siammakro.co.th/oms/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
