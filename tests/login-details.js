const { describe, test, expect } = require('@jest/globals');

/**
 * Account Number Validation Module
 * Validates account numbers based on various rules
 */

// Validation Rules:
// - Must be numeric only (no letters, special characters)
// - Length: 8-16 digits
// - Cannot be all zeros
// - Cannot be sequential (e.g., 12345678)
// - Checksum validation (simple: sum of digits must be > 10)

class AccountValidator {
  static validateAccountNumber(accountNumber) {
    const errors = [];

    // Check if empty or null
    if (!accountNumber || accountNumber === '' || accountNumber === null) {
      errors.push('Account number cannot be empty');
      return { isValid: false, errors };
    }

    // Check if string
    if (typeof accountNumber !== 'string' && typeof accountNumber !== 'number') {
      errors.push('Account number must be a string or number');
      return { isValid: false, errors };
    }

    // Convert to string if number
    const accountStr = accountNumber.toString().trim();

    // Check if numeric only (no letters or special chars)
    if (!/^\d+$/.test(accountStr)) {
      errors.push('Account number must contain only digits (0-9)');
      return { isValid: false, errors };
    }

    // Check length (8-16 digits)
    if (accountStr.length < 8) {
      errors.push('Account number must be at least 8 digits');
      return { isValid: false, errors };
    }

    if (accountStr.length > 16) {
      errors.push('Account number cannot exceed 16 digits');
      return { isValid: false, errors };
    }

    // Check if all zeros
    if (/^0+$/.test(accountStr)) {
      errors.push('Account number cannot be all zeros');
      return { isValid: false, errors };
    }

    // Check if sequential (e.g., 12345678, 23456789)
    if (this.isSequential(accountStr)) {
      errors.push('Account number cannot be sequential digits');
      return { isValid: false, errors };
    }

    // Checksum validation (sum of digits > 10)
    const digitSum = accountStr.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    if (digitSum <= 10) {
      errors.push('Account number checksum invalid (sum of digits must be > 10)');
      return { isValid: false, errors };
    }

    return { isValid: true, errors: [] };
  }

  static isSequential(str) {
    for (let i = 0; i < str.length - 1; i++) {
      const current = parseInt(str[i]);
      const next = parseInt(str[i + 1]);
      if (next !== current + 1) {
        return false;
      }
    }
    return true;
  }

  static validateAccountId(accountId) {
    const errors = [];

    // Check if empty
    if (!accountId || accountId === '') {
      errors.push('Account ID cannot be empty');
      return { isValid: false, errors };
    }

    // Check format: must be alphanumeric (letters, digits, underscores)
    if (!/^[a-zA-Z0-9_-]+$/.test(accountId)) {
      errors.push('Account ID must contain only letters, numbers, hyphens, or underscores');
      return { isValid: false, errors };
    }

    // Check length
    if (accountId.length < 3) {
      errors.push('Account ID must be at least 3 characters');
      return { isValid: false, errors };
    }

    if (accountId.length > 32) {
      errors.push('Account ID cannot exceed 32 characters');
      return { isValid: false, errors };
    }

    return { isValid: true, errors: [] };
  }
}

// ─── Account Number Validation Tests ─────────────────────────────────────────

