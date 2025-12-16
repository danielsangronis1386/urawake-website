import React from 'react';
import './MenuOverlay.css';

const MenuOverlay = ({ isOpen, onClose, onNavigate }) => {

    const handleNav = (section) => {
        onNavigate(section);
        onClose();
    };

    return (
        <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
            <button className="menu-close-btn" onClick={onClose}>
                X
            </button>

            <ul className="menu-list">
                <li className="menu-item" onClick={() => handleNav('projects')}>
                    WORK
                </li>
                <li className="menu-item" onClick={() => handleNav('services')}>
                    SERVICES
                </li>
                <li className="menu-item" onClick={() => handleNav('about')}>
                    ABOUT
                </li>
                <li className="menu-item" onClick={() => handleNav('start')}>
                    START A PROJECT
                </li>
            </ul>
        </div>
    );
};

export default MenuOverlay;
