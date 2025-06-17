import type React from 'react';

interface LeafIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const LeafIcon: React.FC<LeafIconProps> = ({ size = 24, className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0" // Solid icon, so stroke width is 0, fill defines color
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 22c-2.209 0-4-1.791-4-4 0-3.038 1.039-5.792 3-7.778-1.961-1.986-4.715-3.024-7.778-3.024-1.768 0-3.363.71-4.559 1.858C.465 9.142 0 10.061 0 11c0 2.209 1.791 4 4 4h1.251c.693 1.492 1.684 2.805 2.896 3.898C7.556 19.637 7 20.761 7 22H3s-1-2-1-4c0-2.209 1.791-4 4-4h1.032c.292-1.186.847-2.266 1.612-3.182C7.89 9.901 7 8.256 7 6.5c0-2.209 1.791-4 4-4s4 1.791 4 4c0 1.756-.89 3.401-1.676 4.318.765.916 1.32 1.996 1.612 3.182H17c2.209 0 4 1.791 4 4s-1.791 4-4 4h-1c0-1.239-.556-2.363-1.148-3.102C18.063 18.195 19 16.942 19 15c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .939.324 1.792.852 2.494C11.123 19.711 10.492 22 12 22z" />
    </svg>
  );
};

export default LeafIcon;
