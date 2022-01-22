import React from 'react';
import { useForm } from './useForm';
import { validateInfo } from './validarinfo';

export const Form = () => {
    const {handleChange, values, handleSubmit, errors} = useForm(validateInfo);
    return (
      <div className='.form-content-rigth '>
        <form className='form' onSubmit={handleSubmit}>
          <h1>Get started with us today! Creat your account now!</h1>

          <div className='form-inputs'>
            <label htmlFor='username' 
              className='form-lable'>
              Username
            </label>

            <input 
              id='username'
              type="text" 
              name="username" 
              className='form-input'
              placeholder='Enter your username'
              value={values.username}
              onChange={handleChange}>
              {errors.username && <p>{errors.username}</p>}
        
            </input>
          </div>

          <div className='form-inputs'>
            <label 
              htmlFor='email' 
              className='form-lable'>
              Email
            </label>

            <input 
              id='email'
              type="email" 
              name="email" 
              className='form-input'
              placeholder='Enter your email'
              value={values.email}
              onChange={handleChange}>
          
            </input>
          </div>


          <div className='form-inputs'>
            <label 
              htmlFor='password' 
              className='form-lable'>
              Password
            </label>

            <input 
              id='password'
              type="password" 
              name="password" 
              className='form-input'
              placeholder='Enter your password'
              value={values.password}
              onChange={handleChange}>
            </input>
          </div>



          <div className='form-inputs'>
            <label 
              htmlFor='password2' 
              className='form-lable'>
              Confirm Password
            </label>

            <input 
              id='password2'
              type="password" 
              name="password2" 
              className='form-input'
              placeholder='Confirm your password'
              value={values.password2}
              onChange={handleChange}>
            </input>
          </div>
          <button className='form-input-btn' type='submit'>Sign Up</button>

          <span className='from-inpuut-login'>
            Already have an account? Login <a href='#'>here</a>
          </span>
        </form>
      </div>
    )
};
