# crud-api
**RS School task**

### Description
This app implement simple CRUD API which use in-memory database underneath. It fully wrote on `TypeScript` without any node frameworks.

### Installation
For installation, you need to clone git repository https://github.com/PavelKizhlo/crud-api.git
and run `npm install` command in terminal.

### Scripts
- `npm run start:dev`

  When the script is run, the `nodemon` package starts to watch for changes in the `src` folder. After every change it runs `index.ts` file which compiles into JS by `ts-node` with `--esm` flag. By default, server listen `port 3000` (specified in `.env` file).


- `npm run start:prod`

  After running the script, webpack starts. It compiles `.ts` files using `ts-loader`. When bundling finished, bundled file located in `dist` folder. It also uses ESM syntax for imports from libs (it is possible due to `experiments.outputModule: true` option in the `webpack.config`). Compiled file have `.js` extension and running by `node`. 


- `npm run test` Run integration tests. There are 17 tests cases which check all endpoints, with different scenarios. Libraries used for testing: `Jest`, `Supertest`. 
