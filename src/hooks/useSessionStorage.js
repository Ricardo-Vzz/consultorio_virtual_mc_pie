import { useState, useEffect } from 'react';

export function useSessionStorage (key, initialValue) {
  // 1. Obtener el valor inicial (de session o el valor por defecto)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error leyendo sessionStorage:", error);
      return initialValue;
    }
  });

  // 2. Guardar en sessionStorage cada vez que el estado cambie
  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error guardando en sessionStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}