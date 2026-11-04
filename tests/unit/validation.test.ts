import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

describe('Indian Regulatory & Input Validation Rules', () => {
  const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;
  const INDIAN_PINCODE_REGEX = /^[1-9]\d{5}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MAHARERA_AGENT_REGEX = /^A[0-9]{11}$/;
  const MAHARERA_PROJECT_REGEX = /^P[0-9]{11}$/;

  test('Indian 10-Digit Mobile Numbers validate strictly', () => {
    // Valid numbers starting with 6, 7, 8, 9
    assert.ok(INDIAN_PHONE_REGEX.test('9820098200'));
    assert.ok(INDIAN_PHONE_REGEX.test('8828828828'));
    assert.ok(INDIAN_PHONE_REGEX.test('7738012345'));
    assert.ok(INDIAN_PHONE_REGEX.test('6290123456'));

    // Invalid numbers
    assert.equal(INDIAN_PHONE_REGEX.test('5551234567'), false); // Starts with 5
    assert.equal(INDIAN_PHONE_REGEX.test('982009820'), false); // 9 digits
    assert.equal(INDIAN_PHONE_REGEX.test('98200982000'), false); // 11 digits
    assert.equal(INDIAN_PHONE_REGEX.test('98200ABC00'), false); // Alphanumeric
  });

  test('Indian 6-digit PIN codes validate strictly', () => {
    // Valid
    assert.ok(INDIAN_PINCODE_REGEX.test('400050')); // Bandra
    assert.ok(INDIAN_PINCODE_REGEX.test('411045')); // Baner Pune
    assert.ok(INDIAN_PINCODE_REGEX.test('560001')); // Bengaluru
    assert.ok(INDIAN_PINCODE_REGEX.test('110001')); // Delhi

    // Invalid
    assert.equal(INDIAN_PINCODE_REGEX.test('010001'), false); // Starts with 0
    assert.equal(INDIAN_PINCODE_REGEX.test('40005'), false); // 5 digits
    assert.equal(INDIAN_PINCODE_REGEX.test('4000501'), false); // 7 digits
  });

  test('Email address validation conforms to standard format', () => {
    assert.ok(EMAIL_REGEX.test('vikram@bricksbazar.com'));
    assert.ok(EMAIL_REGEX.test('priya.sharma@domain.co.in'));
    assert.equal(EMAIL_REGEX.test('plainaddress'), false);
    assert.equal(EMAIL_REGEX.test('missing@domain'), false);
  });

  test('MahaRERA Registration Number patterns validate accurately', () => {
    // MahaRERA Agent format: A + 11 digits
    assert.ok(MAHARERA_AGENT_REGEX.test('A51900028941'));
    assert.ok(MAHARERA_AGENT_REGEX.test('A52100034821'));
    assert.equal(MAHARERA_AGENT_REGEX.test('A51900'), false); // Too short

    // MahaRERA Project format: P + 11 digits
    assert.ok(MAHARERA_PROJECT_REGEX.test('P51900001339'));
    assert.ok(MAHARERA_PROJECT_REGEX.test('P51800000147'));
    assert.equal(MAHARERA_PROJECT_REGEX.test('P51800'), false);
  });
});

