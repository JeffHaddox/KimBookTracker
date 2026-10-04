// Bundled into vendor/firebase.js with: npx esbuild src/firebase-entry.js --bundle --minify --format=iife --outfile=vendor/firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,
  signOut, deleteUser, reauthenticateWithPopup, reauthenticateWithCredential, EmailAuthProvider,
  connectAuthEmulator
} from 'firebase/auth';
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
  doc, collection, setDoc, deleteDoc, onSnapshot, writeBatch, getDocs,
  terminate, clearIndexedDbPersistence, connectFirestoreEmulator
} from 'firebase/firestore';

window.RBFirebase = {
  initializeApp,
  getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,
  signOut, deleteUser, reauthenticateWithPopup, reauthenticateWithCredential, EmailAuthProvider,
  connectAuthEmulator,
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
  doc, collection, setDoc, deleteDoc, onSnapshot, writeBatch, getDocs,
  terminate, clearIndexedDbPersistence, connectFirestoreEmulator
};
