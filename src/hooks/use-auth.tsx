
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
import { Skeleton } from '@/components/ui/skeleton';

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
      // Fallback if user doc doesn't exist for some reason
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
    const user = userCredential.user;
    
    // Create user document in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      name: name,
      email: email,
      phone: phone,
      role: 'Student', // Default role
      joined: new Date().toISOString(),
      avatar: `https://i.pravatar.cc/150?u=${user.uid}` // Generic avatar
    });
    
    // Fetch and set user data in context
    await fetchUserData(user);
    
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
        {/* We can show a full-page loader here if we want */}
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
