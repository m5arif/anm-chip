// packages/db/schema/animals.ts
import { pgTable, uuid, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core';

// Enums from Module 2.1 [cite: 102]
export const speciesEnum = pgEnum('species', ['dog', 'cat', 'other']);
export const sexEnum = pgEnum('sex', ['male', 'female', 'unknown']);

export const animals = pgTable('animals', {
  id: uuid('id').primaryKey().defaultRandom(),
  species: speciesEnum('species').notNull(),
  sex: sexEnum('sex').notNull().default('unknown'),
  // ... other fields from [cite: 110-116]
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Chips table for ISO 11784 compliance [cite: 119-130]
export const chips = pgTable('chips', {
  id: varchar('id', { length: 15 }).primaryKey(), // 15 digits strictly
  animalId: uuid('animal_id').references(() => animals.id).notNull(),
  verificationHash: varchar('verification_hash', { length: 64 }).notNull(),
});
