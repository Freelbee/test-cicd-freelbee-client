# READ ME FIRST! IT'S IMPORTANT! Jabkevich wrote it!
# Freelbee client

## Development

### On local without docker

#### Install dependencies
1. First you need node js > 20. ([Node.js](https://nodejs.org/en)). Also we recommend install nvm to manage node versions. ([Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04)). Other you can find
2. Install yarn by running `npm install -g yarn`
3. Install the dependencies by running `yarn install`

#### Run the app

There is package.json in the root of the project.
You can run any app by running `yarn serve:landing` or `yarn serve:company` or `yarn serve:freelancer`

You can build any app by running `yarn build:<project>` and then serve it by running `yarn serve:<project> --prod`

You can lint and test any app by running `yarn <lint|test>:<project>` and then serve it by running `yarn serve:<project> --prod`


### On local with docker

Now you should also repeat the steps from the previous section to install the dependencies and build the app.
And then you can run script yarn container:<prjoect>.

**We know it's not the best way to run the app in the docker container, but it's the fastest way to run the app in the docker container.**


## Description

App was developed by ([FSD](https://feature-sliced.design/docs/get-started/overview))

### App structure

##### Packages
Also there are packages in ./packages
Packages has 
<span style="color: #e2d7f5">a-app</span>, 
<span style="color: #ddf9ff">b-pages</span>, 
<span style="color: #daf6df">c-widgets</span>, 
<span style="color: #fefad8">d-features</span>, 
<span style="color: #fde0c0">e-entities</span>, 
<span style="color: #ffd5d7">f-shared</span>. 
Prefixes are used to sort the packages in the order of their importance. 
So, <span style="color: #e2d7f5">a-app</span>, is the highest layer and can import from all other layers and <span style="color: #ffd5d7">f-shared</span>.  is the lowest layer and can't import from any other layer.

##### Apps
There are N projects. On 7fh feb 2024. company, freelancer, landing in ./apps .
Packages are shared between all projects in apps.
Each app has src directory with the same structure line in the ./packages.

And `./apps/<project>` can import only from ./packages and `./apps/<project>/src`. <br/>
`./apps/<project>/src` has the same structure and logic as `./packages`. but can also import from ./packages. <br/>
But **./apps/<project>/src/<span style="color: #ffd5d7">f-shared</span>** can import only from **./packages/<span style="color: #ffd5d7">f-shared</span>**.<br/>
**./apps/<project>/src/<span style="color: #fde0c0">e-entities</span>**,  can import only from **./packages/<span style="color: #fde0c0">e-entities</span>**, and **./apps/<project>/src/<span style="color: #ffd5d7">f-shared</span>**.<br/>
And **./apps/<project>/src/<span style="color: #fefad8">d-features</span>** can import only from
**./packages/<span style="color: #fefad8">d-features</span>**,
**./packages/<span style="color: #fde0c0">e-entities</span>** and **./apps/<project>/src/<span style="color: #ffd5d7">f-shared</span>**.<br/>
And so on.


### App Tests

**For testing, the following are used:**
 - Jest, react-testing-library - unit tests;
 - Cypress - e2e tests;

There are e2e tests for each project in `./apps/<project>-e2e.` And unit tests for each package in `./packages/<package>/src.`

**Running tests:**

***Run all tests(unit + e2e - for apps, only unit - for packages) - in headless mode:***

`yarn test:<app/package name> `

Example: 
`yarn test:landing` - run unit and e2e tests for the landing app; 
`yarn test:shared `- run unit tests for the shared package;

***Run only e2e tests - in headless mode:***

`nx e2e <project>-e2e`

Example:
`nx e2e landing-e2e`

***Run e2e tests - in headed mode:***

`nx e2e <project>-e2e --watch`

Example:

`nx e2e landing-e2e --watch`

***Run unit tests only:***

`nx test <app or package name>`

Example:

`nx test landing` - all unit tests in the landing app
`nx test f-shared` - all unit tests in the shared package

**<span style="color: hsla(358,62%,47%,0.9)">You should create tests for all forms you develop.</span>**

### App linting

We use eslint and stylelint for linting. You can run linting for each project by running `nx lint:<project>` or `nx lint:<package>/<project>`.

See ./eslintrc.json and ./eslintignore in root of project for eslint configuration. There are rules for fsd.

**Example of rules:**
```json
{
  "sourceTag": "layout:app",
  "onlyDependOnLibsWithTags": [ "layout:app","layout:pages","layout:widgets","layout:features","layout:entities","scope:shared"]
}
```
It means that the package can import only from the packages with the same tag or from the packages with the tags from the onlyDependOnLibsWithTags array.<br/
You can see layout:app or layout:pages. It's tags for the packages. 
You can see them in the ./packages/<layer>/project.json or ./apps/<project>/project.json
and ./apps/<project>/src/<layer>/project.json

Also see ./apps/<project>/eslintrc.json

### App versioning

**Each app in a monorepository is versioned independently and has its own version number**

For versioning is used:
- [changesets library](https://github.com/changesets/changesets)
- [changesets/action](https://github.com/apps/changeset-bot)
- [changesets/bot](https://github.com/changesets/action)

***Versioning is performed using changeset files.*** 

- Changeset is a file containing information about changes made in this branch/commit
- Changeset files are stored in the .changeset folder in the root of the project. The library generates a unique name and adds the file to this folder.
- Files are accumulated over the course of one release cycle as they are added by developers and deleted after versioning is complete.

**Flow versioning:**

***Locally:***

When work in your branch is completed:
 - Run the `npx changeset` command - changeset/cli will be opened
 - Select which projects have been changed
 - Select for which projects you want to update the major version (if not - do not select anything)
 - Select for which projects the minor version should be updated (if not - do not select anything)
 - For all projects that were not selected in the previous two steps, but were added to the list of changed projects - the version patch  is automatically applied.
 - Enter description of changes made in your branch - it will be used when making Changelog release
- Commit changes and push to repository

***In the project repository:***

- Create a PR of your branch in develop after testing.
- The changeset bot will start - it will show you if there are changeset files in your PR and what version changes they contain.
- Merge your PR into develop.
- Push from develop to main - this will trigger the release pipeline
- The release pipeline generates the final versions of the projects, creates a CHANGELOG file with a list of changes and creates a Release PR  to the main branch.
- Release PR is kept up to date - on a second push to the main branch its contents will be updated.
- Accepting the Release PR means the release cycle is complete. After acceptance, the second pass of the release pipeline is started - git tags are published, updated versions and CHANGELOG file are added to the main branch.

### App aliases

We use aliases for the packages. You can see them in the ./tsconfig.base.json. Also you can see them in the ./apps/<project>/tsconfig.json and ./apps/<project>/tsconfig.spek.json

And you always should use aliases for the imports in the code.
Expect for the imports from the segments in slice. You should use relative paths for the imports from the segments in slice. ([Learn FSD](https://feature-sliced.design/docs/get-started/overview))

## Details of each project

### Landing

you can see next.config.js in the root of the project.
It's the configuration for the next.js. 
There is props webpack where was added config for svg limit. 
Default in Nx is 10rb limit for svg. But we need to remove it.

TODO: Add description of the project

### Company
TODO: Add description of the project

### Freelancer
TODO: Add description of the project


## Deployment by github actions

There are deployment.yaml in .github/workflows. It's the configuration for the deployment.<br/>
For understanding how it work you should know how work events, matrix, containers registry, docker.

For deployment there is ./generate-docker-compose.sh.
generate-docker-compose.sh calls docker-compose.<project>.deploy.yaml and 
then remove-old-images.sh with param  $KEEP_IMAGES - it's the number of the images that should be kept on the server. 
It's the script for generating docker-compose.<project>.deploy.yaml in server for the deployment.
It's used in the deployment.yaml.

**How it works:**
1. First you should create the server. You can use digitalocean, aws, google cloud, azure or any other.
2. Create ssh with passphrase and add it to the server.
3. In github secrets add the ssh key and passphrase.
In github actions we created <TEST|PROD|DEMO>_SSH_HOST, <TEST|PROD|DEMO>_SSH_USERNAME, <TEST|PROD|DEMO>_SSH_PRIVATE_KEY,  <TEST|PROD|DEMO>_SSH_PASSPHRASE. You can see how we use them in the deployment.yaml.
```yaml
    env:
      SSH_HOST_ENV: "${{ inputs.environment }}_SSH_HOST"
      SSH_USERNAME_ENV: "${{ inputs.environment }}_SSH_USERNAME"
      SSH_PRIVATE_KEY_ENV: "${{ inputs.environment }}_SSH_PRIVATE_KEY"
      SSH_PASSPHRASE_ENV: "${{ inputs.environment }}_SSH_PASSPHRASE"
```

**Job steps:**
1. check-branch-and-env - check the branch and environment. It's the first step for the deployment. It checks the branch and environment and if it's not the right branch or environment it stops the deployment.
2. build-and-push - build the docker image for selected projects and push it to the docker registry. It's the second step for the deployment. It builds the docker image and push it to the docker registry.
3. deploy - deploy the docker image to the server. It's the third step for the deployment. It deploys the docker image to the server.

## Testing in github actions

There are testing.yaml in .github/workflows. It contains the configuration to run linting, tests and build projects.

Pipeline is automatically started on a pull request opened in the main branch or the develop branch.

**Job steps:**
1. paths-filter - Detect which applications or packages have been changed (relative to the branch to which the pull request is opened). **Further steps will only be performed for modified apps or packages!**
2. For each modified app or package a job will run withs following steps:
- Install dependencies (dependencies are cached using actions/cache);
- Create .env file and write the necessary variables into it(required for tests). Data can be stored in github secrets(for sensitive information) or in github variables
```yaml
      - name: Create env file
        run: |
          {
            echo '  NEXT_PUBLIC_BOT_TOKEN=${{ secrets.TEST_NEXT_PUBLIC_BOT_TOKEN }}'
            echo '  NEXT_PUBLIC_TG_CHANNEL_ID=${{ vars.TEST_NEXT_PUBLIC_TG_CHANNEL_ID }}'
            echo '  NEXT_PUBLIC_PERSONAL_URL=${{ vars.TEST_NEXT_PUBLIC_PERSONAL_URL }}'
          } >> apps/landing/.env
```
- Run app/package linting with `yarn lint:<app|package>`;
- Run app/package testing with `yarn test:<app|package>`;
- Perform app build(for apps only) with `yarn build:<app>`;

