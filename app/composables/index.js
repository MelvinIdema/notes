/**
 * API
 */
export { useAPI } from "./api/useAPI";
export { useLazyAPI } from "./api/useLazyAPI";

/**
 * Repositories
 */
export { default as useUserRepository } from "./repositories/useUserRepository";

export const useTestComposable = () => {
  return {
    test: 'test'
  }
}