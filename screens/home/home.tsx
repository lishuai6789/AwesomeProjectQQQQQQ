import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card, Divider, Image } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
});
const CommodityDesc = ({ avatarUrl, commodityId, price, name }: { avatarUrl: string, commodityId: string, price: number, name: string, children: never[]; }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Commodity", {
      commodityId: commodityId,
    });
  };
  return (
    <View style={{ width: "100%", }}>
      <TouchableOpacity onPress={handlePress}>
        <Card>
          <Image source={{ uri: avatarUrl, }} style={{ width: '100%', height: 200, resizeMode: "contain" }}></Image>
          <Divider></Divider>
          <Text style={{ fontSize: 26, }}>{name}</Text>
          <Text>{price}元</Text>
        </Card>
      </TouchableOpacity>
    </View>
  )
};
export const HomeScreen = () => {
  const [page, setPage] = useState(1);
  const [arr, setArr] = useState([]);
  const totalRef = useRef(10000);
  const handleEndReached = () => {
    if (page * 10 < totalRef.current) {
      const formData = new FormData();
      formData.append("page", page.toString());
      fetch("http://localhost:8080/commodity/consumerCommodities", {
        method: "post",
        body: formData,
      }).then(async (res) => {
        const data = await res.json();
        const code = data.code;
        if (code === 200) {
          setArr((prev) => {
            return prev.concat(data.data.commodities);
          });
          totalRef.current = data.data.total;
          setPage((prev) => prev + 1);
        }
      })
    }
  };
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setArr([]);
    setPage(1);
    setRefreshing(true);
    totalRef.current = 10000;
    if (page * 10 < totalRef.current) {
      const formData = new FormData();
      formData.append("page", page.toString());
      fetch("http://localhost:8080/commodity/consumerCommodities", {
        method: "post",
        body: formData,
      }).then(async (res) => {
        const data = await res.json();
        const code = data.code;
        if (code === 200) {
          setArr((prev) => {
            return prev.concat(data.data.commodities);
          });
          totalRef.current = data.data.total;
          setPage((prev) => prev + 1);
        };
        setRefreshing(false);
      }).catch((err)=> {
        setRefreshing(false);
      });
    }
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={arr}
        style={styles.list}
        numColumns={1}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        keyExtractor={(e: any) => e.commodityId}
        onEndReached={handleEndReached}
        ListEmptyComponent={<Text>加载中，请稍后</Text>}
        renderItem={({ item }: any) => {
          return (
            <CommodityDesc
              avatarUrl={item.avatarUrl}
              price={item.price}
              name={item.name}
              commodityId={item.commodityId}>
            </CommodityDesc>
          )
        }}
      />

    </View>
  )
};