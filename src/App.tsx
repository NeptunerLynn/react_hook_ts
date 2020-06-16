import React from 'react';
import { Layout} from 'antd';
import DocumentTitle from 'react-document-title';
import RoutersConfig from './routers';
import umbrella from 'umbrella-storage';
import { fetchMenu } from './axios';
import './App.less'
import { Copyright } from './components/widget';
// mock
require('./mock/index');

const { Content, Footer } = Layout;

type AppProps = {
  setState: (param: any) => void;
  smenus : any;
  auth: any;
}

// 创建菜单context
export const {Provider, Consumer} = React.createContext({data : null});

class App extends React.Component<AppProps> {
    state = {
      title : ''
    }
    componentWillUnmount(){
      // 卸载异步操作设置状态
      this.setState = (state, callback) => {
        return;
      }
    };
    componentDidMount(){
      let user = sessionStorage.getItem("user");
      this.setState({ stateName: 'auth', data: user });
      this.handleResize();
      this.fetchSmenu();
    };

    _resizeThrottled = false;

    handleResize = () => {
      window.addEventListener('resize', this.resizeListener);
    };

    resizeListener = () => {
      const delay = 250;
      if(!this._resizeThrottled){
        this._resizeThrottled = true;
        const timer = setTimeout(() => {
          this._resizeThrottled = false;
          clearTimeout(timer);
        }, delay);
      }
    };

    fetchSmenu = () => {
      const setMenu = (menus : any) => {
        this.setState({ stateName: 'smenus', data: menus });
      };
      setMenu(umbrella.getLocalStorage('smenus') || []);
      fetchMenu().then((smenus:any) =>{
        setMenu(smenus);
        umbrella.setLocalStorage('smenus', smenus);
      })
    };

     render() {
        const { title } = this.state;
        const { auth = { data: {} },smenus } = this.props;
        return (
            <DocumentTitle title={title}>
                <Layout>
                    <Layout className="app_layout">
                        {/* <HeaderCustom
                            user={this.props.userInfo}
                        /> */}
                        <Content className="app_layout_content">
                          <Provider value={smenus}>
                            <RoutersConfig auth = {auth} smenus={smenus}/>  
                          </Provider>  
                        </Content>
                        <Footer className="app_layout_foot">
                            <Copyright />
                        </Footer>
                    </Layout>
                </Layout>
            </DocumentTitle>
        );
    }
}

export default App;