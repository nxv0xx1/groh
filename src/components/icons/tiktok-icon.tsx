import type React from 'react';

interface TiktokIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const TiktokIcon: React.FC<TiktokIconProps> = ({ size = 24, className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.86-.45-6.6-2.23-1.5-1.56-2.2-3.66-2.1-5.71.02-2.47.68-4.82 2.31-6.66 1.63-1.84 4-2.79 6.22-2.77.02 1.48-.01 2.96.01 4.44-.69.02-1.37.06-2.06.09-1.09.05-2.07.34-2.96.94-1.04.69-1.8 1.64-2.16 2.83-.24.79-.31 1.63-.3 2.45.01.82.16 1.64.44 2.4.45 1.25 1.25 2.27 2.37 2.95.93.56 2.06.84 3.14.81.93-.03 1.83-.28 2.62-.75.87-.52 1.5-1.27 1.88-2.21.31-.76.45-1.58.45-2.41V.02z" />
    </svg>
  );
};

export default TiktokIcon;
