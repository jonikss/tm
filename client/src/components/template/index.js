import React from 'react';
import './index.styl';

const Template = ({template_id}) => {
    console.log()
    return <article className='template'>
        <div className='template__img-wrap'>
            <img className='template__img' src={`/api/images/272/272/${template_id}.png`} />
        </div>
    </article>;
}

export default Template;
