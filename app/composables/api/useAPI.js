export const useAPI = (endpoint, options = {}) => {
    return useFetch(endpoint, {
        ...options,
    })
}