# NodeCG template

This is a nodecg template using React and Parcel. It includes sample dashboard, extension, and graphics code, as well as some helpers and hooks to make working with NodeCg inside React easy.

## Instructions

First, check this repo out into your nodecg `bundles` directory, and rename it to your project name. Make sure to update `package.json`'s `name` field to match or `nodecg` will complain.

Then use `npm run watch` to run a watcher build on the bundle. In your `nodecg` install you should run `npm run start` to start the server. Viola! It should be working.

If you change the extension code, you'll need to restart the nodecg server. Watch builds it but nodecg doesn't pick up changes.
