const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  "beach",
  "windmills",
  "modern",
  "countryside",
  "pools",
  "islands", 
  "lake",
  "skiing", 
  "castles", 
  "camping",
  "artic",
  "cave",
  "desert", 
  "barns",
  "lux"
];

async function main() {
  for (const category of categories) {
    await prisma.category.create({
      data: { type: category },
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
