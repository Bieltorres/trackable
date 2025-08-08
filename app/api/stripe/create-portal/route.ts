import Stripe from "stripe"

export async function POST(req: Request) {
  try {
    // In a real app, get customerId from your auth/session or the request body
    const { customerId } = await req.json().catch(() => ({}))

    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      // Fallback for local preview without envs: return a Stripe demo URL (won't actually work to manage real cards).
      return new Response(JSON.stringify({ url: "https://billing.stripe.com/p/login/test_12345" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    const stripe = new Stripe(key, { apiVersion: "2024-06-20" as any })

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId || process.env.STRIPE_CUSTOMER_ID!,
      return_url: process.env.STRIPE_RETURN_URL || "http://localhost:3000/dashboard",
    })

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Stripe portal error:", err)
    return new Response(JSON.stringify({ error: "Failed to create portal session" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
