// data/mockData.ts

export interface Story {
  id: string;
  title: string;
  duration: string;
  ageGroup: string;
  image: string;
  isFavorite: boolean;
  category: "stories" | "affirmations" | "phonics" | "routines";
  description: string;
  tags: string[];
}

export interface Activity {
  id: string;
  title: string;
  time: string;
  duration: string;
  image: string;
  type: "story" | "phonics" | "routine" | "affirmation";
}

export interface ProgressData {
  date: string;
  reading: number;
  phonics: number;
  affirmations: number;
  routines: number;
}

// Extended stories data
export const STORIES: Story[] = [
  {
    id: "s1",
    title: "The Sleepy Star",
    duration: "5 min",
    ageGroup: "3-5",
    image:
      "https://images.pexels.com/photos/2674052/pexels-photo-2674052.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: true,
    category: "stories",
    description:
      "A gentle bedtime story about a star who helps children fall asleep peacefully.",
    tags: ["bedtime", "calm", "stars", "sleep"],
  },
  {
    id: "s2",
    title: "Toby the Turtle Learns to Wait",
    duration: "7 min",
    ageGroup: "4-7",
    image:
      "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: false,
    category: "stories",
    description:
      "A story about patience and learning that good things come to those who wait.",
    tags: ["patience", "learning", "turtle", "virtue"],
  },
  {
    id: "s3",
    title: "The Magic Garden",
    duration: "6 min",
    ageGroup: "3-6",
    image:
      "https://images.pexels.com/photos/2832033/pexels-photo-2832033.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: true,
    category: "stories",
    description:
      "An enchanting tale about a garden where kindness makes flowers bloom.",
    tags: ["magic", "kindness", "nature", "growth"],
  },
  {
    id: "s4",
    title: "The Lost Bunny",
    duration: "4 min",
    ageGroup: "3-5",
    image:
      "https://images.pexels.com/photos/4588428/pexels-photo-4588428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: false,
    category: "stories",
    description:
      "A heartwarming story about helping others and finding your way home.",
    tags: ["friendship", "helping", "bunny", "home"],
  },
  {
    id: "s5",
    title: "The Brave Little Mouse",
    duration: "8 min",
    ageGroup: "4-6",
    image:
      "https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: true,
    category: "stories",
    description:
      "A tale of courage and believing in yourself, even when you feel small.",
    tags: ["courage", "confidence", "mouse", "adventure"],
  },
];

// Affirmations data
export const AFFIRMATIONS: Story[] = [
  {
    id: "a1",
    title: "I Am Smart",
    duration: "2 min",
    ageGroup: "All Ages",
    image:
      "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: true,
    category: "affirmations",
    description:
      "Positive affirmations to boost confidence in learning and intelligence.",
    tags: ["confidence", "learning", "intelligence", "self-esteem"],
  },
  {
    id: "a2",
    title: "I Am Kind",
    duration: "2 min",
    ageGroup: "All Ages",
    image:
      "https://images.pexels.com/photos/5427670/pexels-photo-5427670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: false,
    category: "affirmations",
    description:
      "Gentle reminders about the importance of kindness to others and yourself.",
    tags: ["kindness", "empathy", "friendship", "compassion"],
  },
  {
    id: "a3",
    title: "I Can Do Hard Things",
    duration: "3 min",
    ageGroup: "4-7",
    image:
      "https://images.pexels.com/photos/3771842/pexels-photo-3771842.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: false,
    category: "affirmations",
    description:
      "Building resilience and perseverance through positive self-talk.",
    tags: ["resilience", "perseverance", "challenges", "strength"],
  },
  {
    id: "a4",
    title: "I Am Loved",
    duration: "2 min",
    ageGroup: "All Ages",
    image:
      "https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: true,
    category: "affirmations",
    description:
      "Warm affirmations about being loved and valued just as you are.",
    tags: ["love", "acceptance", "family", "worth"],
  },
];

