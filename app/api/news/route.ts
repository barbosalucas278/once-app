import { NextResponse } from 'next/server';
import { newsData } from '@/lib/data';

export async function GET() {
  return NextResponse.json(newsData);
}