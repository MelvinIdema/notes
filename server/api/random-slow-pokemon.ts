export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const name = Math.floor(Math.random() * 150) + 1;
  const pokemon = await $fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return pokemon;
});
