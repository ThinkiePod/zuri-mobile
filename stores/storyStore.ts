import { Story } from "@/utils/constants";
import { create } from "zustand";

type StoryStore = {
  globalSelectedStory: Story | null;
  setGlobalSelectedStory: (story: Story) => void;
};

export const useStoryStore = create<StoryStore>((set) => ({
  globalSelectedStory: null,
  setGlobalSelectedStory: (story) => set({ globalSelectedStory: story }),
}));
