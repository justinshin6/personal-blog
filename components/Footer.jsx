import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-t w-full inline-block border-sky-400 py-8">
                <div className="text-center block">
                    <span className="text-white">Justin Shin {currentYear}</span>
                </div>
            </div>
        </div>
    );
}

export default Footer;
