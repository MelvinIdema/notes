/**
 * Helper function to define a repository with a more declarative API
 * @param {Object} options - Repository configuration options
 * @param {string} options.endpoint - The base endpoint for this repository
 * @param {Object} options.methods - Custom method implementations
 * @returns {Function} A factory function that creates a repository instance
 */
export const defineNuxtRepository = (options) => {
  // Create the base repository factory
  const baseFactory = createRepository(options.endpoint)
  
  // Return a function that creates the repository instance
  return () => {
    const config = useRuntimeConfig();
    
    // Get the dynamic fetch function from useNuxtApp if specified in options
    const fetch = options.fetch ? options.fetch === '$fetch' ? $fetch : useNuxtApp()[options.fetch] : useNuxtApp()[config.public.defaultFetch]

    // Get base repository implementation
    const baseRepository = baseFactory(fetch)
    
    // Create the final repository by combining base and custom implementations
    const repository = {
      ...baseRepository,
      // Inject baseRepository into the context of custom methods
      ...Object.entries(options).reduce((acc, [key, value]) => {
        // Skip the endpoint key since it's not a method
        if (key === 'endpoint') return acc
        
        // If the value is a function, bind it with context
        if (typeof value === 'function') {
          acc[key] = value.bind(null, {
            baseRepository,
            fetch,
            endpoint: options.endpoint
          })
        }
        
        return acc
      }, {})
    }

    return repository
  }
}

/**
 * This is a repository done "the right way" according to official Nuxt documentation.
 *
 * Check out this video for more information on the pattern:
 * https://www.youtube.com/watch?v=jXH8Tr-exhI
 *
 * Or the Nuxt documentation which briefly mentions it:
 * https://nuxt.com/docs/getting-started/data-fetching
 *
 * @param {Function} fetch - The fetch function to use.
 * @param {String} endpoint - The endpoint to use.
 * 
 * @returns {Object} The repository object.
 */
export const createRepository = (endpoint) => (fetch) => {
  async function index(query) {
    return fetch(`${endpoint}`, {
      query,
    });
  }

  async function create(payload) {
    return fetch(`${endpoint}`, {
      method: "POST",
      body: payload,
    });
  }

  async function read(id) {
    return fetch(`${endpoint}/${id}`);
  }

  async function update(payload) {
    return fetch(`${endpoint}`, {
      method: "PUT",
      body: payload,
    });
  }

  async function destroy(id) {
    return fetch(`${endpoint}/${id}`, {
      method: "DELETE",
    });
  }

  return {
    index,
    create,
    read,
    update,
    destroy,
  };
};
