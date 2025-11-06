# 🧪 Automated Testing Guide

## ✅ What's Been Set Up

Your ashram website now has **automated testing** integrated into the deployment pipeline!

### **Testing Framework:**
- **Jest** - JavaScript testing framework
- **React Testing Library** - For component testing
- **TypeScript support** - Full type checking in tests

### **Test Coverage:**
1. **Component Tests** - Header, Footer components
2. **Page Tests** - Home page rendering
3. **Build Tests** - Configuration validation
4. **15 passing tests** ✅

---

## 🚀 How It Works

### **Automatic Testing in CI/CD:**

Every time you push to `main`, GitHub Actions will:

1. ✅ **Install dependencies**
2. ✅ **Run linter** (`npm run lint`)
3. ✅ **Run tests** (`npm run test:ci`)
4. ✅ **Build the site** (`npm run build`)
5. ✅ **Deploy to server** (only if all tests pass!)

**If tests fail, deployment is blocked!** 🛡️

---

## 📝 Running Tests Locally

### **Run all tests:**
```bash
npm test
```

### **Run tests in watch mode** (auto-rerun on file changes):
```bash
npm run test:watch
```

### **Run tests with coverage report:**
```bash
npm run test:coverage
```

### **Run tests for CI** (same as GitHub Actions):
```bash
npm run test:ci
```

---

## 📂 Test Structure

```
ashram-website/
├── __tests__/
│   ├── components/
│   │   ├── Header.test.tsx       # Header component tests
│   │   └── Footer.test.tsx       # Footer component tests
│   ├── pages/
│   │   └── home.test.tsx         # Home page tests
│   └── build.test.ts             # Build configuration tests
├── jest.config.js                # Jest configuration
└── jest.setup.js                 # Test setup file
```

---

## ✍️ Writing New Tests

### **Example: Testing a Component**

Create a new file: `__tests__/components/MyComponent.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

// Mock dependencies if needed
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('MyComponent', () => {
  it('renders without crashing', () => {
    const { container } = render(<MyComponent />);
    expect(container).toBeInTheDocument();
  });

  it('displays the correct text', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('handles button click', () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
```

---

## 🎯 Current Test Coverage

### **Components:**
- ✅ Header - 4 tests
- ✅ Footer - 3 tests

### **Pages:**
- ✅ Home - 3 tests

### **Build:**
- ✅ Configuration - 5 tests

**Total: 15 tests passing** ✅

---

## 🔍 Test Output Example

```bash
PASS __tests__/components/Header.test.tsx
PASS __tests__/components/Footer.test.tsx
PASS __tests__/pages/home.test.tsx
PASS __tests__/build.test.ts

Test Suites: 4 passed, 4 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        3.385 s
```

---

## 🛠️ Debugging Failed Tests

### **If a test fails locally:**

1. **Read the error message** - Jest provides detailed error messages
2. **Check the test file** - Look at the specific test that failed
3. **Run in watch mode** - `npm run test:watch` for faster iteration
4. **Add console.log** - Debug by logging values in your test

### **If tests fail in GitHub Actions:**

1. Go to: https://github.com/saradcd77/sri-harivyas-website/actions
2. Click on the failed workflow
3. Click on "Run tests" step
4. Read the error logs
5. Fix the issue locally and push again

---

## 📊 Coverage Report

To see which parts of your code are tested:

```bash
npm run test:coverage
```

This generates a coverage report showing:
- **Lines covered** - Which lines of code are tested
- **Branches covered** - Which conditional paths are tested
- **Functions covered** - Which functions are tested

Coverage report is saved in: `coverage/lcov-report/index.html`

---

## 🎓 Best Practices

### **1. Test User Behavior, Not Implementation**
```typescript
// ❌ Bad - Testing implementation details
expect(component.state.count).toBe(5);

// ✅ Good - Testing user-visible behavior
expect(screen.getByText('Count: 5')).toBeInTheDocument();
```

### **2. Use Descriptive Test Names**
```typescript
// ❌ Bad
it('works', () => { ... });

// ✅ Good
it('displays error message when form is submitted with empty email', () => { ... });
```

### **3. Keep Tests Simple and Focused**
```typescript
// ❌ Bad - Testing multiple things
it('renders and handles clicks and validates form', () => { ... });

// ✅ Good - One test per behavior
it('renders the submit button', () => { ... });
it('handles button click', () => { ... });
it('validates email format', () => { ... });
```

### **4. Mock External Dependencies**
```typescript
// Mock API calls, i18n, external libraries
jest.mock('react-i18next');
jest.mock('next/router');
```

---

## 🚦 CI/CD Integration

### **GitHub Actions Workflow:**

The workflow (`.github/workflows/deploy-static.yml`) now includes:

```yaml
- name: Run linter
  run: npm run lint

- name: Run tests
  run: npm run test:ci

- name: Build static site
  run: npm run build
```

**Tests must pass before deployment!** 🛡️

---

## 📚 Resources

- **Jest Documentation**: https://jestjs.io/docs/getting-started
- **React Testing Library**: https://testing-library.com/docs/react-testing-library/intro/
- **Testing Best Practices**: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

---

## 🎉 Benefits

✅ **Catch bugs before deployment**  
✅ **Confidence in code changes**  
✅ **Prevent regressions**  
✅ **Better code quality**  
✅ **Documentation through tests**  
✅ **Faster development** (catch issues early)  

---

**राधेकृष्ण राधेकृष्ण कृष्णकृष्ण राधेराधे** 🙏