// Phonics games data
export const PHONICS: Story[] = [
  {
    id: "p1",
    title: "CVC Words: Cat, Hat, Bat",
    duration: "10 min",
    ageGroup: "4-6",
    image:
      "https://images.pexels.com/photos/4039782/pexels-photo-4039782.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: true,
    category: "phonics",
    description:
      "Interactive games to practice consonant-vowel-consonant word patterns.",
    tags: ["CVC", "reading", "words", "patterns"],
  },
  {
    id: "p2",
    title: "Letter Recognition: A-E",
    duration: "8 min",
    ageGroup: "3-5",
    image:
      "https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: false,
    category: "phonics",
    description:
      "Fun activities to learn and recognize the first five letters of the alphabet.",
    tags: ["letters", "alphabet", "recognition", "basics"],
  },
  {
    id: "p3",
    title: "Rhyming Words Game",
    duration: "12 min",
    ageGroup: "5-7",
    image:
      "https://images.pexels.com/photos/6333905/pexels-photo-6333905.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: true,
    category: "phonics",
    description:
      "Musical games that teach rhyming patterns and sound recognition.",
    tags: ["rhyming", "sounds", "music", "patterns"],
  },
  {
    id: "p4",
    title: "Sight Words Level 1",
    duration: "9 min",
    ageGroup: "4-6",
    image:
      "https://images.pexels.com/photos/5905700/pexels-photo-5905700.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: false,
    category: "phonics",
    description:
      "Learn common sight words through repetition and visual games.",
    tags: ["sight words", "reading", "recognition", "fluency"],
  },
];

// Routines data
export const ROUTINES: Story[] = [
  {
    id: "r1",
    title: "Morning Routine",
    duration: "10 min",
    ageGroup: "All Ages",
    image:
      "https://images.pexels.com/photos/3807317/pexels-photo-3807317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: true,
    category: "routines",
    description:
      "A step-by-step morning routine to start the day with purpose and joy.",
    tags: ["morning", "routine", "habits", "preparation"],
  },
  {
    id: "r2",
    title: "Bedtime Routine",
    duration: "15 min",
    ageGroup: "All Ages",
    image:
      "https://images.pexels.com/photos/6204081/pexels-photo-6204081.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: true,
    category: "routines",
    description:
      "A calming bedtime routine for peaceful sleep and sweet dreams.",
    tags: ["bedtime", "sleep", "calm", "routine"],
  },
  {
    id: "r3",
    title: "After-School Routine",
    duration: "12 min",
    ageGroup: "4-7",
    image:
      "https://images.pexels.com/photos/5905700/pexels-photo-5905700.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: false,
    category: "routines",
    description:
      "Transition from school to home with a structured after-school routine.",
    tags: ["after-school", "transition", "homework", "routine"],
  },
  {
    id: "r4",
    title: "Cleanup Time",
    duration: "8 min",
    ageGroup: "3-6",
    image:
      "https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    isFavorite: false,
    category: "routines",
    description:
      "Make cleaning up fun with songs and games that encourage tidiness.",
    tags: ["cleanup", "organization", "responsibility", "fun"],
  },
];

// Recent activities data
export const RECENT_ACTIVITIES: Activity[] = [
  {
    id: "1",
    title: 'Read "The Sleepy Star"',
    time: "11:30 AM",
    duration: "5 min",
    image:
      "https://images.pexels.com/photos/5767579/pexels-photo-5767579.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    type: "story",
  },
  {
    id: "2",
    title: "Completed 3 Phonics Games",
    time: "Yesterday",
    duration: "15 min",
    image:
      "https://images.pexels.com/photos/6954507/pexels-photo-6954507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    type: "phonics",
  },
  {
    id: "3",
    title: "Morning Routine",
    time: "Yesterday",
    duration: "10 min",
    image:
      "https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    type: "routine",
  },
  {
    id: "4",
    title: "I Am Smart Affirmation",
    time: "2 days ago",
    duration: "2 min",
    image:
      "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    type: "affirmation",
  },
  {
    id: "5",
    title: "Bedtime Routine",
    time: "2 days ago",
    duration: "15 min",
    image:
      "https://images.pexels.com/photos/6204081/pexels-photo-6204081.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    type: "routine",
  },
];

