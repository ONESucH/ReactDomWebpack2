import React from 'react';
import ReactDOM from 'react-dom';
import './librares.global.less';
import './alieses.less';
import './styles.less';

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