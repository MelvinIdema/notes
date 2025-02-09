<script lang="ts" setup>
/**
 * Basic useFetch Example
 */
const { data: pokemons, clear: clearPokemons, refresh: refreshPokemons } = await useFetch("https://pokeapi.co/api/v2/pokemon");

/**
 * Interactive $fetch Example
 */
const pokemonDetails = ref(null);
async function fetchPokemon() {
  const thePokemon = await $fetch(`/api/random-pokemon`);
  pokemonDetails.value = thePokemon;
}

/**
 * useAsyncData Example
 */
const { data: randomPokemon, clear: clearRandomPokemon, refresh: refreshRandomPokemon } = await useAsyncData('pikachu', () => 
  $fetch('/api/random-pokemon')
);

/**
 * Lazy Fetching Example
 */
const { data: lazyPokemon, status: lazyPokemonStatus, clear: clearLazyPokemon, refresh: refreshLazyPokemon } = await useLazyFetch('/api/random-slow-pokemon');

/**
 * Code blocks for demos
 */
const useFetchCode = `const { data: pokemons } = await useFetch("https://pokeapi.co/api/v2/pokemon");`

const fetchCode = `const pokemonDetails = ref(null);
async function fetchPokemon() {
  const thePokemon = await $fetch(\`/api/random-pokemon\`);
  pokemonDetails.value = thePokemon;
}`

const asyncDataCode = `const { data: randomPokemon } = await useAsyncData('pikachu', () => 
  $fetch('/api/random-pokemon')
);`

const lazyFetchCode = `const { data: lazyPokemon, status: lazyPokemonStatus } = await useLazyFetch('/api/random-slow-pokemon');`

const key = ref(0);
function refresh() {
  clearPokemons();
  clearRandomPokemon();
  clearLazyPokemon();
  refreshPokemons();
  refreshRandomPokemon();
  refreshLazyPokemon();
  key.value++;
}
</script>

<template>
<main :key="key">
  <div class="mx-auto max-w-5xl h-full">
    <!-- Header -->
    <div class="pb-4 mb-4 border-b border-border">
      <h1 class="mb-2 text-2xl font-bold">Data Fetching Methods</h1>
      <p class="text-muted-foreground">The different approaches for fetching data in Nuxt.</p>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      
      <!-- useFetch Section -->
      <Card>
        <CardHeader>
          <CardTitle>useFetch</CardTitle>
          <CardDescription>
            Perfect for fetching data on page load. Prevents double fetching and handles SSR gracefully.
          </CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col">
            <!-- useFetch Demo -->
            <ScrollArea class="relative flex-1 max-h-[200px] mb-4">
              <div class="absolute right-0 bottom-0 left-0 h-8 bg-gradient-to-t to-transparent pointer-events-none from-card" />
              <ul>
                <li v-for="pokemon in pokemons?.results" :key="pokemon.name" 
                    class="p-3 mb-2 rounded-md border border-border">
                  {{ pokemon.name }}
                </li>
              </ul>
            </ScrollArea>

            <CodeBlock 
              :code="useFetchCode"
              lang="typescript"
              class="mt-auto"
            />
        </CardContent>
      </Card>

      <!-- Lazy Fetching Section -->
      <Card>
        <CardHeader>
          <CardTitle class="flex justify-between items-center mb-2">
            Lazy Fetching
            <Button @click="refresh">Refresh Page</Button>
          </CardTitle>
          <CardDescription>
            Non-blocking data fetching that doesn't delay page navigation.
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col">

          <!-- Lazy Fetching Demo -->
          <Card>
            <CardHeader>
              <CardTitle class="text-center">
                <span v-if="lazyPokemonStatus === 'pending'" class="text-center text-muted-foreground">Loading...</span>
                <span v-if="lazyPokemonStatus === 'error'" class="text-center text-muted-foreground">Error</span>
                <span v-if="lazyPokemonStatus === 'success' && lazyPokemon">{{ lazyPokemon?.species?.name }}</span>
              </CardTitle>
            </CardHeader>
            <CardContent class="grid place-items-center">
              <img v-if="lazyPokemonStatus === 'success' && lazyPokemon" :src="lazyPokemon.sprites?.front_default" alt="Pokemon sprite" class="mx-auto" />
            </CardContent>
          </Card>

          <CodeBlock 
            :code="lazyFetchCode"
            lang="typescript"
            class="mt-auto"
          />
        </CardContent>
      </Card>

      <!-- $fetch Section -->
        <Card>
          <CardHeader>
            <CardTitle>$fetch</CardTitle>
            <CardDescription>
              Ideal for user-triggered data fetching. Fetches fresh data on each call. Should be ideally used with useAsyncData.
              <span class="italic">Can be wrapped with <pre class="inline-block">$fetch.create()</pre>
            </span>
            </CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col">
            <Button @click="fetchPokemon" class="mb-4 w-full">Fetch Random Pokemon</Button>
          
            <!-- $fetch Demo -->
            <div class="flex flex-col gap-4 mb-4">
              <div v-if="pokemonDetails" class="p-4 rounded-md border border-border">
                <p class="mb-2 font-medium">{{ pokemonDetails.species?.name }}</p>
                <img :src="pokemonDetails.sprites?.front_default" alt="Pokemon sprite" class="mx-auto" />
              </div>
            </div>

            <CodeBlock 
              :code="fetchCode"
              lang="typescript"
              class="mt-auto"
            />
        </CardContent>
      </Card>

      <!-- useAsyncData Section -->
      <Card>
        <CardHeader>
          <CardTitle>useAsyncData</CardTitle>
          <CardDescription>
            The foundation of useFetch, providing more control over data fetching with SSR support.
            <span class="italic">useFetch is actually $fetch combined with useAsyncData.</span>
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col">
          
          <!-- useAsyncData Demo -->
          <div v-if="randomPokemon" class="p-4 rounded-md border border-border">
            <p class="mb-2 font-medium">{{ randomPokemon.species?.name }}</p>
            <img :src="randomPokemon.sprites?.front_default" alt="Pokemon sprite" class="mx-auto" />
          </div>

          <CodeBlock 
            :code="asyncDataCode"
            lang="typescript"
            class="mt-auto"
          />
        </CardContent>
      </Card>
    </div>
  </div>
</main>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px 0;
}

.pokemons {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
}
</style>
