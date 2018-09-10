import React from 'react';
import ReactDOM from 'react-dom';
import Style from './style.css';

export default function ({types: t}) {
    return {
        visitor: {
            Identifier(path) {
                let name = path.node.name; // reverse the name: JavaScript -> tpircSavaJ
                path.node.name = name.split('').reverse().join('');
            }
        }
    };
}