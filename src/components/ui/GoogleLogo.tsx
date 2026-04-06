import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
const GoogleLogo = (props: SvgProps) => (
  <Svg
    viewBox="-0.229 0 20 20"
    preserveAspectRatio="xMidYMid"
    fill="#000000"
    width={20}
    height={20}
    {...props}
  >
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <G id="SVGRepo_iconCarrier">
      <Path
        d="M19.533 10.187c0 -0.819 -0.066 -1.417 -0.21 -2.037H9.966v3.698h5.492c-0.111 0.919 -0.709 2.303 -2.037 3.233l-0.019 0.124 2.958 2.292 0.205 0.02c1.882 -1.738 2.968 -4.296 2.968 -7.33"
        fill="#4285F4"
      />
      <Path
        d="M9.966 19.931c2.691 0 4.95 -0.886 6.599 -2.414l-3.145 -2.436c-0.842 0.587 -1.971 0.997 -3.455 0.997 -2.635 0 -4.872 -1.738 -5.669 -4.141l-0.117 0.01 -3.076 2.381 -0.04 0.112C2.702 17.695 6.068 19.931 9.966 19.931"
        fill="#34A853"
      />
      <Path
        d="M4.296 11.937c-0.21 -0.62 -0.332 -1.285 -0.332 -1.971 0 -0.687 0.122 -1.351 0.321 -1.971l-0.006 -0.132L1.165 5.444l-0.102 0.048C0.388 6.843 0 8.36 0 9.966s0.388 3.123 1.063 4.473z"
        fill="#FBBC05"
      />
      <Path
        d="M9.966 3.853c1.871 0 3.134 0.808 3.853 1.484l2.813 -2.746C14.904 0.985 12.656 0 9.966 0 6.068 0 2.702 2.237 1.063 5.492l3.222 2.503c0.808 -2.403 3.045 -4.141 5.68 -4.141"
        fill="#EB4335"
      />
    </G>
  </Svg>
);
export default GoogleLogo;
