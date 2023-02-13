/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`:host {
  display: block;
  box-sizing: border-box;
}

:host([hidden]),
[hidden] {
  display: none !important;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

:host(h1),
h1 {
  font-size: 20px;
  width: 100vw;
  text-align: center;
}

:host(.card-edit),
.card-edit {
  margin-top: 10px;
  margin-bottom: 10px;
}

:host(.button-wrapper),
.button-wrapper {
  width: 100vw;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 20px;
}
`;