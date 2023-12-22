# Wool & Oak
Based on Slater.

TODO: Will override the default theme, need a way to upload/zip theme like slater

## Development
To compile and run the dev server (https://localhost:3000), run `npm start`. This will also watch for file changes and upload them as they update.

You may need to allow your browser to load the local files. To do this, open the file (like the [javascript](https://localhost:3000/index.js)) in your browser and click the "Continue to site" that warns you about security. It should then allow those requests to go through for a period of time.

## Production
The `NODE_ENV` variable here is important, as is the `--env=production` that pushes the theme to the production theme on Shopify. The themes are configured in the `config.yml`.
```
npm run deploy
```
