import ApplicationApi from 'App';
const application = new ApplicationApi();
if (!process.env.APP_KEY) {
  console.log(`ENV APP_KEY NOT FOUND!`);
  process.exit(0);
}
application.start(3000);
