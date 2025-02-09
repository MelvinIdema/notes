export const useLazyAPI = (endpoint, options = {}) => {
    return useLazyFetch(endpoint, {
        ...options,
    })
}