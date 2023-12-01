import React, { useState } from 'react';
import DpMenu from '../components/Menu';
import Header from '../components/editor_header';
const Transcription = () => {
   

    return (
        <div className="h-screen flex w-screen bg-gray-100 ">
            {/* Sidebar */}
            <DpMenu/>
            <Header />
           
        </div>
    );
};

export default Transcription;
