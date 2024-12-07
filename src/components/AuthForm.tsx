import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LoginFormValues, SignUpFormValues } from '../types/auth.types';
import { 
    loginValidationSchema, 
    signUpValidationSchema 
} from '../utils/validation';
import PasswordStrength from './PasswordStrength';

const AuthForm: React.FC = () => {
    // Existing states
    const [isLogin, setIsLogin] = useState(() => {
        const savedIsLogin = localStorage.getItem('isLogin');
        return savedIsLogin ? JSON.parse(savedIsLogin) : true;
    });
    const [successMessage, setSuccessMessage] = useState('');
    
    // New states for the bend effect
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    // Existing useEffect
    useEffect(() => {
        localStorage.setItem('isLogin', JSON.stringify(isLogin));
    }, [isLogin]);

    // Handle mouse movement for bend effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();
        
        // Calculate mouse position relative to container
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Convert position to percentage (-50 to 50)
        const xPercent = ((x / rect.width) - 0.5) * 2;
        const yPercent = ((y / rect.height) - 0.5) * 2;
        
        // Maximum rotation angle
        const maxRotate = 5;
        
        // Calculate rotation angles
        const rotateX = -yPercent * maxRotate;
        const rotateY = xPercent * maxRotate;
        
        setRotation({ x: rotateX, y: rotateY });
    };

    // Reset rotation when mouse leaves
    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    // Create confetti effect
    const createConfetti = () => {
        const container = document.createElement('div');
        container.className = 'confetti-container';
        document.body.appendChild(container);

        const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = `confetti confetti-${colors[Math.floor(Math.random() * colors.length)]}`;
            
            // Random position and animation delay
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.animation = `confettiFall ${1 + Math.random() * 2}s ease-out ${Math.random() * 2}s`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            container.appendChild(confetti);
        }

        // Remove confetti after animation
        setTimeout(() => {
            document.body.removeChild(container);
        }, 5000);
    };

    // Existing handleSubmit
    const handleSubmit = (values: LoginFormValues | SignUpFormValues) => {
        if ('name' in values) {
            console.log('Sign Up', values);
            setSuccessMessage('Sign Up Successful');
        } else {
            if (values.rememberMe) {
                localStorage.setItem('rememberedEmail', values.email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            console.log('Login', values);
            setSuccessMessage('Login Successful');
        }

        // Trigger confetti
        createConfetti();

        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const isFormValid = (values: LoginFormValues | SignUpFormValues, errors: { [key: string]: string }) => {
        // Check if there are any errors
        if (Object.keys(errors).length > 0) return false;
        
        // Check if all required fields are filled
        if (isLogin) {
            return values.email && values.password;
        } else {
            const signUpValues = values as SignUpFormValues;
            return signUpValues.name && signUpValues.email && signUpValues.password && signUpValues.confirmPassword;
        }
    };

    return (
        <div>
            <div 
            className='auth-container'
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: 'transform 0.3s ease'
            }}
            >
            <h2 className='auth-title'>
                {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>

            {successMessage && (
                <div role="alert" className='success-message'>
                {successMessage}
                </div>
            )}

            <Formik
                initialValues={
                isLogin 
                    ? { 
                        email: localStorage.getItem('rememberedEmail') || '', 
                        password: '',
                        rememberMe: false 
                    }
                    : { 
                        name: '', 
                        email: '', 
                        password: '',
                        confirmPassword: '' 
                    }
                }
                validationSchema={isLogin ? loginValidationSchema : signUpValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors }) => (
                <Form>
                    {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="name" className="floating-label">Name</label>
                        <Field
                        type="text"
                        name="name"
                        placeholder="Enter your Name"
                        className="floating-input"
                        />
                        <ErrorMessage 
                        name="name" 
                        component="div" 
                        className="error-message"
                        />
                    </div>
                    )}

                    <div className="form-group">
                    <label htmlFor="email" className="floating-label">Email</label>
                    <Field
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        className="floating-input"
                    />
                    <ErrorMessage 
                        name="email" 
                        component="div" 
                        className="error-message"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="password" className="floating-label">Password</label>
                    <Field
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                        className="floating-input"
                    />
                    {!isLogin && (
                        <PasswordStrength password={values.password as string} />
                    )}
                    <ErrorMessage 
                        name="password" 
                        component="div" 
                        className="error-message"
                    />
                    </div>

                    {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="floating-label">Confirm Password</label>
                        <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Please confirm your Password"
                        className="floating-input"
                        />
                        <ErrorMessage 
                        name="confirmPassword" 
                        component="div" 
                        className="error-message"
                        />
                    </div>
                    )}

                    {isLogin && (
                    <div className="remember-me-group">
                        <Field
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        />
                        <label htmlFor="rememberMe">Remember Me</label>
                    </div>
                    )}

                    <button
                    type="submit"
                    className='submit-button'
                    disabled={!isFormValid(values, errors)}
                                style={{
                                    opacity: isFormValid(values, errors) ? 1 : 0.6,
                                    cursor: isFormValid(values, errors) ? 'pointer' : 'not-allowed'
                                }}
                    >
                    {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </Form>
                )}
            </Formik>

            <div>
                <button 
                onClick={() => setIsLogin(!isLogin)}
                className='toggle-form-button'
                >
                {isLogin 
                    ? 'Need an account? Sign Up' 
                    : 'Already have an account? Sign In'}
                </button>
            </div>
            </div>
        </div>
    );
};

export default AuthForm;