import React from 'react';
import styles from '../../styles/login.module.css';
import Image from 'next/image'; 

const Login = () => {
  return (
    <div className={styles.body}>
      <Image
        src="/snowflake.jpg" // Replace with the actual path to your image
        alt="Login Image"
        className={styles.image}
        width={1000} // Adjust the width as needed
        height={800} // Adjust the height as needed
      />
      <div className={styles.subBody}>
      <div className={styles.sloganContainer}>
        <h1 className={styles.sloganTitle}>FROSTBITE</h1>
        <p className={styles.slogan}>Where Time Takes a Chill Pill</p>
        <p className={styles.slogan}>Log Your Hours So You Can Pay The Bill</p>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='username'>
              Username
            </label>
            <input
              className={styles.input}
              type='text'
              id='username'
              name='username'
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='password'>
              Password
            </label>
            <input
              className={styles.input}
              type='password'
              id='password'
              name='password'
            />
          </div>
          <button className={styles.button} type='submit'>
            Login
          </button>
        </form>
      </div>
      </div>
      
    </div>
  );
};

export default Login;
