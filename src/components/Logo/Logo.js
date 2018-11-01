import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"> <img src={brain} width="100px" style={{paddingTop: '15px'}} alt='logo'/> </div>
            </Tilt>
        </div>
    );
}

export default Logo;