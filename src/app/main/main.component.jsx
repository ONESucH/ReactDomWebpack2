import React from 'react';

/* Стили */
import './main.component.less';

export default class MainComponent extends React.Component {
    render() {
        return (
            <div className="main">
                <img src="/assets/img/img-1.jpg" alt="img"/>
                <img src="/assets/img/img-2.jpg" alt="img"/>
                <img src="/assets/img/img-3.jpg" alt="img"/>
                <img src="/assets/img/img-4.png" alt="img"/>
                <img src="/assets/img/img-5.gif" alt="img"/>
            </div>
        );
    }
}