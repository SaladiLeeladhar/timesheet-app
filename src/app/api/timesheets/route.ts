import { NextResponse } from "next/server";

const timesheetData = [
  { week: 1, dateRange: "1 - 5 January, 2024", status: "COMPLETED", action: "View" },
  { week: 2, dateRange: "8 - 12 January, 2024", status: "COMPLETED", action: "View" },
  { week: 3, dateRange: "15 - 19 January, 2024", status: "INCOMPLETE", action: "Update" },
  { week: 4, dateRange: "22 - 26 January, 2024", status: "COMPLETED", action: "View" },
  { week: 5, dateRange: "28 Jan - 1 Feb, 2024", status: "MISSING", action: "Create" },
];

export async function GET() {
  return NextResponse.json(timesheetData);
}
