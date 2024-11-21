// types/user.ts
export type ClerkUser = {
  id: string;
  emailAddresses: Array<{ emailAddress: string }>;
  firstName: string | null;
  lastName: string | null;
};

export type PrismaUser = {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN' | 'MANAGER';
};
