'use client';

import React, { ChangeEvent, useState } from 'react';
import styles from '@/styles/login.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createRequestOptions, parseJwt } from '@/src/util/utils';

const Login = () => {
  const { push } = useRouter();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ username: '', password: '' });

      const res = await fetch(
        'http://192.168.0.177:8080/realms/master/protocol/openid-connect/token',
        createRequestOptions(
          'password',
          formValues.username,
          formValues.password,
          null
        )
      );
      const data = await res.json();
      // If no error and we have user data, return it
      if (res.status === 200 && data) {
        const token = data.access_token;
        const user = await parseJwt(token); // Implement this function

        setLoading(false);
        push('/dashboard');
      } else {
        setError('invalid email or password');
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <div className={styles.body}>
      {error && <p>{error}</p>}
      <Image
        src='/snowflake.jpg' // Replace with the actual path to your image
        alt='Login Image'
        className={styles.image}
        width={1000} // Adjust the width as needed
        height={800} // Adjust the height as needed
      />
      <div className={styles.subBody}>
        <div className={styles.sloganContainer}>
          <h1 className={styles.sloganTitle}>FROSTBITE</h1>
          <p className={styles.slogan}>Where Time Takes a Chill Pill</p>
          <p className={styles.slogan}>
            Log Your Hours So You Can Pay The Bill
          </p>
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
                onChange={handleChange}
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
                onChange={handleChange}
                type='password'
                id='password'
                name='password'
              />
            </div>
            <button className={styles.button} type='submit' onClick={onSubmit}>
              {loading ? 'loading...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
