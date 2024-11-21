import { clerkClient } from "@clerk/nextjs/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { createUser } from "@/actions/userAction";

export async function POST(req: Request) {
  // Fetch Webhook Secret from the environment
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Retrieve headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // Validate the presence of required headers
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- missing svix headers", {
      status: 400,
    });
  }

  // Parse the body payload
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify the webhook payload
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Extract the ID and type from the event
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    // Extract relevant data from the webhook
    const { id: clerkId, email_addresses, image_url, first_name, last_name } =
      evt.data;

    // Build user data that matches the CreateUserInput type
    const user = {
      clerkId,
      email: email_addresses[0]?.email_address || "",
      firstName: first_name || "Unknown",
      lastName: last_name || "Unknown",
      role: "USER", // Default role
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("Creating user:", user);

    // Save the user to the database
    const { user: newUser, error } = await createUser(user);

    if (error) {
      console.error("Error creating user:", error);
      return NextResponse.json({ message: "Failed to create user", error }, { status: 500 });
    }

    return NextResponse.json({ message: "New user created", user: newUser });
  }

  console.log(`Webhook with ID ${id} and type ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}
