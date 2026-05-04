import { NextRequest, NextResponse } from "next/server";

const RAW_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function buildDashboardOverviewUrl() {
  if (!RAW_BASE_URL) return null;
  const upstreamBase = RAW_BASE_URL.replace(/\/$/, "");
  return `${upstreamBase}/dashboard/overview/`;
}

export async function GET(request: NextRequest) {
  const overviewUrl = buildDashboardOverviewUrl();

  if (!overviewUrl) {
    return NextResponse.json(
      { message: "NEXT_PUBLIC_API_URL is not configured." },
      { status: 500 }
    );
  }

  try {
    const authorization = request.headers.get("authorization");
    const csrf = request.headers.get("x-csrftoken");

    const upstreamResponse = await fetch(overviewUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(authorization ? { Authorization: authorization } : {}),
        ...(csrf ? { "X-CSRFTOKEN": csrf } : {}),
      },
      cache: "no-store",
    });

    const rawBody = await upstreamResponse.text();

    return new NextResponse(rawBody, {
      status: upstreamResponse.status,
      headers: {
        "content-type":
          upstreamResponse.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch dashboard overview from upstream API." },
      { status: 502 }
    );
  }
}
