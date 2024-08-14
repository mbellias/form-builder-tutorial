# Form Builder App

## Clerk

Clerk is a Nextjs authentication provider that's simple to setup. In order for the '/sign-in' and '/sign-up' pages to work properly, go to https://clerk.com and create an account. Once you do that, create a .env file and add the following environment variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=********
CLERK_SECRET_KEY=********
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

## Prisma

Prisma is an Object Relational Mapping (ORM) tool that enables JSON data to be mapped and stored into SQL or NoSQL databases. In this app, prisma is configured to store data into a PostreSQL database on Vercel.

## Vercel

Creating a database on Vercel is simple to setup and free. Go to https://vercel.com, and create an account. Once your account is created go to the storage tab, create a PostgreSQL databse, and select .env.local to get your database environment variables. For this project, you won't need all of them. These are the ones you'll need to add to your .env file:

```bash
POSTGRES_PRISMA_URL=********
POSTGRES_URL_NON_POOLING=********
```

## shadcn/ui

Shadcn/ui is a component library. Most of the UI uses their components and are styled using Tailwind CSS.

### react-icons & lucide-react

Most of the icons that are used comes from react-icons. A few are used from lucide-react.

## Server Actions

Instead of creating a REST API with endpoints that trigger database operations, Nextjs came out with the innovation of server actions. By adding the 'use server' directive to a file, you can create aync functions that can be called from a client component and execute on the server. All database operations are in the actions directory.

## dnd-kit


