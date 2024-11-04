// /app/actions/reportActions.ts
'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createReport(data: { type: string; content: Record<string, unknown> }) {
  const report = await prisma.report.create({ data: { type: data.type, content: data.content } });
  revalidatePath('/reports');
  return report;
}

export async function getReports() {
  return await prisma.report.findMany();
}

export async function getReportById(id: number) {
  return await prisma.report.findUnique({ where: { id } });
}

export async function updateReport(id: number, data: { type?: string; content?: Record<string, unknown> }) {
  const report = await prisma.report.update({ where: { id }, data });
  revalidatePath(`/reports/${id}`);
  return report;
}

export async function deleteReport(id: number) {
  await prisma.report.delete({ where: { id } });
  revalidatePath('/reports');
}
