import { MaterialIcons } from "@expo/vector-icons";
import { generateAvatars, hexToRgba } from "./utils";

import greyZuri from "@/assets/images/zuri-image-grey.png";
import purpleZuriBack from "@/assets/images/zuri-image-purple-back.png";
import purpleZuri from "@/assets/images/zuri-image-purple.png";

export const allStories = [
  {
    id: 1,
    title: "The Brave Bunny",
    author: "Lily Thompson",
    duration: "6 mins",
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/45201/pexels-photo-45201.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Stories",
  },
  {
    id: 2,
    title: "The Lost Kite",
    author: "James Miller",
    duration: "5 mins",
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/2886211/pexels-photo-2886211.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Stories",
  },
  {
    id: 3,
    title: "Moonlight Mystery",
    author: "Anna Lee",
    duration: "7 mins",
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Stories",
  },
  {
    id: 4,
    title: "Grandpa’s Farm",
    author: "Olivia Carter",
    duration: "6 mins",
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/246201/pexels-photo-246201.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Stories",
  },

  // SONGS
  {
    id: 5,
    title: "Good Morning Song",
    author: "Melody Stars",
    duration: "2 mins",
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Songs",
  },
  {
    id: 6,
    title: "ABC Melody",
    author: "Kinder Beats",
    duration: "3 mins",
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Songs",
  },
  {
    id: 7,
    title: "Twinkle Twinkle Remix",
    author: "DJ Lullaby",
    duration: "2 mins",
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/1648523/pexels-photo-1648523.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Songs",
  },
  {
    id: 8,
    title: "Brush Your Teeth",
    author: "FunTime Band",
    duration: "2 mins",
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Songs",
  },

  // LEARNING
  {
    id: 9,
    title: "Numbers 1 to 10",
    author: "Learning Pals",
    duration: "4 mins",
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Learning",
  },
  {
    id: 10,
    title: "Colors Around Us",
    author: "Mia Green",
    duration: "5 mins",
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/1148958/pexels-photo-1148958.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Learning",
  },
  {
    id: 11,
    title: "Animal Sounds",
    author: "Zoo Tunes",
    duration: "3 mins",
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Learning",
  },
  {
    id: 12,
    title: "Shapes and Patterns",
    author: "Kinder Brain",
    duration: "6 mins",
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/1609805/pexels-photo-1609805.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Learning",
  },

  // ADVENTURES
  {
    id: 13,
    title: "Pirate Island Quest",
    author: "Tommy Blake",
    duration: "8 mins",
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/165505/pexels-photo-165505.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Adventures",
  },
  {
    id: 14,
    title: "Rocket to Mars",
    author: "Ella Vega",
    duration: "9 mins",
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Adventures",
  },
  {
    id: 15,
    title: "Jungle Treasure Hunt",
    author: "Max Rivera",
    duration: "7 mins",
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Adventures",
  },
  {
    id: 16,
    title: "The Snowy Mountain",
    author: "Olive Brown",
    duration: "6 mins",
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Adventures",
  },

  // AFFIRMATIONS
  {
    id: 17,
    title: "I Am Brave",
    author: "Mindful Kids",
    duration: "3 mins",
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Affirmations",
  },
  {
    id: 18,
    title: "I Can Do It",
    author: "Positive Sprouts",
    duration: "2 mins",
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/764880/pexels-photo-764880.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Affirmations",
  },
  {
    id: 19,
    title: "I Am Loved",
    author: "SelfKind Kids",
    duration: "3 mins",
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/39397/child-children-girl-happy-39397.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Affirmations",
  },
  {
    id: 20,
    title: "Today is a Good Day",
    author: "Sunshine Minds",
    duration: "2 mins",
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/1974503/pexels-photo-1974503.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Affirmations",
  },

  // PHONICS
  {
    id: 21,
    title: "Letter A Fun",
    author: "Phonic Pals",
    duration: "3 mins",
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/256369/pexels-photo-256369.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Phonics",
  },
  {
    id: 22,
    title: "B is for Ball",
    author: "ABC Friends",
    duration: "3 mins",
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/160946/pexels-photo-160946.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Phonics",
  },
  {
    id: 23,
    title: "C Says Cat",
    author: "Letter Learners",
    duration: "4 mins",
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Phonics",
  },
  {
    id: 24,
    title: "Dancing D",
    author: "Phonics Parade",
    duration: "3 mins",
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Phonics",
  },

  // ROUTINES
  {
    id: 25,
    title: "Time to Wake Up",
    author: "Morning Magic",
    duration: "2 mins",
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Routines",
  },
  {
    id: 26,
    title: "Get Ready Song",
    author: "Daily Kids",
    duration: "3 mins",
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/913137/pexels-photo-913137.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Routines",
  },
  {
    id: 27,
    title: "Bedtime Wind Down",
    author: "DreamTime",
    duration: "4 mins",
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/1257105/pexels-photo-1257105.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Routines",
  },
  {
    id: 28,
    title: "Clean-Up Time",
    author: "Tidy Up Troupe",
    duration: "2 mins",
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/732425/pexels-photo-732425.jpeg?auto=compress&cs=tinysrgb&w=200",
    category: "Routines",
  },
];

