import { NextRequest, NextResponse } from "next/server";

const RAW_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function buildDashboardUserStatusUrl(id: string) {
  if (!RAW_BASE_URL) return null;
  const upstreamBase = RAW_BASE_URL.replace(/\/$/, "");
  return `${upstreamBase}/dashboard/users/${id}/set-status/`;
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const statusUrl = buildDashboardUserStatusUrl(id);

  if (!statusUrl) {
    return NextResponse.json(
      { message: "NEXT_PUBLIC_API_URL is not configured." },
      { status: 500 }
    );
  }

  try {
    const authorization = request.headers.get("authorization");
    const csrf = request.headers.get("x-csrftoken");
    const body = await request.text();

    const upstreamResponse = await fetch(statusUrl, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(authorization ? { Authorization: authorization } : {}),
        ...(csrf ? { "X-CSRFTOKEN": csrf } : {}),
      },
      body,
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
      { message: "Failed to update user status from upstream API." },
      { status: 502 }
    );
  }
}
