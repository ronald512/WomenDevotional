import { THEMES, PROVERBS_POOL, FORMATS } from '../constants';
import { DailyDevotionalContent } from '../types';

export const generateDailyDevotional = (dayNumber: number): DailyDevotionalContent => {
  const themeIndex = (dayNumber - 1) % THEMES.length;
  const verseIndex = (dayNumber - 1) % PROVERBS_POOL.length;
  const formatIndex = (dayNumber - 1) % FORMATS.length;

  const theme = THEMES[themeIndex];
  const verse = PROVERBS_POOL[verseIndex];
  const format = FORMATS[formatIndex];

  let bodyText: string[] = [];
  let promptText = "";
  let actionText = "";

  if (theme.source.includes("Gottman")) {
    bodyText = [
      `Today we look at the principle of **${theme.title}**. Dr. Gottman's research shows that masters of marriage excel at ${theme.concept.toLowerCase()}.`,
      "It's not about grand gestures, but the small moments. When we nurture this, we build a 'Positive Sentiment Override' that protects us during conflict.",
      `Consider: How is the 'friendship layer' of your marriage doing today? ${theme.title} is a key part of that foundation.`
    ];
    promptText = "What is one small way I can practice this principle today?";
    actionText = "Catch him doing something right and tell him.";
  } else if (theme.source.includes("Harley")) {
    bodyText = [
      `Dr. Harley identifies **${theme.title}** as a primary emotional need. ${theme.concept}`,
      "When this need is met, it deposits 'Love Units' into the Love Bank. When it is neglected, we may unknowingly withdraw from that account.",
      "Meeting this need doesn't always require huge effort, just intentionality."
    ];
    promptText = "On a scale of 1-10, how well do I think I am meeting this specific need lately?";
    actionText = "Ask him: 'What is one thing I could do to make you feel more supported in this area?'";
  } else if (theme.source.includes("Feldhahn")) {
    bodyText = [
      `Based on research from *For Women Only*, we explore **${theme.title}**.`,
      `${theme.concept} It's often invisible to us as wives, but it colors his entire world.`,
      "Understanding this helps us decode his silence not as unlove, but as processing or pressure."
    ];
    promptText = "Have I misinterpreted his behavior recently because I didn't see this underlying need?";
    actionText = "Thank him for something he handles that you usually take for granted.";
  } else if (theme.source.includes("Doyle")) {
    bodyText = [
      `Laura Doyle invites us to consider **${theme.title}**.`,
      `${theme.concept} This can feel scary at first, but it is often the path to intimacy.`,
      "When we step back, we create a vacuum that he is often eager to fill."
    ];
    promptText = "Where am I holding onto control or resentment that I could gently release?";
    actionText = "Practice saying 'I trust you' regarding a decision today.";
  } else {
    bodyText = [
      `Reflecting on **${theme.title}**, we remember that our home is a sanctuary.`,
      `${theme.concept} In a world that is often harsh, your gentleness is a superpower.`,
      "Let this thought anchor you: You are the thermostat of your home's atmosphere."
    ];
    promptText = "Is my tone building a sanctuary or a courtroom today?";
    actionText = "Speak softly today, even when you feel the urge to be loud.";
  }

  let title = theme.title;
  let subTitle = theme.source;

  if (format === "Seeing Him Clearly") {
    title = `Myth vs. Reality: ${theme.title}`;
    bodyText.unshift("**Myth:** If he loves me, he'll just know what I need.\n**Reality:** He loves you, but his mind works differently.");
  } else if (format === "Prayer With Direction") {
    title = `Prayer for ${theme.title}`;
    bodyText.push("Let's turn this insight into a prayer.");
    actionText = "Pause for 30 seconds and pray this specific scripture over him.";
  }

  return {
    day: dayNumber,
    title: title,
    anchor: theme.concept,
    scripture: `“${verse.text}” — ${verse.ref}`,
    body: bodyText,
    prompt: promptText,
    action: actionText,
    source: subTitle,
    format: format,
    topic: verse.topic
  };
};