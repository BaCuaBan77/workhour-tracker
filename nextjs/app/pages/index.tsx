import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </div>
  );
};

export default HomePage;