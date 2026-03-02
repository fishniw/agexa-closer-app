exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
  const { message, channelId } = JSON.parse(event.body);

  try {
    const res = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SLACK_BOT_TOKEN}`
      },
      body: JSON.stringify({
        channel: channelId,
        text: message,
        mrkdwn: true
      })
    });

    const data = await res.json();

    if (!data.ok) throw new Error(data.error || "Slack API error");

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: err.message }) };
  }
};
