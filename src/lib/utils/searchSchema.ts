import { z } from 'zod';

export const searchSchema = z.object({
  searchTerm: z.string().min(3),
});
