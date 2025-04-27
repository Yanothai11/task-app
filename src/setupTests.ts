{/*import '@testing-library/jest-dom/vitest'; */}
import '@testing-library/jest-dom';

Object.defineProperty(HTMLFormElement.prototype, 'requestSubmit', {
    value: function () {
      this.submit();
    },
  });
  