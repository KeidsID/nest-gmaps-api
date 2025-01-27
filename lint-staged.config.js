/** @type {import('lint-staged').Config} */
const config = {
  "{src,test}/*.(t|j|cj)s": ["npm run lint"],
  "src/*.(t|j|cj)s": ["npm run test"],
  "test/*.(t|j|cj)s": ["npm run test:e2e"],
};

export default config;
