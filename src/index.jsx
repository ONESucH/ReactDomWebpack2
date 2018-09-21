/* Модули */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/* Регистрируем компоненты */
import HeaderComponent from './app/Header/Header.component';
import MainComponent from './app/Main/Main.component';
import FooterComponent from './app/Footer/Footer.component';
import CarsComponent from './app/Cars/Cars.component';

/* Стили */
import './index.less';

export default class Root extends React.Component {
    render() {
        return (
            <div className="app-main">
                <div className="max-size-window">
                    
                    <HeaderComponent />

                    <Switch>
                        <Route exact path='/' component={MainComponent} />
                        <Route path='/cars' component={CarsComponent} />
                    </Switch>

                    <FooterComponent />
                    
                </div>
            </div>
        )
    }
}

ReactDOM.render((
    <BrowserRouter>
        <Root />
    </BrowserRouter>
), document.getElementById('root'));