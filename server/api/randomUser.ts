import { faker } from "@faker-js/faker";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    randomNumber: query.randomNumber,
  };
});
