import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Image } from '@rneui/themed';
import { useEffect, useState } from "react";
const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#000',
  },
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
});
const BASE_URI = 'https://source.unsplash.com/random?sig=';
const useCheckIsLogin = () => {
  const [state, setState] = useState(false);
  useEffect(() => {

  }, []);
};
export const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={[...new Array(10)].map((_, i) => i.toString())}
        style={styles.list}
        numColumns={2}
        keyExtractor={(e) => e}
        renderItem={({ item }) => (
          <Image
            source={{ uri: BASE_URI + item }}
            containerStyle={styles.item}
            PlaceholderContent={<ActivityIndicator />}
          />
        )}
      />
    </View>
  )
};