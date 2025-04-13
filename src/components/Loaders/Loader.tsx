'use client';

import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '@/assets/Jsons/loader.json';

const Loader = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-transparent">
            <Player
                autoplay
                loop
                src={animationData}
                style={{ height: '400px', width: '400px' }}
            />
        </div>
    );
};

export default Loader;
