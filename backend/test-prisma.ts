// test-prisma.ts
import { prisma } from './lib/prisma.ts';

async function main() {
  console.log('Testing Prisma...');
  
  const count = await prisma.pattern.count();
  console.log(`✓ Connected! Patterns: ${count}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(console.error);