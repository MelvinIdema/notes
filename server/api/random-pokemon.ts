export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (query.lazy) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  const name = Math.floor(Math.random() * 150) + 1;
  const pokemon = await $fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return pokemon;
});
