/** @type {import('lint-staged').Config} */
const config = {
  "{src,test}/*.(t|j|cj)s": ["npm run format", "npm run lint"],
  "src/*.test.(t|j|cj)s": ["npm run test"],
  "test/*.test.(t|j|cj)s": ["npm run test:e2e"],
};

export default config;
