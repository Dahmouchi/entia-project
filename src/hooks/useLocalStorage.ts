import { useState, useEffect } from 'react';
import { UseLocalStorageReturn } from '../types/product';

export const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageReturn<T> => {
  // Récupérer la valeur depuis localStorage ou utiliser la valeur initiale
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erreur lors de la lecture de localStorage pour la clé "${key}":`, error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour la valeur
  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      // Permettre à value d'être une fonction pour la même API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Sauvegarder dans localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erreur lors de l'écriture dans localStorage pour la clé "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

