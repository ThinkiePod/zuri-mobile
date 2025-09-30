import { useStoryStore } from "@/stores/storyStore";
import { colors } from "@/utils/colors";
import { allStories, Story } from "@/utils/constants";
import { assets } from "@/utils/images";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Clock,
  MoreVerticalIcon,
  Play,
  PlayCircleIcon,
  PlusCircleIcon,
  Star,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  category: string;
}

const StoriesScreen: React.FC<Props> = ({ category }) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const setGlobalSelectedStory = useStoryStore(
    (state) => state.setGlobalSelectedStory
  );

  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const stories =
    category === "All"
      ? allStories
      : allStories.filter(
          (s) => s.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <ScrollView className="bg-custom-100">
      {/* Recently Played */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recently Played</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recentlyPlayedContent}
        >
          {stories.slice(0, 2).map((story) => {
            const broken = brokenImages[story.id] || false;

            return (
              <TouchableOpacity
                key={story.id}
                style={styles.recentlyPlayedCard}
                onPress={() => {
                  setGlobalSelectedStory(story);
                  router.push(`/content/${story.id}`);
                }}
              >
                <Image
                  source={
                    broken ? assets.image.encourage : { uri: story.image }
                  }
                  style={styles.recentlyPlayedImage}
                  onError={() =>
                    setBrokenImages((prev) => ({ ...prev, [story.id]: true }))
                  }
                />
                <View style={styles.playOverlay}>
                  <Play size={20} color="#ffffff" fill="#ffffff" />
                </View>
                <Text style={styles.recentlyPlayedTitle} numberOfLines={2}>
                  {story.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Popular Stories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {category === "All" ? "Library" : `Popular ${category}`}
        </Text>
        <View style={styles.storiesList}>
          {stories.map((story) => {
            const broken = brokenImages[story.id] || false;

            return (
              <TouchableOpacity
                key={story.id}
                style={styles.storyCard}
                onPress={() => {
                  setGlobalSelectedStory(story);
                  router.push(`/content/${story.id}`);
                }}
              >
                <Image
                  source={
                    broken ? assets.image.encourage : { uri: story.image }
                  }
                  className="size-[60px] rounded-lg mr-3"
                  onError={() =>
                    setBrokenImages((prev) => ({ ...prev, [story.id]: true }))
                  }
                />
                <View style={styles.storyContent}>
                  <View style={styles.storyHeader}>
                    <Text style={styles.storyTitle} numberOfLines={1}>
                      {story.title}
                    </Text>
                    <View style={styles.storyRating}>
                      <Star size={12} color="#FFD60A" fill="#FFD60A" />
                      <Text style={styles.ratingText}>{story.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.storyAuthor}>{story.author}</Text>
                  <View style={styles.storyMeta}>
                    <View style={styles.duration}>
                      <Clock size={12} color="#666666" />
                      <Text style={styles.durationText}>{story.duration}</Text>
                    </View>
                    <Text style={styles.category} className="text-xs text-main">
                      {story.category}
                    </Text>
                  </View>
                </View>
                {/* <TouchableOpacity style={styles.playButton}> */}
                <TouchableOpacity
                  className="w-10 h-10 rounded-[20px] bg-custom-500 items-center justify-center ml-3"
                  onPress={() => setSelectedStory(story)}
                >
                  {/* <Play size={16} color="#007AFF" fill="#007AFF" /> */}
                  <MoreVerticalIcon color={colors.main} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Modal for Story Options */}
        <Modal
          visible={!!selectedStory}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedStory(null)}
        >
          <Pressable
            // style={styles.overlay}
            className="flex-1 justify-end bg-black/50"
            onPress={() => setSelectedStory(null)}
          >
            <View className="bg-custom-100 p-5 rounded-tr-xl rounded-tl-xl">
              <Text style={styles.modalTitle}>{selectedStory?.title}</Text>
              <Pressable className="py-2.5 flex-row items-center gap-4">
                <PlayCircleIcon color={colors.main} size={32} />
                <Text className="text-xl text-main font-bold">Play</Text>
              </Pressable>
              <Pressable className="py-2.5 flex-row items-center gap-4">
                <PlusCircleIcon color={colors.main} size={32} />
                <Text className="text-xl text-main font-bold">
                  Add to Favorites
                </Text>
              </Pressable>
              <Pressable className="py-2.5 flex-row items-center gap-4">
                <MaterialIcons
                  name="playlist-add"
                  color={colors.main}
                  size={32}
                />
                <Text className="text-xl text-main font-bold">
                  Add to Playlist
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedStory(null)}
                className="bg-main rounded-xl"
              >
                <Text
                  // style={styles.cancelText}
                  className="text-center py-3 text-white mt-2.5 font-semibold text-xl"
                >
                  Cancel
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontFamily: "Inter-Bold",
    color: "#1a1a1a",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  categoriesContainer: {
    backgroundColor: "#ffffff",
    paddingBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  activeCategoryButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  categoryButtonText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#1a1a1a",
  },
  activeCategoryButtonText: {
    color: "#ffffff",
  },
  section: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  recentlyPlayedContent: {
    gap: 16,
  },
  recentlyPlayedCard: {
    width: 160,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recentlyPlayedImage: {
    width: "100%",
    height: 100,
  },
  playOverlay: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  recentlyPlayedTitle: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#1a1a1a",
    padding: 12,
  },
  storiesList: {
    gap: 12,
  },
  storyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  storyContent: {
    flex: 1,
  },
  storyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  storyTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#1a1a1a",
    flex: 1,
    marginRight: 8,
  },
  storyRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    color: "#666666",
  },
  storyAuthor: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#666666",
    marginBottom: 8,
  },
  storyMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  duration: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#666666",
  },
  category: {
    fontFamily: "Inter-Medium",
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#007AFF",
  },
  cancelText: {
    textAlign: "center",
    paddingVertical: 12,
    color: "red",
    fontWeight: "600",
    marginTop: 10,
  },
});

export default StoriesScreen;
