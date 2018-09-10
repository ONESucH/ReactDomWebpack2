/* Модули */
import React from 'react';

/* Стили */
import './librares.global.less';
import './alieses.less';
import './styles.less';

import ReactDOM from 'react-dom';

/* Регистрируем основную компоненту */
import MainComponent from './app/main/main.component.jsx';

import HeaderComponent from './app/header/header.component.jsx';
import FooterComponent from './app/footer/footer.component.jsx';

/* Стили */
import './index.less';

export default class Root extends React.Component {
    render() {
        return (
            <div className="app-main">
                <div className="max-size-window">
                    <HeaderComponent />
                    
                    <MainComponent />

                    <FooterComponent />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));