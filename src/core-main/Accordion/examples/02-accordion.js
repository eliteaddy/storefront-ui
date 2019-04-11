import React, { useState }from "react";
import {Accordion} from "storefront-ui";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import LoremIpsum from "../../../../docs-utils/LoremIpsum";

export default () => {
    return <div>
        <p>Basic use case</p>

        <Accordion headerComponent={(open, setOpen) => <div css={css`
            padding: 10px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border: 1px solid black;
        `}><div>HEADER</div> <button onClick={() => setOpen(!open)}>{ open ? 'collapse' : 'uncollapse' }</button></div>}>
            <LoremIpsum/>
        </Accordion>

    </div>
};