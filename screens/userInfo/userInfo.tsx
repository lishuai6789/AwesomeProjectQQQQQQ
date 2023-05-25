import { View, Image } from 'react-native'
export const UserInfoScreen = () => {
  return (
    <View>
      <Image source={{ uri: "https://litaishuai.oss-cn-hangzhou.aliyuncs.com/mall/1651098710498922496.png" }} style={{
        aspectRatio: 1,
        width: 100,
        flex: 1,
      }} />
    </View>
  )
}