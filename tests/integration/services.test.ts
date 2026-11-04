import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { mapsService } from '../../src/services/maps.ts';
import { smsService } from '../../src/services/sms.ts';
import { paymentService } from '../../src/services/payment.ts';
import { storageService } from '../../src/services/storage.ts';
import { emailService } from '../../src/services/email.ts';

describe('Integration Service Abstractions', () => {
  test('mapsService resolves geocoding and computes distance accurately', async () => {
    const geo = await mapsService.geocode('Hill Road, Bandra West', 'Mumbai');
    assert.equal(geo.city, 'Mumbai');
    assert.ok(geo.coordinates.lat > 18 && geo.coordinates.lat < 20);
    assert.ok(geo.coordinates.lng > 72 && geo.coordinates.lng < 74);

    // Haversine distance between Bandra (19.0596, 72.8295) and Powai (19.1176, 72.9060)
    const dist = mapsService.calculateDistanceKm(
      { lat: 19.0596, lng: 72.8295 },
      { lat: 19.1176, lng: 72.906 }
    );
    assert.ok(dist >= 9 && dist <= 12, `Distance ${dist}km should be within 9-12km`);
  });

  test('smsService handles OTP dispatch in simulation mode', async () => {
    const res = await smsService.sendOtp('9820098200', '748291');
    assert.equal(res.success, true);
    assert.equal(res.recipientPhone, '9820098200');
    assert.ok(res.messageId.startsWith('sim-otp-') || res.messageId.startsWith('msg-'));
  });

  test('paymentService generates valid order with paise conversion', async () => {
    const order = await paymentService.createOrder({ amountINR: 25000 });
    assert.equal(order.amount, 2500000); // 25,000 INR = 2,500,000 paise
    assert.equal(order.currency, 'INR');
    assert.ok(order.orderId.startsWith('order_'));
  });

  test('storageService resolves S3 key and CDN URL path', async () => {
    const mockBuffer = Buffer.from('simulated-architectural-jpeg-data');
    const upload = await storageService.uploadFile(mockBuffer, 'living-room.jpg', 'image/jpeg');

    assert.ok(upload.url.includes('living-room.jpg'));
    assert.ok(upload.key.includes('properties/'));
    assert.equal(upload.sizeBytes, mockBuffer.length);
  });

  test('emailService formats welcome and lead notifications', async () => {
    const res = await emailService.sendWelcomeEmail('buyer@test.com', 'Anand Joshi', 'Buyer');
    assert.equal(res.success, true);
    assert.equal(res.recipient, 'buyer@test.com');
  });
});

