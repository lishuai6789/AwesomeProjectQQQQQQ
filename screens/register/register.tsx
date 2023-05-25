import { useNavigation } from '@react-navigation/native';
import { Input, Divider } from '@rneui/base';
import { Formik } from 'formik';
import { Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { object, string, ref } from 'yup';
import { useEffect } from 'react';
const useLogout = () => {
  useEffect(() => {
    fetch("http://localhost:8080/auth/logout", {
      method: 'get',
    });
  }, []);
};
export const RegisterScreen = () => {
  const navigation = useNavigation();
  useLogout();
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        checkPassword: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        setSubmitting(true);
        fetch('http://localhost:8080/auth/register', {
          method: 'post',
          body: formData,
        }).then(async (res) => {
          const data = await res.json();
          if (data.code === 200) {
            navigation.navigate("Login");
          }
          setSubmitting(false);
        }).catch((err) => {
          setSubmitting(false);
        });
      }
      }
      validationSchema={object({
        email: string().email("邮箱格式错误"),
        password: string().min(8, "密码长度不能小于8").max(20, "密码长度不能超过20"),
        check: string().oneOf([ref('password'),], "密码不匹配"),
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
          <Input
            placeholder='请确认您的密码'
            onChangeText={handleChange("checkPassword")}
            value={values.checkPassword}
            onBlur={handleBlur('checkPassword')}
            errorMessage={errors.checkPassword}
            secureTextEntry={true}></Input>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10, marginVertical: 10, }}>
            <Button onPress={handleSubmit} title="注册" loading={isSubmitting} style={{ marginVertical: 10 }} size="lg" />
            <Button onPress={() => resetForm()} title={"重置"} size="lg" type="solid" />
          </View>
          <Divider></Divider>
          <View>
            <Text>已有账号？点击下方按钮登录</Text>
            <Button onPress={() => navigation.navigate("Login")} size="lg" title={'登录'}></Button>
          </View>
        </View>
      )}
    </Formik>
  )
}