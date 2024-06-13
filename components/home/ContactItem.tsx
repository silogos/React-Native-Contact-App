import { Image } from "expo-image";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Contact } from "@/types";

export type ContactItemProps = {
  contact: Contact;
};

export function ContactItem({
  contact: { id, firstName, lastName, photo },
}: ContactItemProps) {
  const [photoUrl, setPhotoUrl] = useState<string>();

  useEffect(() => {
    if (photo) setPhotoUrl(photo);
  }, [photo]);

  return (
    <Link href={`/detail/${id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.image}>
          {photoUrl ? (
            <Image
              style={{ flex: 1, width: "100%" }}
              source={photoUrl}
              contentFit="cover"
              transition={1000}
              onError={() => setPhotoUrl(undefined)}
            />
          ) : (
            <ThemedText type="defaultSemiBold" style={{ color: "#FFF" }}>
              {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
            </ThemedText>
          )}
        </View>
        <ThemedText
          colorName="foreground"
          type="defaultSemiBold"
          style={styles.name}
        >
          {firstName + " " + lastName}
        </ThemedText>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    gap: 5,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: "#9CA0AE",
    borderRadius: 25,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    flex: 1,
    padding: 10,
  },
});
