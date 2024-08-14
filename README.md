# Form Builder App - TypeScript, Nextjs, Tailwind

PageForm is a form builder where you can drag, drop, and arrange the order of different form elements. 

These are the element types:

```bash
export type ElementsType =
  | 'TextField'
  | 'TitleField'
  | 'SubTitleField'
  | 'ParagraphField'
  | 'SeparatorField'
  | 'SpacerField'
  | 'NumberField'
  | 'TextareaField'
  | 'DateField'
  | 'SelectField'
  | 'CheckboxField';
```

Each element type has 3 components: designer, form, and properties. The designer component is responsible for the UI of the element in the editing dashboard, the form component is responsible for the UI of the element once the form is published, and the properties component is responsible for the UI of customizing the form element. Some elements are for the layout (e.g. TitleField, SpacerField, SepatorField), and others are for the form (e.g. TextField, NumberField, DateField). 

```bash
export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};
```

The application state is managed using React's useContext hook. These are the definitions for the app's context provider:

```bash
type DesignerContextType = {
  elements: FormElementInstance[];
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;

  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;

  updateElement: (id: string, element: FormElementInstance) => void;
};
```

Once a form is created and published, it can be shared, filled out and submitted. The main dashboard tracks visits, submissions, submission rate and bounce rate for all your forms:

```bash
export async function GetFormStats() {
  const { userId, redirectToSignIn } = auth();

  if (!userId) redirectToSignIn();

  const stats = await prisma.form.aggregate({
    where: { userId: userId as string },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}
```


## Clerk

Clerk is a Nextjs authentication provider that's simple to setup. In order for the '/sign-in' and '/sign-up' pages to work properly, go to https://clerk.com and create an account. Once you do that, create a .env file and add the following environment variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=********
CLERK_SECRET_KEY=********
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

## Vercel

Creating a database on Vercel is simple to setup and free. Go to https://vercel.com, and create an account. Once your account is created go to the storage tab, create a PostgreSQL databse, and select .env.local to get your database environment variables. For this project, you won't need all of them. These are the ones you'll need to add to your .env file:

```bash
POSTGRES_PRISMA_URL=********
POSTGRES_URL_NON_POOLING=********
```

## Prisma

Prisma is an Object Relational Mapping (ORM) tool that enables JSON data to be mapped and stored into SQL or NoSQL databases. In this app, prisma is configured to store data into a PostreSQL database. Once you have a database configured, you'll need to run this command to synchronize it with your schema:

```bash
npx prisma migrate dev
```

## Server Actions

Instead of creating a REST API with endpoints that trigger database operations, Nextjs came out with the innovation of server actions. By adding the 'use server' directive to a file, you can create aync functions that can be called from a client component and execute on the server. All database operations are in the '/src/actions' directory.

## shadcn/ui

Most of the UI uses their components and are styled using Tailwind CSS. All of the components used by shadcn/ui is in the '/src/components/ui' directory.

### react-icons & lucide-react

Most of the icons that are used comes from react-icons. A few are used from lucide-react.


## dnd-kit

Dnd-kit is a powerful drag and drop library. The FormBuilder component is wrapped in the DndContext provider which allows it's children to use the hooks useDraggable and useDroppable. The Designer and DesignerSidebar components use those hooks.

## Tailwind CSS

Tailwind is a utility-first CSS framework.
