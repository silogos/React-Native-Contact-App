import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import FormContact from "@/components/form-contact/FormContact";
import {
  useGetContactQuery,
  useUpdateContactMutation,
} from "@/services/contact";
import { Contact } from "@/types";

export default function AddScreen() {
  const { slug } = useLocalSearchParams();
  const [contact, setContact] = useState<Contact>();
  const { data } = useGetContactQuery(slug as string);

  useEffect(() => {
    if (!data) return;
    setContact(data);
  }, [data]);

  const [updateContact] = useUpdateContactMutation();

  const handleSave = async (contactData: Omit<Contact, "id">) => {
    try {
      if (!contact) return;

      const contactD: Contact = {
        id: contact.id,
        ...contactData,
      };
      const res = await updateContact(contactD);

      if (res.error) {
        throw new Error("Something went wrong");
      }

      router.replace(`../`);

      Toast.show({
        type: "success",
        text1: "Success update contact",
      });
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
      {contact && (
        <FormContact
          initialState={{
            firstName: contact.firstName,
            lastName: contact.lastName,
            age: contact?.age?.toString() || "",
            photo: contact.photo,
          }}
          onSubmit={handleSave}
        />
      )}
    </>
  );
}
