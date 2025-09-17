# frontend-auto-test
This repo consists of fronted web automation suite for Doc360 POC using Playwright.
## Features

- End-to-end web automation using [Playwright](https://playwright.dev/)
- Supports multiple browsers: Chromium, Firefox, and WebKit
- Easy configuration for test environments
- Page Object Model structure for maintainable tests
- Customizable test reporting

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
git clone https://github.com/your-username/frontend-auto-test.git
cd frontend-auto-test
npm install
```

### Running Tests

```bash
npx playwright test
```

### Running Tests in Specific Browsers

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Folder Structure

```
frontend-auto-test/
├── tests/           # Test cases
├── pages/           # Page objects
├── playwright.config.js
└── README.md
```

## Contributing

Feel free to open issues or submit pull requests for improvements.

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test Runner](https://playwright.dev/docs/test-intro)
- [Node.js Documentation](https://nodejs.org/en/docs/)