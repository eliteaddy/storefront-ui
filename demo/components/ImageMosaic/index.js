import React from "react";

import { ImageMosaic$ } from "@commerce-ui/core/ImageMosaic";
import { ImageZoomable } from "../Image";

export const ImageMosaic = React.forwardRef((props, ref) => (
  <ImageMosaic$
    imageComponent={image => <ImageZoomable image={image} />}
    {...props}
    ref={ref}
  />
));
