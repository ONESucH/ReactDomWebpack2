import React from 'react';

/* Стили */
import './main.component.less';

export default class MainComponent extends React.Component {
    render() {
        return (
            <div className="main">
                <h1>Main title downloading</h1>
                <img src="/favicon.png" alt="img"/>
                <img src="/favicon.png" alt="img"/>
                <img src="/favicon.png" alt="img"/>
                <img src="/favicon.png" alt="img"/>
                <img src="/favicon.png" alt="img"/>
                <img src="/favicon.png" alt="img"/>
            </div>
        );
    }
}