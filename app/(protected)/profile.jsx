import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/context/authContext";

export default function ProfileScreen() {

    const {signOut}= useAuth();
 

  return <>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={signOut} style={{ backgroundColor: "red", padding: 10, borderRadius: 5 }}>
            <Text style={{ color: "#fff", fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
    </View>
  </>;
}