// Weekly progress data for charts
export const WEEKLY_PROGRESS: ProgressData[] = [
  { date: "Mon", reading: 20, phonics: 15, affirmations: 5, routines: 10 },
  { date: "Tue", reading: 45, phonics: 20, affirmations: 4, routines: 12 },
  { date: "Wed", reading: 28, phonics: 25, affirmations: 6, routines: 8 },
  { date: "Thu", reading: 80, phonics: 30, affirmations: 3, routines: 15 },
  { date: "Fri", reading: 99, phonics: 18, affirmations: 7, routines: 20 },
  { date: "Sat", reading: 43, phonics: 22, affirmations: 8, routines: 5 },
  { date: "Sun", reading: 50, phonics: 12, affirmations: 5, routines: 25 },
];

// Device status data
export const DEVICE_STATUS = {
  isConnected: true,
  batteryLevel: 78,
  lastSync: "2 hours ago",
  deviceName: "Zuri Bear",
  deviceId: "ZR-1234",
  firmwareVersion: "2.1.0",
};

// Learning insights data
export const LEARNING_INSIGHTS = {
  weeklyStats: {
    totalTime: 315, // minutes
    averageDaily: 45, // minutes
    improvementRate: 15, // percentage
    streakDays: 5,
  },
  skillProgress: [
    { name: "Letter Recognition", progress: 85, category: "phonics" },
    { name: "Phonics Understanding", progress: 60, category: "phonics" },
    { name: "Reading Fluency", progress: 45, category: "reading" },
    { name: "Emotional Intelligence", progress: 75, category: "emotional" },
    { name: "Routine Following", progress: 90, category: "habits" },
  ],
  emotionalData: {
    labels: ["Happy", "Calm", "Curious", "Tired", "Upset"],
    values: [65, 40, 55, 15, 5],
  },
  recommendations: [
    "Emily responds well to story-based learning. Consider adding more interactive narratives.",
    "Schedule phonics practice during her most alert hours (10-11 AM).",
    "She shows strong emotional regulation - continue with calming routines.",
  ],
};

// Notification/message data
export const MESSAGES = [
  {
    id: "1",
    sender: "Zuri",
    message: "Was so great to see you!",
    timestamp: "10:30 AM",
    isFromDevice: true,
  },
  {
    id: "2",
    sender: "Emily",
    message: "We should catch up soon!",
    timestamp: "10:32 AM",
    isFromDevice: false,
  },
  {
    id: "3",
    sender: "Zuri",
    message: "Let's set lunch soon! When are you free?",
    timestamp: "10:35 AM",
    isFromDevice: true,
  },
  {
    id: "4",
    sender: "Emily",
    message: "I'd love to see you!",
    timestamp: "10:37 AM",
    isFromDevice: false,
  },
];

// Helper function to get content by category
export function getContentByCategory(
  category: "stories" | "affirmations" | "phonics" | "routines"
): Story[] {
  switch (category) {
    case "stories":
      return STORIES;
    case "affirmations":
      return AFFIRMATIONS;
    case "phonics":
      return PHONICS;
    case "routines":
      return ROUTINES;
    default:
      return [];
  }
}

// Helper function to search content
export function searchContent(query: string, category?: string): Story[] {
  const allContent = [...STORIES, ...AFFIRMATIONS, ...PHONICS, ...ROUTINES];
  let filtered = allContent;

  if (category) {
    filtered = filtered.filter((item) => item.category === category);
  }

  if (query.trim()) {
    const searchLower = query.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }

  return filtered;
}
