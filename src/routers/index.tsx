import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import produce from "immer"
// import { useDispatch, useMappedState, StoreContext } from 'redux-react-hook'
import { connectAlita, useAlitaState } from 'redux-alita';
import umbrella from 'umbrella-storage';
import config, { IFMenuBase, IFMenu } from './config';
import RouteWrapper from './RouteWrapper';
import AllComponents from '../components';

type RouterProps = {
    smenus : any;
    auth : any;
}
class RoutersConfig extends React.Component<RouterProps> {
    requireLogin = () => {
        const { auth } = this.props; 
        return true;
    };
    redirectLogin = () => {
        return <Redirect to='/login' />;
    };
    iterteMenu = (r : IFMenu) => {
        const route = (r: IFMenuBase) => {
            const Component = r.component && AllComponents[r.component];
            return (
                <Route
                    key = {r.route || r.key}
                    exact
                    path = {
                        r.route || r.key
                    }
                    render = { (props : any) => {
                        const wrapper = (
                            <RouteWrapper {... { ...props, Comp: Component,route:r}} />
                        );
                        // return this.requireLogin() ?  this.redirectLogin() : wrapper;
                        return wrapper;
                    } }
                />
            );
         };

         const subRoute = (r : IFMenu) : any => 
            r.subs && r.subs.map((subR : IFMenu) => (subR.subs ? subRoute(subR) : route(subR)));

        return  r.component ? route(r) : subRoute(r);
     };

     createRoute = (key : string) => {
        return config[key].map(this.iterteMenu);
     };
     
     render(){
        const { smenus } = this.props;
        return (
            <Switch>
                {Object.keys(config).map((key) => this.createRoute(key))}
                { (smenus.data || umbrella.getLocalStorage('smenus') || []).map(this.iterteMenu)}
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        );
     }
    
}


export default connectAlita([{ smenus: null }])(RoutersConfig);