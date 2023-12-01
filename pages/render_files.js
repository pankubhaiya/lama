import React, { useState } from 'react';
import Header from '../components/Header_list';
import DpMenu from '../components/Menu';

const Render = () => {
   

    return (
        <div className="h-screen flex w-screen bg-gray-100 ">
            {/* Sidebar */}
            <DpMenu />
            <Header />
           
        </div>
    );
};

export default Render;
