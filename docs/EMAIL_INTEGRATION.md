# First-order email offer integration

## Delivered behavior

`site/offer-integration.js` exports `offerConfiguration` and `subscribeToFirstOrderOffer(payload, signal)`. The endpoint is `null`. A valid submission returns `{ "status": "preview", "subscribed": false }` locally. It does not store or transmit the address. The success state explicitly says no email was sent and no address was saved.

The popup has email validation, consent copy, a disabled loading button, a ten-second timeout, accessible error feedback and a success state. It appears after an idle delay and is suppressed on that device for seven days after opening/dismissal. Manual offer links remain available. There is no coupon in active UI/source and no browser-only cart discount.

## Endpoint contract

When the real integration is ready, set `offerConfiguration.endpoint` to a same-origin route such as `/api/subscribe`. The preview note automatically hides when configured. This static build does not supply that server route.

The browser sends JSON via POST, with same-origin credentials and an AbortSignal:

```json
{
  "email": "customer@example.com",
  "consent": true,
  "source": "first-order-popup",
  "offer": "first-online-order"
}
```

The server validates email and consent, records consent under the store's policy, handles duplicates and rate limits, then calls the chosen provider with a server-held key. Keep private provider keys, approved codes and privileged calls out of browser code. Never trust the client's offer name to determine eligibility.

Successful responses are `{ "status": "pending_confirmation" }` when confirmation is required, or `{ "status": "subscribed" }` only when subscription is confirmed and the welcome automation can proceed. An asynchronous accepted job is not proof of subscription or delivery. Use non-2xx responses for validation/provider failures; the UI shows a retry message. There is deliberately no coupon field in the response.

## Shopify / Klaviyo workflow

1. The visitor submits an email and agrees to marketing.
2. The server creates/updates the profile and subscribes it to the intended marketing list, honoring opt-in settings.
3. The visitor confirms their address if double opt-in applies.
4. A welcome automation emails the owner-approved unique or approved 20% first-order offer.
5. Shopify checkout validates eligibility, expiry, usage limits, combinations and minimums.

For Klaviyo, call **Bulk Subscribe Profiles** from the server. Required scopes include `lists:write`, `profiles:write` and `subscriptions:write`. Its HTTP 202 response starts an asynchronous job. List opt-in settings determine confirmation requirements. Do not use historical import to bypass normal signup. See [Klaviyo's subscription endpoint](https://developers.klaviyo.com/en/reference/bulk_subscribe_profiles).

For Shopify's email tooling (now documented as Shopify Messaging), configure a welcome automation for customers with the required email marketing subscription. Use the store's supported signup/customer integration when migrating into Shopify. See [Shopify marketing automations](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/shopify-messaging/marketing-automations).

No email service, Shopify variant IDs, API credentials, discount configuration or automation was supplied. Those account-side connections remain to be configured. No real signup or email was simulated.
