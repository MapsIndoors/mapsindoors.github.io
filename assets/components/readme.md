
# MapsIndoors Web Components

**Stencil project with MI-Components**

The library is published on NPM as: [@mapsindoors/components](https://www.npmjs.com/package/@mapsindoors/components)

Read more about Stencil here: [Getting started](https://stenciljs.com/docs/getting-started)

## Publishing

When you want to publish to your changes to NPM, do the following from the root directory on the master branch:

- Make sure yoy have pulled everything from the master branch, including tags
- Describe the changes in `CHANGELOG.md`
- Run `npm login`
- Run `npm version patch | minor | major`

The `npm version` command will upgrade the package, commit it and push to the remote repository, and publish a distribution build to [@mapsindoors/components](https://www.npmjs.com/package/@mapsindoors/components)
