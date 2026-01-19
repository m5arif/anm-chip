// packages/api/workflows/registration.ts
import { db } from '@pet-chip/db';
import { animals, chips } from '@pet-chip/db/schema';
import { chipSchema } from '@pet-chip/shared';

export const registerAnimalWorkflow = async (input: any) => {
  // 1. Validate Input (Group D's work)
  const cleanData = chipSchema.parse(input);

  // 2. Execute Transaction (Group C's work)
  return await db.transaction(async (tx) => {
    // Insert Animal
    const [newAnimal] = await tx.insert(animals).values({
      species: 'dog',
      status: 'owned'
    }).returning();

    // Insert Chip (Linked to Animal)
    await tx.insert(chips).values({
      id: cleanData.id,
      animalId: newAnimal.id,
      verificationHash: 'sha256-hash-placeholder'
    });

    return newAnimal;
  });
};
