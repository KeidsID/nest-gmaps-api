# nest-gmaps-api

Simple Google Maps API Proxy Server.

## Table Of Contents

- [Developer Section](#developer-section)
  - [Requirements](#requirements)
  - [Dependencies](#dependencies)
  - [Setup](#setup)
  - [API Documentation](#api-documentation)
  - [Project Structures](#project-structures)
  - [Git Conventions](#git-conventions)

## Developer Section

### Requirements

[node-archive]: https://nodejs.org/en/about/previous-releases
[nvm]: https://github.com/nvm-sh/nvm

- Install [Node.js][node-archive] with the same version as defined on
  [`package.json`](package.json) engines or [`.nvmrc`](.nvmrc) file.

  You may use [NVM][nvm] (Node Version Manager) for easy installation.

  ```sh
  nvm use
  ```

### Dependencies

[nestjs]: https://docs.nestjs.com/
[axios]: https://axios-http.com/

Main packages that are used as foundation for this project.

- [NestJS][nestjs] -- framework for building efficient, scalable Node.js
  server-side applications.
- [Axios][axios] -- Promise based HTTP client for the browser/node.js.

### Setup

1. Install dependencies

   ```sh
   npm install
   ```

2. Intialize git hooks to validate commit messages

   ```sh
   npx simple-git-hooks
   ```

3. Create `.env` file. Use [`.env.example`](./.env.example) as a template.

4. Now you're good to go!

   ```sh
   npm run start:dev
   ```

### API Documentation

[google-maps-docs]: https://developers.google.com/maps/get-started

- [Google Maps API Docs][google-maps-docs].

### Project Structures

[clean-architecture]: https://medium.com/@DrunknCode/clean-architecture-simplified-and-in-depth-guide-026333c54454

This project is follow the [Clean Architecture][clean-architecture] principles.

[main.ts]: ./src/main.ts

- `/src` -- Source code

  - [`main.ts`][main.ts] -- Application entry point.

  - `/domain` -- Domain layer (Entities and services abstractions).

  - `/infrastructures` -- Infrastructure layer (Services implementations).

  - `/interfaces` -- Interfaces layer (Application routes/controllers).
  
  - `/use_cases` -- Application logic layer.

  - `**/libs` -- Common constants, or other utilities used by folder it belongs,
    e.g `/src/libs` is global libs, `/src/domain/libs` is domain libs, and so on.

### Git Conventions

[conventional-commits]: https://www.conventionalcommits.org

We use [Conventional Commits][conventional-commits] to handle Git commit
messages, and Github PR titles.

Look at [`gitlint.config.ts`](gitlint.config.ts) to see supported commit
types/scopes.

#### Issue Title

```sh
<type>(<scopes(optional)>): <content>
```

Examples:

- `feat: Geocoding API`
- `feat: Places API`

##### Commit Message / PR Title

```sh
<type>(<scopes(optional)>): <content> gm-<issue-number>
```

Examples:

- `feat: init swagger gm-4`
- `feat(src-use_cases): add geocode use cases gm-4`

##### Branch Name

```sh
<type>-<content>-gm-<issue-number>
```

Examples:

- `feat-geocoding-gm-4`
