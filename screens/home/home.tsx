import { FlatList, StyleSheet, Text, View } from "react-native";
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
  return (
    <View style={{ width: "100%", }}>
      <Card>
        <Image source={{ uri: avatarUrl, }} style={{width: '100%', height: 200, resizeMode: "contain"}}></Image>
        <Divider></Divider>
        <Text style={{fontSize: 26, }}>{name}</Text>
        <Text>{price}元</Text>
      </Card>
    </View>
  )
};
export const HomeScreen = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [arr, setArr] = useState([]);
  const totalRef = useRef(10000);
  useEffect(() => {
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
          console.log(data);
          setArr((prev) => {
            return prev.concat(data.data.commodities);
          });
          totalRef.current = data.data.total;
        }
      });
    }
  }, [arr]);
  const handleEndReached = () => {
    if (page * 10 < totalRef.current) {
      const formData = new FormData();
      formData.append("counter", page.toString());
      fetch("http://localhost:8080/commodity/consumerCommodities", {
        method: "post",
        body: formData,
      }).then(async (res) => {
        const data = await res.json();
        const code = data.code;
        if (code === 200) {
          console.log(data);
          setArr((prev) => {
            return prev.concat(data.data.commodities);
          });
          totalRef.current = data.data.total;
        }
      })
    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={arr}
        style={styles.list}
        numColumns={1}
        keyExtractor={(e) => e}
        onEndReached={handleEndReached}
        ListEmptyComponent={<Text>无数据</Text>}
        renderItem={({ item }: any) => {
          console.log("item:", item)
          return (
            <CommodityDesc
              key={item.commodityId}
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