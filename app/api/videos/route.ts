import { NextResponse } from 'next/server';
import { livePrograms, previousPrograms } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    live: livePrograms,
    previous: previousPrograms,
  });
}