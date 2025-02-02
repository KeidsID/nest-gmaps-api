export type UseCase<ReturnT> = {
  execute(...parameters: unknown[]): ReturnT | Promise<ReturnT>;
};
