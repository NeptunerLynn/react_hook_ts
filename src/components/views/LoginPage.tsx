import { Button, Checkbox, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { FormComponentProps } from 'antd/lib/form';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import '../../assets/less/login.less';

interface LoginParam {
    username: string;
    password: string;
    remember: boolean;
}

interface LoginFormProps extends RouteComponentProps {}

class LoginPage extends React.Component<LoginFormProps, LoginParam> {
    readonly state: Readonly<LoginParam> = {
        username: '',
        password: '',
        remember: true,
    }

    constructor(props: LoginFormProps) {
        super(props);
    }

    onFinish = values => {
        console.log(this.props)
        console.log('Success:', values);
        this.props.history.push('/home');
    }
      
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    }

    onRegister = () => {
      this.props.history.push('/register');
    }
    render() {
        return (
                <div id="loginContent">
                  <div className="login-card">
                    <div className="login-card-title">欢 迎 登 录</div>
                    <Form
                      name="basic"
                      initialValues={{ remember: true }}
                      onFinish={this.onFinish}
                      onFinishFailed={this.onFinishFailed}
                    >
                      <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入账号!' }]}
                      >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                      >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="密码"/>
                      </Form.Item>

                      <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                          <Checkbox>记住密码</Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" href="#!" onClick={this.onRegister}>
                          没有账号？先注册吧！
                        </a>
                      </Form.Item>

                      <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                          登录
                        </Button>
                      </Form.Item>
                    </Form>
                  </div> 
                </div>
        );
    }
}

export default LoginPage;
