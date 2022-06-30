const ghpages = require('gh-pages');

console.log("Deploying to Github pages...")

ghpages.publish('dist', function (err) {
  if (err) {
    console.log(err)
    return;
  }

  console.log("Deployed successfully.")
});