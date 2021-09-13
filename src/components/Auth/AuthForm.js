import { useState,useRef,useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
 const authCtx= useContext(AuthContext)

  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading,setIsLoading]=useState(false)
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(event)=>{
    event.preventDefault();
   const enteredEmail = emailRef.current.value;
   const enteredPassword = passwordRef.current.value;
    setIsLoading(true)
    let url;
   if(isLogin){
     url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvWrFHy1Fo2DwTLVwJchXc5m7HDhYBLUM'
     
   }else{
     url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvWrFHy1Fo2DwTLVwJchXc5m7HDhYBLUM'
   }
     fetch(url,
     {
       method:'POST',
       body:JSON.stringify({
         email:enteredEmail,
         password:enteredPassword,
         returnSecureToken:true
       }),
       header:{
         'Content-Type':'application/json'
       }
     }).then(res=>{
       if(res.ok){
          return res.json();
       }else{
         return res.json().then(data=>{
           setIsLoading(false)
          let errorMessage= 'Authentication failed!';
          if(data && data.error && data.error.message){
            errorMessage=data.error.message;
          }
          throw new Error(errorMessage)
          
         })
       }
     }).then(data=>{
       authCtx.login(data.idToken)
     }).catch(err=>{
      alert(err.message)
     })
   
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
       
        <div className={classes.actions}>
         {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>} 
         {isLoading && <button>Sending Request...</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
