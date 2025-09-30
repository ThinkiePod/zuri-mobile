import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const customerId = url.searchParams.get("customerId");
    const email = url.searchParams.get("email");

    if (!customerId && !email) {
      return Response.json({
        isActive: false,
        error: "No customer identifier provided",
      });
    }

    let customer;

    if (customerId) {
      customer = await stripe.customers.retrieve(customerId);
    } else if (email) {
      const customers = await stripe.customers.list({
        email: email,
        limit: 1,
      });
      customer = customers.data[0];
    }

    if (!customer || customer.deleted) {
      return Response.json({ isActive: false });
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 1,
    });

    const isActive = subscriptions.data.length > 0;
    const subscription = subscriptions.data[0];

    return Response.json({
      isActive,
      subscription: subscription
        ? {
            id: subscription.id,
            status: subscription.status,
            current_period_end: subscription.current_period_end,
            cancel_at_period_end: subscription.cancel_at_period_end,
          }
        : null,
    });
  } catch (error: any) {
    console.error("Subscription status check error:", error);
    return new Response(
      JSON.stringify({ isActive: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
