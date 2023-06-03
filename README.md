# `Modal`

This package allows you to work with modals on your websites.

## Installation

```sh
npm install sinonaz-modal
```

## Usage

CommonJS:

```js
const Modal = require('sinonaz-modal');

const modals = new Modal();

modals.init();
```

ESModules:

```js
import { Modal } from 'sinonaz-modal';

const modals = new Modal();

modals.init();
```

## Example

```html
<button type="button" data-open-target="js-modal">Click to open modal</button>

<div class="js-modal">
  <div>
    <button type="button" data-close-target="js-modal">
      Click to close modal
    </button>
  </div>
</div>
```
