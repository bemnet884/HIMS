// /app/api/metrics/route.ts
import { getDashboardMetrics } from '@/lib/getDashboardMetrics';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const metrics = await getDashboardMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
}
