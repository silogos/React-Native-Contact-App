import { Stack, router } from "expo-router";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

import FormContact from "@/components/form-contact/FormContact";
import { useCreateContactMutation } from "@/services/contact";
import { Contact } from "@/types";

export default function AddScreen() {
  const [createContact] = useCreateContactMutation();
  const handleSave = async (contact: Omit<Contact, "id">) => {
    try {
      const res = await createContact({
        ...contact,
        photo: contact.photo || "N/A",
      });

      if (res.error) {
        throw new Error("Something went wrong!");
      }

      Toast.show({
        type: "success",
        text1: "Success add contact",
      });
      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: (error as Error).message,
      });
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <FormContact onSubmit={handleSave} />
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
});
