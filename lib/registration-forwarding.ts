import type { Registration } from "@/lib/registration";

export class RegistrationForwardError extends Error {
  status: number;

  constructor(message: string, status = 502) {
    super(message);
    this.name = "RegistrationForwardError";
    this.status = status;
  }
}

function trimBody(body: string) {
  return body.length > 500 ? body.slice(0, 500) + "..." : body;
}

export async function forwardRegistration(registration: Registration) {
  const forwardUrl = process.env.NOBIT_REGISTER_WEBHOOK_URL;
  if (!forwardUrl) {
    throw new RegistrationForwardError(
      "NOBIT_REGISTER_WEBHOOK_URL is not configured",
      503,
    );
  }

  let res: Response;
  try {
    res = await fetch(forwardUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.NOBIT_REGISTER_SECRET
          ? { "x-nobit-secret": process.env.NOBIT_REGISTER_SECRET }
          : {}),
        ...(process.env.NOBIT_APP_VERCEL_BYPASS_SECRET
          ? {
              "x-vercel-protection-bypass":
                process.env.NOBIT_APP_VERCEL_BYPASS_SECRET,
            }
          : {}),
      },
      body: JSON.stringify(registration),
      redirect: "manual",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "request failed";
    throw new RegistrationForwardError(
      `forward to management system failed: ${message}`,
      502,
    );
  }

  if (res.status === 409) {
    return { status: res.status };
  }

  if (res.status >= 300 && res.status < 400) {
    const location = res.headers.get("location");
    throw new RegistrationForwardError(
      `management system redirected ${res.status}${
        location ? ` to ${location}` : ""
      }`,
      502,
    );
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new RegistrationForwardError(
      `management system returned ${res.status}: ${trimBody(body)}`,
      res.status >= 500 ? 502 : res.status,
    );
  }

  return { status: res.status };
}
