export abstract class ConfigService {
  abstract readonly ENV: EnvironmentSchema;
}

export type EnvironmentSchema = {
  APP: { PORT: number };
  GOOGLE_MAPS: { API_KEY: string };
};
