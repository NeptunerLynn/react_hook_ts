import React from 'react';
import { Layout} from 'antd';
import DocumentTitle from 'react-document-title';
import RoutersConfig from './routers';
import { connectAlita } from 'redux-alita';
import umbrella from 'umbrella-storage';
import { fetchMenu } from './axios';
import './App.less'
import { Copyright } from './components/widget';
// mock
require('./mock/index');

const { Content, Footer } = Layout;

type AppProps = {
  setAlitaState: (param: any) => void;
  auth: any;
}

class App extends React.Component<AppProps> {
    state = {
      title : ''
    }
    componentDidMount(){
      const { setAlitaState } = this.props;
      let user = sessionStorage.getItem("user");
      user && setAlitaState({ stateName: 'auth', data: user });
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
        this.props.setAlitaState({ stateName: 'smenus', data: menus });
      };
      setMenu(umbrella.getLocalStorage('smenus') || []);
      console.log(this.props);
      fetchMenu().then((smenus:any) =>{
        setMenu(smenus);
        umbrella.setLocalStorage('smenus', smenus);
      })
    };

     render() {
        const { title } = this.state;
        const { auth = { data: {} } } = this.props;
        return (
            <DocumentTitle title={title}>
                <Layout>
                    <Layout className="app_layout">
                        {/* <HeaderCustom
                            user={this.props.userInfo}
                        /> */}
                        <Content className="app_layout_content">
                            <RoutersConfig auth = {auth}/>
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

export default connectAlita(['auth'])(App);