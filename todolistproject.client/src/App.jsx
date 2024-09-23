import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ResponsiveLayout from './layouts/Layout';

function App() {
    return(
        <BrowserRouter>
            <ResponsiveLayout />
        </BrowserRouter>
    )
    
}

export default App;