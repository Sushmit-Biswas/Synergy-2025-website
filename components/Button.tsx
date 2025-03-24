'use client';

import clsx from "clsx";
import { ReactNode } from "react";

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
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-cyber-blue px-7 py-3 text-white",
        containerClass
      )}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}

      <span className="relative inline-flex overflow-hidden font-orbitron text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>

      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button; 