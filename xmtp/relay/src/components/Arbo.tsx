import { useEffect } from "react"
import styled from 'styled-components';

const Arbo = () => {
  useEffect(() => {
    Array.from(document.getElementsByTagName("iframe")).forEach((iframe:any) => {
      // iframe.contentWindow.addEventListener(
      //   "load",
      //   () => {
      //     const doc = iframe.contentWindow.document;
      //     iframe.height = iframe.contentWindow.document.body.scrollHeight+9;
      //     iframe.width =  1536;
      // },
      //   true
      // );
      // iframe.contentWindow.addEventListener(
      //   "resize",
      //   () => {
      //     iframe.height = iframe.contentWindow.document.body.scrollHeight+9;
      //     iframe.width =  1536;

      //   },
      //   true
      // );
    });
  }, []);

  return (
    <div className="">
          <iframe scrolling="no" style={{"height": "1020px", "width": "960px"}} src="/ARBO/index.html"></iframe>

    
    </div>
  );
};
export default Arbo;
