import React from "react";

type EMLogoProps = {
  size?: number | string;
} & React.HTMLAttributes<HTMLOrSVGElement>;

// Default size 64
export default function EMLogo({ size = 64, ...rest }: EMLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64Z"
        fill="#002A5C"
      />
      <path
        d="M15.6074 21H28.1312V43.0247H15.6074V39.724H24.1828V34.1099H16.1627V30.8093H24.1828V24.3315H15.6074V21Z"
        fill="white"
      />
      <path
        d="M33.092 43L27.7863 25.7258H27.6629C27.6835 26.1371 27.7143 26.754 27.7555 27.5766C27.7966 28.3992 27.8377 29.2834 27.8788 30.2294C27.92 31.1548 27.9405 31.998 27.9405 32.7588V43H23.7762V20.9753H30.1307L35.3438 37.8177H35.4363L40.9579 20.9753H47.3124V43H42.963V32.5738C42.963 31.8746 42.9732 31.0725 42.9938 30.1677C43.0349 29.2629 43.0658 28.4094 43.0864 27.6074C43.1275 26.7848 43.1583 26.1679 43.1789 25.7566H43.0555L37.3797 43H33.092Z"
        fill="white"
      />
    </svg>
  );
}