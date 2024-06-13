import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from "react-native";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import NavBar from "@/components/Nav";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import BottomAction from "@/components/detail/BottomAction";
import Detail from "@/components/detail/Detail";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "@/services/contact";
import { Contact } from "@/types";

export default function sScreen() {
  const insets = useSafeAreaInsets();
  const { slug } = useLocalSearchParams();
  const {
    data: contact = { id: slug } as Contact,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useGetContactQuery(slug as string);
  const [deleteContact] = useDeleteContactMutation();
  const [photoUrl, setPhotoUrl] = useState<string>();
  useEffect(() => {
    if (contact.photo) setPhotoUrl(contact.photo);
  }, [contact.photo]);

  const onDelete = async () => {
    if (!contact) return;

    try {
      const res = await deleteContact(contact.id);
      if (res.error) {
        throw new Error("Something went wrong!");
      }

      return router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: (error as Error).message,
      });
    }
  };

  const handleDelete = () => {
    if (!contact) return;

    Alert.alert(
      "Delete Contact?",
      "The contact will deleted permanently.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: onDelete },
      ],
      { cancelable: true }
    );
  };

  const handleShare = async () => {
    if (!contact) return;

    Share.share({
      message: `${contact.firstName} ${contact.lastName} with age ${contact.age}`,
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView
        colorName="background"
        style={{
          ...styles.container,
          paddingTop: insets.top,
        }}
      >
        <NavBar
          title={isLoading ? "" : contact.firstName + " " + contact.lastName}
        />

        {error && (
          <ThemedText>
            {(error as SerializedError).message || "Something went wrong!"}
          </ThemedText>
        )}

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
          style={{ flex: 1 }}
        >
          <View id="hero">
            <View style={styles.photo}>
              {photoUrl ? (
                <Image
                  style={{ flex: 1, width: "100%" }}
                  source={photoUrl}
                  contentFit="cover"
                  transition={1000}
                  onError={() => setPhotoUrl(undefined)}
                />
              ) : (
                <ThemedIcon
                  colorName="background"
                  size={80}
                  name="person-sharp"
                />
              )}
            </View>

            <ThemedText
              type="title"
              colorName="foreground"
              style={styles.name}
              numberOfLines={2}
              lineBreakMode="tail"
            >
              {isLoading ? "" : contact.firstName + " " + contact.lastName}
            </ThemedText>

            <ThemedText type="link" style={styles.id} selectable>
              ID: {contact.id || ""}
            </ThemedText>
          </View>

          <View style={styles.details}>
            <Detail label="First Name" value={contact.firstName} />
            <Detail label="Last Name" value={contact.lastName} />
            <Detail label="Age" value={contact.age?.toString() || ""} />
          </View>
        </ScrollView>

        {contact && (
          <BottomAction
            contactId={contact.id}
            onShare={handleShare}
            onDelete={handleDelete}
          />
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },

  photo: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    backgroundColor: "#9CA0AE",
    borderRadius: 25,
    marginBottom: 20,
    overflow: "hidden",
  },

  name: {
    textAlign: "center",
    marginBottom: 5,
    paddingHorizontal: 12,
  },
  id: { textAlign: "center", marginBottom: 20 },

  details: {
    flexDirection: "column",
    gap: 10,
  },
});
