import type { CSSProperties } from "react";

/* Kodeline brand marks — inline SVG, painted with currentColor so they
   invert cleanly between light and dark themes. Geometry taken verbatim
   from the brand guideline vector files. */

export function Wordmark({
  className,
  style,
  title = "Kodeline",
}: {
  className?: string;
  style?: CSSProperties;
  title?: string;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 3000 377.06"
      fill="currentColor"
      role="img"
      aria-label={title}
    >
      <path d="M0,369.72V8.96h70.17v360.76H0ZM233.76,369.72L101.81,201.2h-50.9L207.57,8.96h80.55l-141.34,172.97-1.98-34.59,174.45,222.38h-85.49Z" />
      <path d="M1042.97,370.51V5.31h70.17v365.21h-70.17ZM1103.26,370.51v-65.23h74.62c18.45,0,35-2.88,49.67-8.65,14.66-5.76,27.18-13.91,37.56-24.46,10.38-10.54,18.28-22.98,23.72-37.31,5.44-14.33,8.15-30.23,8.15-47.69s-2.72-33.85-8.15-48.18c-5.44-14.33-13.34-26.6-23.72-36.82-10.38-10.21-22.9-18.03-37.56-23.47-14.66-5.43-31.22-8.15-49.67-8.15h-74.62V5.31h70.17c32.62,0,61.03,4.78,85.25,14.33,24.22,9.56,44.48,22.65,60.79,39.28,16.31,16.64,28.49,35.58,36.57,56.83,8.07,21.25,12.11,43.24,12.11,65.98v10.87c0,21.74-4.04,43.24-12.11,64.49-8.08,21.25-20.26,40.36-36.57,57.32-16.31,16.97-36.57,30.56-60.79,40.77-24.21,10.22-52.63,15.32-85.25,15.32h-70.17Z" />
      <path d="M1479.95,368.93V8.17h68.69v360.76h-68.69ZM1538.76,67.47V8.17h159.62v59.3h-159.62ZM1538.76,215.24v-59.3h150.73v59.3h-150.73ZM1538.76,368.93v-59.3h163.58v59.3h-163.58Z" />
      <path d="M1814.15,368.13V7.38h70.17v360.76h-70.17ZM1874.44,368.13v-61.77h155.67v61.77h-155.67Z" />
      <path d="M2141.91,367.34V6.58h70.17v360.76h-70.17Z" />
      <path d="M2323.9,366.55V5.79h115.15l151.22,302.44h16.8l-9.88,8.89V5.79h66.22v360.76h-116.13l-151.22-302.44h-16.8l9.88-8.89v311.34h-65.23Z" />
      <path d="M2775.21,365.75V4.99h68.69v360.76h-68.69ZM2834.02,64.3V4.99h161.62v59.3h-161.62ZM2834.02,212.06v-59.3h150.73v59.3h-150.73ZM2834.02,365.75v-59.3h163.58v59.3h-163.58Z" />
      <path d="M558.72,370.51l-180.89-183.15L558.72,4.2l56.53,56.85-128.88,126.3,128.88,126.3-56.53,56.85Z" />
      <path d="M693.75,313.66l128.88-126.3-128.88-126.3,56.53-56.85,180.89,183.16-180.89,183.15-56.53-56.85Z" />
    </svg>
  );
}

export function Mark({
  className,
  style,
  title = "Kodeline",
}: {
  className?: string;
  style?: CSSProperties;
  title?: string;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 2000 2000"
      fill="currentColor"
      role="img"
      aria-label={title}
    >
      <path d="M699.84,1572.4L133.97,999.45,699.84,426.48l176.83,177.85-403.18,395.11,403.18,395.1-176.83,177.85Z" />
      <path d="M1122.24,1394.55l403.18-395.1-403.18-395.11,176.83-177.85,565.87,572.96-565.87,572.95-176.83-177.85Z" />
    </svg>
  );
}

/* Outline version of the mark — thin stroke, no fill. Used as a large
   decorative element in hero / section backgrounds. */
export function MarkOutline({
  className,
  style,
  strokeWidth = 14,
}: {
  className?: string;
  style?: CSSProperties;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 2000 2000"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path d="M699.84,1572.4L133.97,999.45,699.84,426.48l176.83,177.85-403.18,395.11,403.18,395.1-176.83,177.85Z" />
      <path d="M1122.24,1394.55l403.18-395.1-403.18-395.11,176.83-177.85,565.87,572.96-565.87,572.95-176.83-177.85Z" />
    </svg>
  );
}
