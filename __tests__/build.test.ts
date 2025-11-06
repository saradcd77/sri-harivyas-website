/**
 * Build Validation Tests
 * These tests ensure the build configuration is correct
 */

describe('Build Configuration', () => {
  it('should have valid package.json', () => {
    const packageJson = require('../package.json');
    
    expect(packageJson.name).toBe('ashram-website');
    expect(packageJson.scripts.build).toBeDefined();
    expect(packageJson.scripts.dev).toBeDefined();
    expect(packageJson.scripts.start).toBeDefined();
  });

  it('should have required dependencies', () => {
    const packageJson = require('../package.json');
    
    // Check for critical dependencies
    expect(packageJson.dependencies.next).toBeDefined();
    expect(packageJson.dependencies.react).toBeDefined();
    expect(packageJson.dependencies['react-dom']).toBeDefined();
  });

  it('should have required dev dependencies', () => {
    const packageJson = require('../package.json');
    
    // Check for dev dependencies
    expect(packageJson.devDependencies.typescript).toBeDefined();
    expect(packageJson.devDependencies.tailwindcss).toBeDefined();
  });
});

describe('Environment Configuration', () => {
  it('should have valid next.config', () => {
    // This test ensures next.config.ts exists and is valid
    expect(() => {
      require('../next.config.ts');
    }).not.toThrow();
  });

  it('should have valid tsconfig', () => {
    const tsconfig = require('../tsconfig.json');
    
    expect(tsconfig.compilerOptions).toBeDefined();
    expect(tsconfig.compilerOptions.strict).toBe(true);
  });
});

