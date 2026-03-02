exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
  const { message, channelId } = JSON.parse(event.body);

  try {
    const res = await fetch("https://slack
