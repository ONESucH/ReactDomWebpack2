/* Модули */
import React from 'react';
import { Link } from 'react-router-dom'; // Модуль для кнопки перехода

/* Стили */
import './Main.component.less';

export default class MainComponent extends React.Component {
    render() {
        return (
            <div className="app-Main">
                Main component loaded!
                <Link to="/cards"> cards </Link>
                <Link to="/header"> header </Link>
                <Link to="/footer"> footer </Link>
            </div>
        )
    }
}
