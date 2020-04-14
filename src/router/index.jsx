import React, { Component, Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import NotFound from 'components/notFound';
import Loading from 'components/loading';

const Page1 = lazy(() => import('pages/page1'));
const Page2 = lazy(() => import('pages/page2'));
const Page3 = lazy(() => import('pages/page3'));

export default class Root extends Component {
    render() {
        return (
            <HashRouter>
                <Suspense fallback={<Loading isLoading={true} />}>
                    <Switch>
                        <Route exact path="/" component={Page1} />
                        <Route exact path="/page2" component={Page2} />
                        <Route exact path="/page3" component={Page3} />
                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
            </HashRouter>
        );
    }
}