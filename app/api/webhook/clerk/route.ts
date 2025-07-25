import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { getDbConnection } from '@/lib/db';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error occured -- no svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webhookSecret);
  let evt: any;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as any;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error occured', { status: 400 });
  }

  const { id, email_addresses, first_name, last_name } = evt.data;
  const full_name = first_name+last_name;
  const eventType = evt.type;

  if (eventType === 'user.created') {
    try {
      const sql = await getDbConnection();
      
      // Insert user with Clerk's user ID
      await sql`
        INSERT INTO users (
          email, 
          full_name,
          user_id
        ) VALUES (
            ${email_addresses[0].email_address}, 
            ${full_name}
            ${id}, 
        )
      `;
      
      console.log(`User ${id} added to database`);
    } catch (error) {
      console.error('Error adding user to database:', error);
      return new NextResponse('Error adding user', { status: 500 });
    }
  }

  return new NextResponse('', { status: 200 });
}