import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { ZodError, z } from "zod";

import { Contact } from "@/types";
import { ThemedView } from "@/components/ThemedView";
import NavBar from "@/components/Nav";
import { useThemeColor } from "@/hooks/useThemeColor";
import FormField from "./FormField";

type ContactForm = Omit<Contact, "id" | "age"> & {
  age: string;
};

type FormContactType = {
  initialState?: ContactForm;
  onSubmit: (contact: Omit<Contact, "id">) => void;
};

export default function FormContact({
  initialState = {
    firstName: "",
    lastName: "",
    age: "",
  },
  onSubmit,
}: FormContactType) {
  const insets = useSafeAreaInsets();
  const borderColor = useThemeColor({}, "border");

  const [contact, setContact] = useState<ContactForm>(initialState);

  function handleChange(fieldKey: keyof Contact) {
    return function name(val?: string) {
      if (!contact) return;

      setContact({
        ...contact,
        [fieldKey]: val,
      });
    };
  }

  const handleChangeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    const photoUrl = result.assets?.[0].uri;
    if (photoUrl) {
      handleChange("photo")(photoUrl);
    }
  };

  const handleSubmit = () => {
    const { age, ...contactData } = contact;
    const formData = {
      ...contactData,
      age: Number.isNaN(parseInt(age)) ? age : parseInt(age),
    };

    const schema = z.object({
      firstName: z
        .string()
        .refine(
          (val) => /^[^\s]+$/.test(val),
          "First name must be a single word without spaces"
        ),
      lastName: z
        .string()
        .refine(
          (val) => /^[^\s]+$/.test(val),
          "Last name must be a single word without spaces"
        ),
      age: z
        .number({
          required_error: "Age is required",
          invalid_type_error: "Age must be a number",
        })
        .max(100, "Age must be less than 100"),
      photo: z.string().nullish(),
    });

    try {
      const data = schema.parse(formData) as Omit<Contact, "id">;
      onSubmit(data);
    } catch (error) {
      const err = { ...(error as ZodError) };
      Toast.show({ type: "error", text1: err.issues[0].message });
    }
  };

  return (
    <>
      <ThemedView
        colorName="background"
        style={{
          ...styles.container,
          paddingTop: insets.top,
        }}
      >
        <NavBar
          rightSide={{ iconName: "checkmark-outline", onPress: handleSubmit }}
        />

        <ScrollView style={{ flex: 1 }}>
          <View id="hero" style={styles.hero}>
            {contact?.photo ? (
              <>
                <Image
                  style={styles.photo}
                  source={contact.photo}
                  contentFit="cover"
                  transition={1000}
                  onError={() => handleChange("photo")()}
                />
                <Pressable
                  onPress={handleChangeImage}
                  style={styles.changePhotoButtton}
                >
                  <Ionicons size={30} color={"#000"} name="reload-circle" />
                </Pressable>
              </>
            ) : (
              <Ionicons
                onPress={handleChangeImage}
                size={80}
                color={"#FFF"}
                name="camera-outline"
              />
            )}
          </View>

          <View
            id="form"
            style={{ ...styles.form, borderTopColor: borderColor }}
          >
            <FormField
              iconName="person-outline"
              placeholder="First Name"
              value={contact.firstName}
              onChangeText={handleChange("firstName")}
            />
            <FormField
              placeholder="Last Name"
              value={contact.lastName}
              onChangeText={handleChange("lastName")}
            />
            <FormField
              iconName="calendar-outline"
              placeholder="Age"
              keyboardType="number-pad"
              value={contact.age}
              onChangeText={handleChange("age")}
            />
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    position: "relative",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    backgroundColor: "#2A8AF5",
    borderRadius: 25,
    marginBottom: 20,
    overflow: "hidden",
  },

  photo: { flex: 1, width: "100%" },

  changePhotoButtton: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    opacity: 0.7,
  },

  form: { gap: 5, borderTopWidth: 1 },
});
