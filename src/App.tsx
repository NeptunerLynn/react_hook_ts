import React, { useState } from 'react';
import { Layout} from 'antd';
import DocumentTitle from 'react-document-title';
import RoutersConfig from './routers';
import { fetchMenu } from './axios';
import './App.less'
import { Copyright } from './components/widget';

const { Content, Footer } = Layout;

type AppProps = {
  userInfo : any;
  menuInfo : any;
}

const [userInfo,setUserInfo] = useState();
const [menuInfo,setMenuInfo] = useState();

class App extends React.Component<AppProps> {
    state = {
      title : ''
    }
    componentDidMount(){
      const { userInfo } = this.props;
      let user = sessionStorage.getItem("user");
      user && userInfo({data : user});
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
        this.props.menuInfo({data : menus});
      };
      setMenu(sessionStorage.getItem("menu") || []);
      fetchMenu().then((smenus:any) =>{
        setMenu(smenus);
        sessionStorage.setItem("menu",smenus);
      })
    };

     render() {
        const { title } = this.state;
        return (
            <DocumentTitle title={title}>
                <Layout>
                    <Layout className="app_layout">
                        {/* <HeaderCustom
                            user={this.props.userInfo}
                        /> */}
                        <Content className="app_layout_content">
                            <RoutersConfig />
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