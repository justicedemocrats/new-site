import React from 'react';
import '../style/map.scss';

export default props => (
    <div className='map-state-stat'>
        <div className='state-stat-lbl'>
            <span className='state-stat-nm'>{props.state}</span>
            <span className='state-stat-totals'>{props.count}/{props.target}</span>
        </div>
        <div className='state-stat-viz'>
            <div className='state-stat-cmplt' style={{width: `${(props.count * 100)/props.target}%`}}></div>
        </div>
    </div>
);