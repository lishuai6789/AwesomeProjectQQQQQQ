import { Button, Image, Text } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, View, Alert } from 'react-native';
import React from 'react';
import Carousel from "react-native-reanimated-carousel";

const useImages = (commodityId: string) => {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    if (commodityId) {
      const formData = new FormData();
      formData.append("commodityId", commodityId);
      fetch("http://localhost:8080/commodity/getImages", {
        body: formData,
        method: "post",
      }).then(async (res) => {
        const data = await res.json();
        if (data.code === 200) {
          setImages(data.data);
        }
      }).catch(() => { });
    }
  }, [commodityId]);
  return images;
}
const useCommodityInfo = (commodityId: string) => {
  const [commodityInfo, setCommodityInfo] = useState<any>({});
  useEffect(() => {
    if (commodityId) {
      const formData = new FormData();
      formData.append("commodityId", commodityId);
      fetch("http://localhost:8080/commodity/getOne", {
        method: "post",
        body: formData,
      }).then(async (res) => {
        const data = await res.json();
        if (data.code === 200) {
          setCommodityInfo(data.data);
        }
      }).catch((err) => {
      });
    }
  }, [commodityId]);
  return commodityInfo;
};
const ImagesContainer = ({ commodityId }: { commodityId: string }) => {
  const width = Dimensions.get('window').width;
  const images = useImages(commodityId);
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={width}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={1000}
        onSnapToItem={index => {}}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: "center",
              }}
            >
              <Image source={{ uri: item }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }}></Image>
            </View>
          )
        }}
      />
    </View>
  )
};
const Buttons = ({ commodityId }: { commodityId: string }) => {
  const [isAdding, setIsAdding] = useState(false);
  const handleAddToShopCart = () => {
    setIsAdding(true);
    const formData = new FormData();
    formData.append("commodityId", commodityId);
    formData.append("num", 1);
    formData.append("createTime", new Date().getTime());
    fetch("http://localhost:8080/shopCart/addOne", {
      method: "post",
      body: formData,
    }).then(async (res) => {
      const data = await res.json();
      if (data.code === 200) {
        Alert.alert('', '添加购物车成功')
      }
      setIsAdding(false);
    }).catch((err) => {
      setIsAdding(false);
    });
  };

  return (
    <View style={{ flex: 1, gap: 10 }}>
      <Button title={"加入购物车"} onPress={handleAddToShopCart} loading={isAdding}></Button>
      <Button title={"立即购买"}></Button>
    </View>
  )
}
const useDetailImages = (commodityId: string) => {
  const [detailImages, setDetailImages] = useState<string[]>([]);
  useEffect(() => {
    const formData = new FormData();
    formData.append("commodityId", commodityId);
    fetch("http://localhost:8080/commodity/getDetailImages", {
      method: "post",
      body: formData,
    }).then(async (res) => {
      const data = await res.json();
      if (data.code === 200) {
        setDetailImages(data.data);
      }
    });
  }, []);
  return detailImages;
};
const DetailImagesContainer = ({commodityId}: {commodityId: string}) => {
  const detailImages = useDetailImages(commodityId);
  return (
    <View>
      {
        detailImages.map((imageUrl, idx) => {
          return (<Image source={{uri: imageUrl,}} style={{width: '100%', height: 230, }} key={idx}></Image>)
        })
      }
    </View>
  )
}
export const CommodityScreen = ({ route }) => {
  const { commodityId } = route.params;
  const commodityInfo = useCommodityInfo(commodityId);
  return (
    <ScrollView style={{flex: 1,}}>
      <ImagesContainer commodityId={commodityId}></ImagesContainer>
      <View style={{ backgroundColor: 'white' }}>
        <Text style={{ color: "#ff0036", fontSize: 25, padding: 3 }}>￥{commodityInfo?.price}元</Text>
        <Text style={{ fontSize: 20, padding: 3 }}>{commodityInfo?.name}</Text>
        <Text style={{ fontSize: 16 }}>发货地址：{commodityInfo?.address}</Text>
      </View>
      <Buttons commodityId={commodityId}></Buttons>
      <DetailImagesContainer commodityId={commodityId}></DetailImagesContainer>
    </ScrollView>
  )
};