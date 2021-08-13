import ApplicationApi from 'App';
import dbConfig from './src/config/database';
const application = new ApplicationApi();
if (!process.env.APP_KEY) {
  console.log(`ENV APP_KEY NOT FOUND!`);
  process.exit(0);
}
application.start(dbConfig).then((app) => {
  app.listen(3000, () => {
    console.log(`Listening on ${3000}`);
  });
});
