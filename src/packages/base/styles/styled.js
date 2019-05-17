/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
// import * as React from 'react';
// import {createStyled, withStyleDeep} from 'styletron-react';
// import {driver, getInitialStyle} from 'styletron-standard';
//
// import {ThemeContext} from './theme-provider.js';
//
// const wrapper = StyledComponent =>
//   function withThemeHOC(props) {
//     return (
//       <ThemeContext.Consumer>
//         {theme => <StyledComponent {...props} $theme={theme} />}
//       </ThemeContext.Consumer>
//     );
//   };
//
// const baseStyled = createStyled({wrapper, getInitialStyle, driver});
//
// // TODO(#495): Need a flow expert to help remove this 'any' type
// // eslint-disable-next-line flowtype/no-weak-types
// export default function styledWrapper(...args: any) {
//   // If user is trying to style a styled component
//   // use withStyleDeep, otherwise use baseStyled
//   let styleFn = baseStyled;
//   if (args[0] && args[0].__STYLETRON__) {
//     styleFn = withStyleDeep;
//   }
//   // Also allow passing deep style overrides via $style prop
//   // Ex: <StyledDiv $style={{color: 'red'}} />
//   // Issue for supporting this natively in styletron:
//   // https://github.com/rtsao/styletron/issues/221
//
//   // $FlowFixMe
//   return withStyleDeep(styleFn(...args), (props: {$style?: ?{}}) => {
//     const {$style} = props;
//     if (typeof $style === 'function') {
//       return $style(props);
//     }
//     return $style || {};
//   });
// }

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styledEmotion from "@emotion/styled";

import React, { useContext } from "react";

import { ThemeContext } from "../../Theme";

function styled(component, arg) {
  arg = arg || (() => ({}));

  const Component = styledEmotion[component]``;

  return props => (
    <ThemeContext.Consumer>
      {theme => {
        const styleProps = { ...props, $theme: theme, $config: theme };
        const styles = arg(styleProps);

        let overrideStyles;
        if (typeof props.$style === "function") {
          overrideStyles = props.$style(styleProps);
        } else {
          overrideStyles = props.$style;
        }

        return (
          <Component
            {...props}
            $theme={theme}
            css={css`
              ${styles}
              ${overrideStyles}
            `}
          />
        );
      }}
    </ThemeContext.Consumer>
  );
}

export default styled;
