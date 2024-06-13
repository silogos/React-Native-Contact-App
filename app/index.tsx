import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, FlatList, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useGetContactsQuery } from "@/services/contact";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ContactItem } from "@/components/home/ContactItem";

export default function Index() {
  const insets = useSafeAreaInsets();
  const {
    data = [],
    isFetching,
    refetch,
  } = useGetContactsQuery(undefined, { refetchOnFocus: true });
  const [search, setSearch] = useState("");
  const contacts = useMemo(() => {
    return data.filter(
      ({ firstName, lastName }) =>
        `${firstName} ${lastName}`
          .toLocaleLowerCase()
          .search(search.toLocaleLowerCase()) !== -1
    );
  }, [data, search]);

  return (
    <>
      <ThemedView
        colorName="background"
        style={{ ...styles.container, paddingTop: insets.top }}
      >
        <ThemedText colorName="foreground" style={styles.title}>
          Contacts
        </ThemedText>

        <View style={styles.search}>
          <ThemedView colorName="muted" style={styles.searchWrapper}>
            <Ionicons
              size={18}
              name="search"
              color={"#9E9E9E"}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Contact"
              placeholderTextColor={"#9E9E9E"}
              value={search}
              onChangeText={setSearch}
            />
          </ThemedView>
        </View>

        <FlatList
          refreshing={isFetching}
          keyExtractor={({ id }) => id}
          data={contacts}
          renderItem={({ item }) => <ContactItem contact={item} />}
          onRefresh={() => refetch()}
        />

        <Link href={"/add"} asChild>
          <Pressable style={styles.floatButton}>
            <Ionicons size={30} color={"#FFF"} name="person-add-outline" />
          </Pressable>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingHorizontal: 18,
    marginTop: 24,
    marginBottom: 4,
    fontSize: 38,
    fontWeight: "600",
  },
  search: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  searchWrapper: {
    height: 38,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 12,
  },
  searchIcon: {
    marginLeft: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#868686",
  },
  floatButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 58,
    height: 58,
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "#2A8AF5",
    borderRadius: 58,
    elevation: 4,
  },
});
