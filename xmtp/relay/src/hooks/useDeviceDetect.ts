import { useState, useEffect } from 'react';

export default function useDeviceDetect() {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent;

    const mobile = Boolean(
      (userAgent.match(
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      ) &&
        localStorage.mobile) ||
        window.navigator.maxTouchPoints > 1
    );
    setMobile(mobile);
  }, []);

  return { isMobile };
}
