import { createContext } from 'react';

// Centralized Mood context so it can be exported separately from the provider component
export const MoodContext = createContext(null);

export default MoodContext;