export type Story = (typeof allStories)[number];

export const ageRanges = [
  { label: "3 years", value: 3 },
  { label: "4 years", value: 4 },
  { label: "5 years", value: 5 },
  { label: "6 years", value: 6 },
  { label: "7 years", value: 7 },
];

export const categories = [
  "All",
  "Stories",
  "Songs",
  "Learning",
  "Adventures",
  "Affirmations",
  "Phonics",
  "Routines",
];

export const avatars = [
  { id: 1, icon: generateAvatars("👦") },
  { id: 2, icon: generateAvatars("👧") },
  { id: 3, icon: generateAvatars("🧒") },
  { id: 4, icon: generateAvatars("👶") },
  { id: 5, icon: generateAvatars("🧑") },
  { id: 6, icon: generateAvatars("👦") },
  { id: 7, icon: generateAvatars("👧") },
  { id: 8, icon: generateAvatars("🧒") },
  { id: 9, icon: generateAvatars("👶") },
  { id: 10, icon: generateAvatars("🧑") },
];

export const interestTags = [
  "Reading",
  "Math",
  "Science",
  "Music",
  "Animals",
  "Sports",
  "Art",
  "Cooking",
  "Games",
  "Nature",
];

export const TOTAL_SELECTED_INTEREST = 5;

export const setupInterestTags = [
  "Story time",
  "Phonics & Reading",
  "Affirmations",
  "Creative Time",
  "Speech & Vocabulary",
  "Bible Stories & Prayers",
  "Fun Facts & Discovery",
  "Numbers",
  "Games",
  "Science & Nature",
];

type RoutineType = "prayer" | "affirmation" | "reminder";

interface DummyRoutine {
  id: string;
  type: RoutineType;
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  timeOfDay: "Morning" | "Afternoon" | "Evening";
}

export const dummyRoutines: DummyRoutine[] = [
  {
    id: "1",
    type: "prayer",
    title: "Morning Prayer",
    description: "Good morning Jesus",
    icon: "favorite",
    timeOfDay: "Morning",
  },
  {
    id: "2",
    type: "affirmation",
    title: "You're Kind",
    description: "You're kind and smart!",
    icon: "psychology",
    timeOfDay: "Morning",
  },
  {
    id: "3",
    type: "reminder",
    title: "Brush Teeth",
    description: "Time to brush your teeth!",
    icon: "access-alarms",
    timeOfDay: "Morning",
  },
  {
    id: "4",
    type: "prayer",
    title: "Afternoon Blessing",
    description: "Bless this afternoon",
    icon: "favorite",
    timeOfDay: "Afternoon",
  },
  {
    id: "5",
    type: "affirmation",
    title: "Keep Going",
    description: "You’ve made great progress today!",
    icon: "psychology",
    timeOfDay: "Afternoon",
  },
  {
    id: "6",
    type: "reminder",
    title: "Hydrate",
    description: "Drink a glass of water",
    icon: "access-alarms",
    timeOfDay: "Afternoon",
  },
  {
    id: "7",
    type: "prayer",
    title: "Evening Gratitude",
    description: "Thank you for this day",
    icon: "favorite",
    timeOfDay: "Evening",
  },
  {
    id: "8",
    type: "affirmation",
    title: "You Did Well",
    description: "You did well today!",
    icon: "psychology",
    timeOfDay: "Evening",
  },
  {
    id: "9",
    type: "reminder",
    title: "Wind Down",
    description: "Prepare for bedtime",
    icon: "access-alarms",
    timeOfDay: "Evening",
  },
];

export const placeholderColor = hexToRgba("#A367BB", 0.6);
export const MAIN = "#A367BB";

export const welcomeImages = {
  purpleZuri,
  purpleZuriBack,
  greyZuri,
} as const;

export type theme = "light" | "dark";

export type WelcomeImageKey = keyof typeof welcomeImages;

export interface WelcomeProps {
  style: theme;
  image: WelcomeImageKey;
}

export const consents = [
  {
    title: "Save Conversation History",
    subTitle:
      "Allow Zuri to save my child's voice interactions for personalization and playback.",
  },
  {
    title: "Use Saved Interactions to Personalize Content",
    subTitle:
      "Allow Zuri to use past interactions to recommend stories and affirmations.",
  },
  {
    title: "Emotion Check-In Tracking",
    subTitle:
      "Allow Zuri to ask how my child is feeling and log their emotional responses.",
  },
  {
    title: "Share Learning Progress Reports",
    subTitle: "Allow Zuri to generate and store learning progress reports.",
  },
  {
    title: "Upload Custom Audio Messages",
    subTitle:
      "Allow Zuri to upload or record personal messages for Zuri to say.",
  },
  {
    title: "Cloud Sync of Content & Usage",
    subTitle:
      "Allow my settings and usage data to be securely stored in the cloud.",
  },
];