describe('Account Number Validation', () => {
  
  // ─── Valid Account Numbers ──────────────────────────────────────────────
  describe('Valid Account Numbers', () => {
    test('Should validate standard 8-digit account number', () => {
      const result = AccountValidator.validateAccountNumber('12345679');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('Should validate 10-digit account number', () => {
      const result = AccountValidator.validateAccountNumber('1234567890');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('Should validate 16-digit account number (max length)', () => {
      const result = AccountValidator.validateAccountNumber('1234567890123456');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('Should accept account number as number type', () => {
      const result = AccountValidator.validateAccountNumber(12345679);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('Should trim whitespace and validate', () => {
      const result = AccountValidator.validateAccountNumber('  12345679  ');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('Should validate account number with high digit sum', () => {
      const result = AccountValidator.validateAccountNumber('99999999');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  // ─── Invalid - Empty/Null ────────────────────────────────────────────────
  describe('Empty or Null Account Numbers', () => {
    test('Should reject empty string', () => {
      const result = AccountValidator.validateAccountNumber('');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number cannot be empty');
    });

    test('Should reject null value', () => {
      const result = AccountValidator.validateAccountNumber(null);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number cannot be empty');
    });

    test('Should reject undefined value', () => {
      const result = AccountValidator.validateAccountNumber(undefined);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number cannot be empty');
    });
  });

  // ─── Invalid - Non-Numeric ──────────────────────────────────────────────
  describe('Non-Numeric Account Numbers', () => {
    test('Should reject account number with letters', () => {
      const result = AccountValidator.validateAccountNumber('123ABC456');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number must contain only digits (0-9)');
    });

    test('Should reject account number with special characters', () => {
      const result = AccountValidator.validateAccountNumber('123@456#789');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number must contain only digits (0-9)');
    });

    test('Should reject account number with spaces', () => {
      const result = AccountValidator.validateAccountNumber('123 456 789');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number must contain only digits (0-9)');
    });

    test('Should reject account number with hyphens', () => {
      const result = AccountValidator.validateAccountNumber('123-456-789');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number must contain only digits (0-9)');
    });

    test('Should reject account number with dots', () => {
      const result = AccountValidator.validateAccountNumber('123.456.789');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number must contain only digits (0-9)');
    });
  });

  // ─── Invalid - Length ───────────────────────────────────────────────────
  describe('Invalid Length Account Numbers', () => {
    test('Should reject account number with less than 8 digits', () => {
      const result = AccountValidator.validateAccountNumber('1234567');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number must be at least 8 digits');
    });

    test('Should reject single digit account number', () => {
      const result = AccountValidator.validateAccountNumber('5');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number must be at least 8 digits');
    });

    test('Should reject account number exceeding 16 digits', () => {
      const result = AccountValidator.validateAccountNumber('12345678901234567');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number cannot exceed 16 digits');
    });

    test('Should reject 20-digit account number', () => {
      const result = AccountValidator.validateAccountNumber('12345678901234567890');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number cannot exceed 16 digits');
    });
  });

  // ─── Invalid - All Zeros ────────────────────────────────────────────────
  describe('All Zeros Account Numbers', () => {
    test('Should reject 8 zeros', () => {
      const result = AccountValidator.validateAccountNumber('00000000');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number cannot be all zeros');
    });

    test('Should reject 10 zeros', () => {
      const result = AccountValidator.validateAccountNumber('0000000000');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number cannot be all zeros');
    });

    test('Should reject 16 zeros', () => {
      const result = AccountValidator.validateAccountNumber('0000000000000000');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number cannot be all zeros');
    });
  });

  // ─── Invalid - Sequential Digits ────────────────────────────────────────
  describe('Sequential Digit Account Numbers', () => {
    test('Should reject ascending sequential: 12345678', () => {
      const result = AccountValidator.validateAccountNumber('12345678');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number cannot be sequential digits');
    });

    test('Should reject ascending sequential: 23456789', () => {
      const result = AccountValidator.validateAccountNumber('23456789');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number cannot be sequential digits');
    });

    test('Should reject ascending sequential: 34567890', () => {
      const result = AccountValidator.validateAccountNumber('34567890');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number cannot be sequential digits');
    });

    test('Should allow non-sequential: 12344321', () => {
      const result = AccountValidator.validateAccountNumber('12344321');
      expect(result.isValid).toBe(true);
    });
  });

  // ─── Invalid - Checksum ──────────────────────────────────────────────────
  describe('Checksum Validation', () => {
    test('Should reject when digit sum equals 10', () => {
      // 1+0+0+0+0+0+0+9 = 10 (not > 10)
      const result = AccountValidator.validateAccountNumber('10000009');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number checksum invalid (sum of digits must be > 10)');
    });

    test('Should reject when digit sum is less than 10', () => {
      // 1+0+0+0+0+0+0+1 = 2
      const result = AccountValidator.validateAccountNumber('10000001');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number checksum invalid (sum of digits must be > 10)');
    });

    test('Should accept when digit sum is 11', () => {
      // 2+0+0+0+0+0+0+9 = 11 (> 10)
      const result = AccountValidator.validateAccountNumber('20000009');
      expect(result.isValid).toBe(true);
    });

    test('Should accept when digit sum is very high', () => {
      // 9+9+9+9+9+9+9+9 = 72
      const result = AccountValidator.validateAccountNumber('99999999');
      expect(result.isValid).toBe(true);
    });
  });

  // ─── Type Validation ────────────────────────────────────────────────────
  describe('Type Validation', () => {
    test('Should reject boolean type', () => {
      const result = AccountValidator.validateAccountNumber(true);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number must be a string or number');
    });

    test('Should reject object type', () => {
      const result = AccountValidator.validateAccountNumber({});
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number must be a string or number');
    });

    test('Should reject array type', () => {
      const result = AccountValidator.validateAccountNumber([1, 2, 3]);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account number must be a string or number');
    });
  });
});

// ─── Account ID Validation Tests ────────────────────────────────────────────

describe('Account ID Validation', () => {
  
  describe('Valid Account IDs', () => {
    test('Should validate simple alphanumeric ID', () => {
      const result = AccountValidator.validateAccountId('user001');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('Should validate ID with underscores', () => {
      const result = AccountValidator.validateAccountId('standard_user');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('Should validate ID with hyphens', () => {
      const result = AccountValidator.validateAccountId('user-001');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('Should validate ID with mixed case', () => {
      const result = AccountValidator.validateAccountId('User_Account_001');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('Should validate max length (32 chars) ID', () => {
      const result = AccountValidator.validateAccountId('a'.repeat(32));
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Invalid Account IDs', () => {
    test('Should reject empty ID', () => {
      const result = AccountValidator.validateAccountId('');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account ID cannot be empty');
    });

    test('Should reject ID shorter than 3 characters', () => {
      const result = AccountValidator.validateAccountId('ab');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account ID must be at least 3 characters');
    });

    test('Should reject ID exceeding 32 characters', () => {
      const result = AccountValidator.validateAccountId('a'.repeat(33));
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account ID cannot exceed 32 characters');
    });

    test('Should reject ID with special characters', () => {
      const result = AccountValidator.validateAccountId('user@account');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account ID must contain only letters, numbers, hyphens, or underscores');
    });

    test('Should reject ID with spaces', () => {
      const result = AccountValidator.validateAccountId('user account');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Account ID must contain only letters, numbers, hyphens, or underscores');
    });
  });
});

module.exports = AccountValidator;
