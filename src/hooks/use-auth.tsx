
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AppUser {
  uid: string;
  email: string | null;
  name: string | null;
  phone: string | null;
  role: 'Student' | 'Admin' | 'Instructor';
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  logIn: (email: string, pass: string) => Promise<any>;
  signUp: (email: string, pass: string, name: string, phone: string) => Promise<any>;
  logOut: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (firebaseUser: FirebaseUser) => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      setUser({ uid: firebaseUser.uid, ...userDoc.data() } as AppUser);
    } else {
      // This is a fallback in case the user doc wasn't created on signup
      setUser({ 
        uid: firebaseUser.uid, 
        email: firebaseUser.email, 
        name: firebaseUser.displayName || 'New User', 
        phone: firebaseUser.phoneNumber || null,
        role: 'Student'
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        await fetchUserData(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string, phone: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // Create user document in Firestore
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const newUser = {
      name: name,
      email: email,
      phone: phone,
      role: 'Student', // Default role for new sign-ups
      joined: new Date().toISOString(),
      avatar: `https://i.pravatar.cc/150?u=${firebaseUser.uid}`
    };
    await setDoc(userDocRef, newUser);
    
    // Set user in state immediately after signup
    setUser({ uid: firebaseUser.uid, ...newUser } as AppUser);
    
    return userCredential;
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    logIn,
    signUp,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
