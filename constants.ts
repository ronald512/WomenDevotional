import { 
  Sun, 
  Smile, 
  Moon, 
  CloudRain, 
  Meh 
} from 'lucide-react';
import { Emotion, Proverb, Theme } from './types';

export const PROVERBS_POOL: Proverb[] = [
  { ref: "Prov 16:32", text: "Better to be patient than powerful; better to have self-control than to conquer a city.", topic: "Anger" },
  { ref: "Prov 15:1", text: "A gentle response turns away anger, but a harsh word stirs up wrath.", topic: "Speech" },
  { ref: "Prov 31:10", text: "Who can find a wife of noble character? For her value is far more than rubies.", topic: "Marriage" },
  { ref: "Prov 12:25", text: "Anxiety in a person’s heart weighs him down, but an encouraging word brings him joy.", topic: "Speech" },
  { ref: "Prov 17:22", text: "A cheerful heart brings good healing, but a crushed spirit dries up the bones.", topic: "Heart" },
  { ref: "Prov 3:3", text: "Let love and faithfulness never leave you; bind them around your neck.", topic: "Love" },
  { ref: "Prov 14:1", text: "Every wise woman has built her household, but a foolish woman tears it down.", topic: "Wisdom" },
  { ref: "Prov 19:14", text: "House and riches are the inheritance of fathers: and a prudent wife is from the LORD.", topic: "Marriage" },
  { ref: "Prov 15:23", text: "A person has joy in giving an appropriate answer, and a word at the right time – how good it is!", topic: "Speech" },
  { ref: "Prov 11:25", text: "A generous person will be enriched, and the one who provides water for others will himself be satisfied.", topic: "Generosity" },
  { ref: "Prov 31:26", text: "She opens her mouth with wisdom, and the teaching of kindness is on her tongue.", topic: "Wisdom" },
  { ref: "Prov 4:23", text: "Keep thy heart with all diligence; for out of it are the issues of life.", topic: "Heart" },
  { ref: "Prov 16:24", text: "Pleasant words are like a honeycomb, sweet to the soul and healing to the bones.", topic: "Speech" },
  { ref: "Prov 18:22", text: "The one who has found a good wife has found what goodness is, and obtained a delightful gift from the LORD.", topic: "Marriage" },
  { ref: "Prov 21:1", text: "The king’s heart is in the hand of the LORD like channels of water; he turns it wherever he wants.", topic: "Trust" },
  { ref: "Prov 21:5", text: "The thoughts of the diligent tend only to plenteousness; but of every one that is hasty only to want.", topic: "Work" }
];

export const THEMES: Theme[] = [
  { source: "Dr. John Gottman", title: "Love Maps", concept: "Knowing his inner world—his stresses, friends, and dreams." },
  { source: "Shanti Feldhahn", title: "The Insecurity Gap", concept: "Most men feel like impostors. He needs to know you believe in him." },
  { source: "Dr. Willard Harley", title: "Need for Admiration", concept: "He needs to be appreciated for what he does, not just who he is." },
  { source: "Laura Doyle", title: "Relinquishing Control", concept: "Intimacy returns when we stop trying to manage his choices." },
  { source: "EG White (Adv. Home)", title: "The Sacred Circle", concept: "The home should be a place where the world's harshness is shut out." },
  { source: "Dr. John Gottman", title: "Turning Toward", concept: "Responding to his small bids for connection ('Look at this car') builds the bank account of trust." },
  { source: "Shanti Feldhahn", title: "Visual Wiredness", concept: "Understand his visual nature without judgment; it's how he's made." },
  { source: "Dr. Willard Harley", title: "Recreational Companionship", concept: "Being his favorite playmate is vital to romantic love." },
  { source: "Laura Doyle", title: "Self-Care First", concept: "You cannot pour from an empty cup. Your happiness attracts him." },
  { source: "Dr. John Gottman", title: "Fondness & Admiration", concept: "Reminding yourself why you fell in love prevents contempt." },
  { source: "EG White (Adv. Home)", title: "Cheerful Words", concept: "A gentle, cheerful tone is the light of the dwelling." },
  { source: "Dr. Willard Harley", title: "Domestic Support", concept: "A peaceful, well-managed home meets a deep emotional need for many men." },
  { source: "Shanti Feldhahn", title: "The Burden of Provision", concept: "The mental weight of providing is often heavier than we see." },
  { source: "Dr. John Gottman", title: "Soft Start-Up", concept: "Bringing up issues gently, without blame, prevents defensiveness." },
  { source: "Laura Doyle", title: "Respecting His Path", concept: "Letting him make mistakes without saying 'I told you so'." },
  { source: "Dr. Willard Harley", title: "Sexual Fulfillment", concept: "Understanding his need for physical intimacy as a form of emotional connection." },
  { source: "EG White (Adv. Home)", title: "Forbearance", concept: "Bearing with one another's faults with patience and grace." },
  { source: "Dr. John Gottman", title: "Accepting Influence", concept: "Letting him know his opinion matters in decisions." },
  { source: "Shanti Feldhahn", title: "Men & Feelings", concept: "He feels deeply, but may need time to process before speaking." },
  { source: "Laura Doyle", title: "Receiving Graciously", concept: "Accepting his help and gifts without critique makes him feel like a winner." },
  { source: "Dr. John Gottman", title: "The 6-Second Kiss", concept: "A kiss lasting 6 seconds or more is a 'potential' shifter that builds romance." },
];

export const FORMATS = [
  "Heart-First Morning Devotional",
  "Seeing Him Clearly",
  "Emotional Needs Spotlight",
  "Love Busters Awareness",
  "Prayer With Direction",
  "Gratitude-to-Action",
  "Inner World Check-In",
  "Tiny Wins Tracker",
  "Reframing the Narrative",
  "Seasonal/Situational"
];

export const TINY_WINS = [
  "I spoke kindly even when tired",
  "I assumed positive intent",
  "I expressed appreciation",
  "I paused before reacting",
  "I prayed for him specifically",
];

export const EMOTIONS: Emotion[] = [
  { label: "Peaceful", icon: Sun, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30" },
  { label: "Joyful", icon: Smile, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30" },
  { label: "Tired", icon: Moon, color: "text-slate-500", bg: "bg-slate-100 dark:bg-slate-800" },
  { label: "Anxious", icon: CloudRain, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
  { label: "Overwhelmed", icon: Meh, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
];