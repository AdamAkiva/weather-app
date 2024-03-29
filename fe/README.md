# Weather application

## Run instructions

The project should be ran via docker (will not work without the env variables
supplied by it).  
See [here](../README.md) for instructions on how to run it.

## Tech stack

### The code is written in nodeJS using typescript. The main libraries in use are:

- `Framework` -> React
- `Style` -> Mui with emotion
- `Build tool` -> Vite

---

## NPM Scrips

- `start:dev`: Serve the frontend with a vite server
- `test`: Run the tests
- `lint`: Run linter & tsc on the frontend (without auto-fix)
- `check-global-updates`: Checks for any updates to the global npm packages you
  have installed (Should be ran on your machine, not inside the docker)
- `check-local-updates`: Checks for any updates to the project dependencies
  (dev and prod) (Can be ran on your machine or inside the docker, it does not
  matter)
- `commit-local-updates`: Commit the local package updates to package.json, so
  they can be installed using `npm install`
- `check-code-deps`: Checks if you have any packages in your code which are not
  in use anywhere. This may have false-positive values if you have a package
  which is not imported anywhere. In that case you should skip checking it,
  see the script value for an example
- `check-cir-deps`: Checks the code base for any circular dependencies (ignores
  circular type imports since they are omitted in production)
- `_install-start`: **Used by the docker, should not be called manually**. This script
  contains the setup for running the local environment via docker
- `_test:ci`: **Used by the docker, should not be called manually**. This script
  is used by the an external service to run the backend CI/CD pipeline
- `_build`: **Used by the docker, should not be called manually**. This script
  is used to build the application for production. This is used by an external
  service
