import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "customer.subscription.created":
      const subscriptionCreated = event.data.object as Stripe.Subscription;
      console.log("Subscription created:", subscriptionCreated.id);

      // TODO: Update your database with subscription info
      // await updateUserSubscription(subscriptionCreated.metadata.userId, {
      //   subscriptionId: subscriptionCreated.id,
      //   status: 'active',
      //   planId: subscriptionCreated.items.data[0].price.id,
      //   currentPeriodEnd: new Date(subscriptionCreated.current_period_end * 1000),
      // });

      break;

    case "customer.subscription.updated":
      const subscriptionUpdated = event.data.object as Stripe.Subscription;
      console.log("Subscription updated:", subscriptionUpdated.id);

      // TODO: Update subscription status in your database
      break;

    case "customer.subscription.deleted":
      const subscriptionDeleted = event.data.object as Stripe.Subscription;
      console.log("Subscription cancelled:", subscriptionDeleted.id);

      // TODO: Update user's subscription status to cancelled
      break;

    case "invoice.payment_succeeded":
      const invoice = event.data.object as Stripe.Invoice;
      console.log("Payment succeeded:", invoice.id);

      // TODO: Update payment history and extend subscription
      break;

    case "invoice.payment_failed":
      const failedInvoice = event.data.object as Stripe.Invoice;
      console.log("Payment failed:", failedInvoice.id);

      // TODO: Handle failed payment (send notification, update status)
      break;

    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Checkout completed:", session.id);

      // TODO: Fulfill the purchase and activate premium features
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response("Success", { status: 200 });
}
