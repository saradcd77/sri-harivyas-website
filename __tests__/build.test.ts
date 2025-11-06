/**
 * Build Validation Tests
 * These tests ensure the build configuration is correct
 */

import packageJson from '../package.json';
import tsconfig from '../tsconfig.json';

describe('Build Configuration', () => {
  it('should have valid package.json', () => {
    expect(packageJson.name).toBe('ashram-website');
    expect(packageJson.scripts.build).toBeDefined();
    expect(packageJson.scripts.dev).toBeDefined();
    expect(packageJson.scripts.start).toBeDefined();
  });

  it('should have required dependencies', () => {
    // Check for critical dependencies
    expect(packageJson.dependencies.next).toBeDefined();
    expect(packageJson.dependencies.react).toBeDefined();
    expect(packageJson.dependencies['react-dom']).toBeDefined();
  });

  it('should have required dev dependencies', () => {
    // Check for dev dependencies
    expect(packageJson.devDependencies.typescript).toBeDefined();
    expect(packageJson.devDependencies.tailwindcss).toBeDefined();
  });
});

describe('Environment Configuration', () => {
  it('should have valid tsconfig', () => {
    expect(tsconfig.compilerOptions).toBeDefined();
    expect(tsconfig.compilerOptions.strict).toBe(true);
  });
});

