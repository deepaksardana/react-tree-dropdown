import React, { useRef, useEffect } from "react";

interface Props {
    children?: any;
    baseClassName: string;
    handleOutsideClick: () => void;
}
function useOutsideAlerter(ref: any, handleOutsideClick: () => void) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleOutsideClick();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function Outside({children, baseClassName, handleOutsideClick}: Props) {
  const wrapperRef = useRef<any>(null);
  useOutsideAlerter(wrapperRef, handleOutsideClick);

  return <div className={baseClassName} ref={wrapperRef}>{children}</div>;
}


export default Outside;