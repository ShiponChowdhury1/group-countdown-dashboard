import { NextRequest, NextResponse } from "next/server";

const RAW_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function buildDashboardUserDeleteUrl(id: string) {
  if (!RAW_BASE_URL) return null;
  const upstreamBase = RAW_BASE_URL.replace(/\/$/, "");
  return `${upstreamBase}/dashboard/users/${id}/delete/`;
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const deleteUrl = buildDashboardUserDeleteUrl(id);

  if (!deleteUrl) {
    return NextResponse.json(
      { message: "NEXT_PUBLIC_API_URL is not configured." },
      { status: 500 }
    );
  }

  try {
    const authorization = request.headers.get("authorization");
    const csrf = request.headers.get("x-csrftoken");

    const upstreamResponse = await fetch(deleteUrl, {
      method: "DELETE",
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
      { message: "Failed to delete user from upstream API." },
      { status: 502 }
    );
  }
}
