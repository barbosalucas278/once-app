import { NextResponse } from 'next/server';
import { calendarEvents, clubInfo } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    events: calendarEvents,
    info: clubInfo,
  });
}