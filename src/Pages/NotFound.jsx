import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate()
    const styles = {
            fontWeight : 'bold',
            color: 'white',
            textAlign: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh', 
            fontSize : '30px'
        }
    
    return (
        <div style={styles}>
            <h1>404s and heartbreaks</h1>
            <p>
                We couldn't find the page you're looking for.
            </p>
            <span onClick={()=> navigate('/')}>Go Back Home</span>
        </div>
    );
};

export default NotFound;