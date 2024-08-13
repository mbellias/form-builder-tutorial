'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from '../lib/prisma';
import { formSchema, formSchemaType } from '@/schemas/form';

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

export async function CreateForm(data: formSchemaType) {
  const { userId, redirectToSignIn } = auth();
  const validation = formSchema.safeParse(data);

  if (!validation) throw new Error('form not valid');

  if (!userId) redirectToSignIn();

  const form = await prisma.form.create({
    data: {
      userId: userId as string,
      name: data.name,
      description: data.description,
    },
  });

  if (!form) throw new Error('Something went wrong');

  return form.id;
}

export async function GetForms() {
  const { userId, redirectToSignIn } = auth();

  if (!userId) redirectToSignIn();

  return await prisma.form.findMany({
    where: { userId: userId as string },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function GetFormById(id: number) {
  const { userId, redirectToSignIn } = auth();

  if (!userId) redirectToSignIn();

  return await prisma.form.findUnique({
    where: { userId: userId as string, id },
  });
}

export async function UpdateFormContent(id: number, jsonContent: string) {
  const { userId, redirectToSignIn } = auth();

  if (!userId) redirectToSignIn();

  return await prisma.form.update({
    where: {
      userId: userId as string,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function PublishForm(id: number) {
  const { userId, redirectToSignIn } = auth();

  if (!userId) redirectToSignIn();

  return await prisma.form.update({
    where: {
      userId: userId as string,
      id,
    },
    data: {
      published: true,
    },
  });
}

export async function GetFormContentByUrl(formUrl: string) {
  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareUrl: formUrl,
    },
  });
}

export async function SubmitForm(formUrl: string, content: string) {
  return prisma.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareUrl: formUrl,
      published: true,
    },
  });
}

export async function GetFormWithSubmissions(id: number) {
  const { userId, redirectToSignIn } = auth();

  if (!userId) redirectToSignIn();

  return await prisma.form.findUnique({
    where: {
      userId: userId as string,
      id,
    },
    include: {
      FormSubmissions: true,
    },
  });
}
