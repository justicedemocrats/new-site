import React from 'react';
import "../style/map.scss";
export default (props) => (
    <div className='map-legends'>
        <h5>% Target Application</h5>
        <div className='map-leg-clr'>
            {props.splits.map(i => 
                (<div className='map-splt-clr' style={{backgroundColor: i.color}}>
                    <div className='map-splt-lbl'>{i.label}</div>
                </div>)
            )}
        </div>
    </div>
)