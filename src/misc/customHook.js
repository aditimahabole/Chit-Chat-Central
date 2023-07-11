// import { useCallback, useState } from "react"
// export function useModalState(defaultValue = false){
//     console.log('useModalState')
//     const [isOpen,setIsOpen] = useState(false)
//     const open = useCallback(() => {
//         setIsOpen(true)
//         console.log('OPEN')
//         console.log('isOpen : ',isOpen)
//     } ,[]);
//     const close = useCallback(() => {
//         setIsOpen(false)
//         console.log('CLOSE')
//         console.log('isOpen : ',isOpen)
//     },[]);
//     return {isOpen,open,close}
// }
import { useState , useEffect} from "react";

export function useModalState(defaultValue = false) {
    const [isOpen, setIsOpen] = useState(defaultValue);
    useEffect(() => {
        console.log("isOpen:", isOpen);
      }, [isOpen]);

    const open = () => {
        setIsOpen(true);
        console.log('OPEN');
        console.log('isOpen:', isOpen);
    };

    const close = () => {
        setIsOpen(false);
        console.log('CLOSE');
        console.log('isOpen:', isOpen);
    };

    return { isOpen, open, close };
}

export const useMediaQuery = query => {
    const [matches, setMatches] = useState(
      () => window.matchMedia(query).matches
    );
  
    useEffect(() => {
      const queryList = window.matchMedia(query);
      setMatches(queryList.matches);
  
      const listener = evt => setMatches(evt.matches);
  
      queryList.addListener(listener);
      return () => queryList.removeListener(listener);
    }, [query]);
  
    return matches;
  };