import React, { createRef, useEffect } from "react";
import "@left4code/tw-starter/dist/js/modal";
import { init } from "./index";

interface DropzoneProps {
  getRef: any;
  options: any;
  children: any
}

function Dropzone(props: DropzoneProps) {
  const fileUploadRef: any = createRef();

  useEffect(() => {
    props.getRef(fileUploadRef.current);
    init(fileUploadRef.current, props);
  }, []);

  const { options, getRef, ...computedProps } = props;
  return (
    <div {...computedProps} ref={fileUploadRef} className="dropzone">
      <div className="dz-message" onClick={() => console.log('fileUploadRef:' , fileUploadRef.current)}>{props.children}</div>
    </div>
  );
}

export default Dropzone;
