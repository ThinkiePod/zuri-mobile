import { colors } from "@/utils/colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface Message {
  id: string;
  text: string;
  sender: "user" | "zuri";
  timestamp: Date;
  status: "sending" | "sent" | "delivered" | "read";
}

interface MessageGroup {
  date: string;
  dateLabel: string;
  messages: Message[];
}
const ChatScreen = () => {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Was so great to see you!",
      sender: "zuri",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: "read",
    },
    {
      id: "2",
      text: "We should catch up soon!",
      sender: "zuri",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: "read",
    },
    {
      id: "3",
      text: "Let's get lunch soon! When are you free?",
      sender: "user",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      status: "read",
    },
    {
      id: "4",
      text: "I'd love to see you!",
      sender: "user",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      status: "read",
    },
    {
      id: "5",
      text: "I'm in. Let's do it! 10:30 tomorrow?",
      sender: "zuri",
      timestamp: new Date(), // Today
      status: "read",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // Format date labels like WhatsApp
  const formatDateLabel = (date: Date): string => {
    const now = new Date();
    const messageDate = new Date(date);
    // const diffTime = now.getTime() - messageDate.getTime();
    // const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Reset time to start of day for accurate comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const msgDate = new Date(
      messageDate.getFullYear(),
      messageDate.getMonth(),
      messageDate.getDate()
    );
    const daysDiff = Math.floor(
      (today.getTime() - msgDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 0) {
      return "Today";
    } else if (daysDiff === 1) {
      return "Yesterday";
    } else if (daysDiff < 7) {
      return messageDate.toLocaleDateString("en-US", { weekday: "long" });
    } else {
      return messageDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  };

  // Group messages by date
  const groupMessagesByDate = (messages: Message[]): MessageGroup[] => {
    const groups: { [key: string]: MessageGroup } = {};

    messages.forEach((message) => {
      const dateKey = message.timestamp.toDateString();

      if (!groups[dateKey]) {
        groups[dateKey] = {
          date: dateKey,
          dateLabel: formatDateLabel(message.timestamp),
          messages: [],
        };
      }

      groups[dateKey].messages.push(message);
    });

    return Object.values(groups).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Add your recording logic here
    if (!isRecording) {
      console.log("Started recording...");
    } else {
      console.log("Stopped recording...");
    }
  };

  const groupedMessages = groupMessagesByDate(messages);

  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages.length]);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: "user",
        timestamp: new Date(),
        status: "sending",
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputText("");

      // Simulate message status updates
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
          )
        );
      }, 1000);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
          )
        );
      }, 2000);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "read" } : msg
          )
        );
      }, 3000);
    }
  };

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sending":
        return <MaterialIcons name="schedule" size={14} color="#FFF" />;
      case "sent":
        return <MaterialIcons name="check" size={14} color="#FFF" />;
      case "delivered":
        return <MaterialIcons name="done-all" size={14} color="#FFF" />;
      case "read":
        return <MaterialIcons name="done-all" size={14} color="#FFF" />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-custom-100">
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 pt-5 pb-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.main} />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-2xl font-bold text-gray-800">Chatbox</Text>
          <Text className="text-sm text-gray-500">Zuri • Active</Text>
        </View>
        <View className="w-6" />
      </View>

      {/* Messages + Input */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-5 pt-4"
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              className={`mb-3 relative ${
                message.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <View
                className={`max-w-[80%] px-4 py-3 rounded-3xl ${
                  message.sender === "user" ? "bg-main" : "bg-white"
                }`}
              >
                <Text
                  className={`text-base leading-5 ${
                    message.sender === "user" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {message.text}
                </Text>
              </View>
              {message.sender === "user" ? (
                <>
                  <View className="absolute bg-main w-5 h-[25px] bottom-0 rounded-bl-2xl rounded-tr-full -right-2.5" />
                  <View className="absolute bg-custom-100 w-5 h-[35px] -bottom-1.5 rounded-bl-2xl -right-5" />
                </>
              ) : (
                <>
                  <View className="absolute bg-white w-5 h-[25px] bottom-0 rounded-br-2xl -left-2.5" />
                  <View className="absolute bg-custom-100 w-5 h-[35px] -bottom-1.5 rounded-br-2xl -left-5" />
                </>
              )}
            </View>
          ))}
        </ScrollView> */}

        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-5 pt-4"
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={groupedMessages.reduce(
            (indices: number[], _, groupIndex) => {
              // Calculate the index of each date header in the flattened children array
              const dateHeaderIndex = groupIndex * 2;
              indices.push(dateHeaderIndex);
              return indices;
            },
            []
          )}
        >
          {groupedMessages
            .map((group, groupIndex) => [
              // Date Header (direct child for sticky behavior)
              <View
                key={`date-${group.date}`}
                className="bg-transparent py-2 mb-3"
              >
                <View className="bg-gray-200 self-center px-3 py-1 rounded-full">
                  <Text className="text-xs text-gray-600 font-medium">
                    {group.dateLabel}
                  </Text>
                </View>
              </View>,

              // Messages Container (direct child)
              <View key={`messages-${group.date}`}>
                {group.messages.map((message, messageIndex) => (
                  <View
                    key={message.id}
                    className={`mb-3 relative ${
                      message.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <View
                      className={`max-w-[80%] px-4 py-3 rounded-3xl ${
                        message.sender === "user" ? "bg-main" : "bg-white"
                      }`}
                    >
                      <Text
                        className={`text-base leading-5 ${
                          message.sender === "user"
                            ? "text-white"
                            : "text-gray-800"
                        }`}
                      >
                        {message.text}
                      </Text>

                      {/* Timestamp and Status */}
                      <View className="flex-row items-center justify-end mt-1 space-x-1">
                        <Text
                          className={`text-xs ${
                            message.sender === "user"
                              ? "text-white/70"
                              : "text-gray-500"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </Text>
                        {message.sender === "user" && (
                          <View className="ml-1">
                            {getStatusIcon(message.status)}
                          </View>
                        )}
                      </View>
                    </View>

                    {/* Message bubble tail */}
                    {message.sender === "user" ? (
                      <>
                        <View className="absolute bg-main w-5 h-[25px] bottom-0 rounded-bl-2xl rounded-tr-full -right-2.5" />
                        <View className="absolute bg-custom-100 w-5 h-[35px] -bottom-1.5 rounded-bl-2xl -right-5" />
                      </>
                    ) : (
                      <>
                        <View className="absolute bg-white w-5 h-[25px] bottom-0 rounded-br-2xl -left-2.5" />
                        <View className="absolute bg-custom-100 w-5 h-[35px] -bottom-1.5 rounded-br-2xl -left-5" />
                      </>
                    )}
                  </View>
                ))}
              </View>,
            ])
            .flat()}
        </ScrollView>
        {/* Input Bar */}
        <View className="flex-row items-end px-5 py-4 border-t border-gray-100 bg-transparent">
          <View className="flex-1 relative">
            <TextInput
              className="border border-main rounded-full px-4 py-3 pr-12 max-h-24 mr-2"
              value={inputText}
              onChangeText={setInputText}
              placeholder="Message"
              returnKeyType="send"
              onSubmitEditing={sendMessage}
              // multiline
            />
            {/* Record button inside input when no text */}
            {!inputText.trim() && (
              <TouchableOpacity
                className={`absolute right-4 top-3 w-6 h-6 rounded-full justify-center items-center`}
                onPress={toggleRecording}
              >
                <Feather
                  name="mic"
                  size={20}
                  color={isRecording ? colors.summary["600"] : colors.main}
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 justify-center items-center mr-2">
            <MaterialIcons
              name="camera-alt"
              size={20}
              color={colors.misc["100"]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-main justify-center items-center"
            onPress={sendMessage}
          >
            <MaterialIcons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
