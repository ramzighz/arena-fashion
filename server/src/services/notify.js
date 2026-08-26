// New-order notifications via Telegram and/or WhatsApp (CallMeBot).
// Configure in server/.env (any combination, all optional):
//   TELEGRAM_BOT_TOKEN=123456:ABC-DEF...   (create a bot with @BotFather in Telegram)
//   TELEGRAM_CHAT_ID=123456789             (your numeric chat id)
//   CALLMEBOT_PHONE=213558450843           (your WhatsApp number, country code, no +)
//   CALLMEBOT_API_KEY=123456               (from callmebot.com free WhatsApp API)

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) console.error('[notify] Telegram error:', res.status);
  } catch (err) {
    console.error('[notify] Telegram failed:', err.message);
  }
}

async function sendWhatsApp(text) {
  const phone = process.env.CALLMEBOT_PHONE;
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!phone || !apiKey) return;
  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=%2B${phone}&text=${encodeURIComponent(text)}&apikey=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) console.error('[notify] WhatsApp error:', res.status);
  } catch (err) {
    console.error('[notify] WhatsApp failed:', err.message);
  }
}

export async function notifyNewOrder(order) {
  const lines = order.items.map((i) => `- ${i.name} (${i.size}) x${i.quantity} = ${(i.price * i.quantity).toLocaleString('fr-DZ')} DZD`);
  const text = [
    `NEW ORDER ${order.orderId}`,
    ...lines,
    `Total: ${order.total.toLocaleString('fr-DZ')} DZD (COD)`,
    ``,
    `Client: ${order.shippingAddress.fullName}`,
    `Adresse: ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}`,
    `Tel: ${order.contact.phone}`,
  ].join('\n');

  await Promise.allSettled([sendTelegram(text), sendWhatsApp(text)]);
}
