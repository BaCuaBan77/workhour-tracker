'use client'

import React, { ChangeEvent, useState } from 'react';
import styles from '@/styles/login.module.css';
import Image from 'next/image'; 
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: "", password: "" });

      const res = await signIn("github");

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("invalid email or password");
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
      {error && (
        <p>{error}</p>
      )}
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
              onChange={handleChange}
              type='text'
              id='email'
              name='usemailername'
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
            {loading ? "loading..." : "Sign In"}
          </button>
        </form>
      </div>
      </div>
      
    </div>
  );
};

export default Login;