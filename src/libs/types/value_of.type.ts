/**
 * Define values of object enum as union type
 *
 * @example
 * const AppEnvironment {
 *   DEV = 'development',
 *   PROD = 'production'
 * } as const;
 *
 * // This variable type will be: ("development" | "production")
 * const appEnvironment: ValueOf<typeof AppEnvironment> = 'development';
 */
export type ValueOf<T extends Record<string, unknown>> = T[keyof T];
