import HomePage from '@/components/modules/HomePage';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const page = () => {
  return (
    <div className="">
      <header>
        <Navbar/>
      </header>
    <main className="container mx-auto h-screen px-4 md:px-8 lg:px-10">
    <HomePage/>
    </main>
    <footer>
      
    </footer>
    </div>
  );
};

export default page;