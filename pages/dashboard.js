import React, { useState } from 'react';
import DpMenu from '../components/Menu';
import Header from '../components/Header';

const Home = () => {
   

    return (
        <div className="h-screen flex w-screen bg-gray-100 ">
            {/* Sidebar */}
            <DpMenu />
            <Header />
           
        </div>
    );
};

export default Home;
