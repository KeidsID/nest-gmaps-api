export abstract class ConfigService {
  abstract readonly ENV: EnvironmentSchema;
}

export type EnvironmentSchema = {
  APP: { PORT: number; ORIGINS: string[] };
  GOOGLE_MAPS: { API_KEY: string };
};
