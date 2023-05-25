import { View } from "react-native";
import { Input, Button } from '@rneui/themed';
import { Formik } from 'formik'
import { useNavigation } from "@react-navigation/native";
import { useEffect } from 'react';
import { object, string, } from 'yup';
const useCheckIsLogin = () => {
  const navigation = useNavigation();
  useEffect(() => {
    fetch('http://localhost:8080/auth/isLogin', {
      method: "get",
    }).then(async (res) => {
      const data = await res.json();
      console.log("data.code: ", data.code);
      if (data.code === 200) {
        navigation.navigate("Home");
      }
    }).catch((err) => {
    });
  }, []);
};
export const LoginScreen = () => {
  const navigation = useNavigation();
  useCheckIsLogin();
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("rememberMe", "true");
        setSubmitting(true);
        fetch('http://localhost:8080/auth/login', {
          method: 'post',
          body: formData,
        }).then( async(res) => {
          const data = await res.json();
          if (data.code === 200) {
            navigation.navigate("Home");
          }
          setSubmitting(false);
          console.log("success");
        }).catch((err) => {
          setSubmitting(false);
          console.log("failed");
        });
      }
      }
      validationSchema={object({
        email: string().email("邮箱格式错误"),
        password: string().min(8, "密码长度不能小于8").max(20, "密码长度不能超过20"),
      })}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting, resetForm }) => (
        <View>
          <Input
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="请输入您的邮箱"
            errorMessage={errors.email}
          />
          <Input
            placeholder="请输入您的密码"
            onChangeText={handleChange('password')}
            value={values.password}
            onBlur={handleBlur('password')}
            errorMessage={errors.password}
            secureTextEntry={true}
          />
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <Button onPress={handleSubmit} title="登录" loading={isSubmitting} style={{ marginVertical: 10 }} size="lg" />
            <Button onPress={() => resetForm()} title={"重置"} size="lg" type="solid" />
            <Button onPress={() => navigation.navigate("Register")} size="lg" title={'注册'}></Button>
          </View>
        </View>
      )}
    </Formik>
  )
};