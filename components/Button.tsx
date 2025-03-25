'use client';

import clsx from "clsx";
import { ReactNode } from "react";

// Credits: https://codepen.io/thepuskar/pen/eYgyyBb

interface ButtonProps {
  id?: string;
  title: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  containerClass?: string;
  onClick?: () => void;
}

const Button = ({ 
  id, 
  title, 
  rightIcon, 
  leftIcon, 
  containerClass,
  onClick 
}: ButtonProps) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 text-cyber-pink border-2 border-cyber-pink hover:text-white",
        containerClass
      )}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}

      <span className="relative inline-flex overflow-hidden font-orbitron text-base md:text-lg font-bold">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>

      {rightIcon && <span className="ml-2">{rightIcon}</span>}

      <style jsx>{`
        button {
          position: relative;
          z-index: 1;
        }
        
        button::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          right: 50%;
          bottom: 0;
          opacity: 0;
          transition: 0.5s all ease;
          box-sizing: border-box;
          z-index: -1;
        }
        
        button:hover::before {
          border-radius: 9999px;
          transition: 0.5s all ease;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, #fd297a, #9424f0);
          opacity: 1;
        }
      `}</style>
    </button>
  );
};

export default Button; 