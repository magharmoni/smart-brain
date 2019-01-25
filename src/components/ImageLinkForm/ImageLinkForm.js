import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it at try.'}
            </p>
            <p className='f5'>
                {'Enter the webbaddress of a picture. You can try this address as an example: http://a.espncdn.com/photo/2018/0726/r406100_800x450_16-9.jpg '}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input type='text' className='f4 pa2 w-70 center' onChange={onInputChange}/>
                    <button className='f4 pa2 grow w-30 link ph3 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;