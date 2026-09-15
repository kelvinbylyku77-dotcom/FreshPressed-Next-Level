/**
 * Email integration boundary. No credentials or discount codes belong here.
 * Connect a same-origin subscription endpoint when Shopify/Klaviyo is ready.
 * See docs/EMAIL_INTEGRATION.md for the request/response and automation contract.
 */
export const offerConfiguration = Object.freeze({ endpoint: null });

export async function subscribeToFirstOrderOffer({ email, consent, source }, signal) {
  if (!consent || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new Error('Please enter a valid email address.');
  }
  // An honest preview: do not store an email, subscribe anyone, or simulate delivery.
  if (!offerConfiguration.endpoint) return { status: 'preview', subscribed: false };
  const response = await fetch(offerConfiguration.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ email, consent, source, offer: 'first-online-order' }),
    signal,
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !['subscribed', 'pending_confirmation'].includes(result.status)) {
    throw new Error('We couldn’t complete your signup. Please try again.');
  }
  return { status: result.status, subscribed: result.status === 'subscribed' };
}
