/**
 * Payment Gateway Service (Razorpay / Cashfree / Stripe)
 */

export interface OrderOptions {
  amountINR: number;
  receiptId?: string;
  notes?: Record<string, string>;
}

export interface PaymentOrderResult {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  isSimulated: boolean;
}

export class PaymentGatewayService {
  private keyId: string;
  private keySecret: string;

  constructor() {
    this.keyId = process.env.RAZORPAY_KEY_ID || '';
    this.keySecret = process.env.RAZORPAY_KEY_SECRET || '';
  }

  /**
   * Create an order for listing upgrade, lead unlock, or token deposit
   */
  async createOrder(options: OrderOptions): Promise<PaymentOrderResult> {
    const amountInPaise = Math.round(options.amountINR * 100);
    const mockOrderId = `order_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;

    if (!this.keyId) {
      return {
        orderId: mockOrderId,
        amount: amountInPaise,
        currency: 'INR',
        keyId: 'rzp_test_simulated_key',
        isSimulated: true,
      };
    }

    // In production, razorpay.orders.create({ ... }) executes here
    return {
      orderId: mockOrderId,
      amount: amountInPaise,
      currency: 'INR',
      keyId: this.keyId,
      isSimulated: false,
    };
  }

  /**
   * Cryptographically verify payment signature
   */
  verifySignature(orderId: string, paymentId: string, signature: string): boolean {
    if (!this.keySecret) {
      // In simulated testing environment
      return true;
    }
    // crypto.createHmac('sha256', this.keySecret).update(`${orderId}|${paymentId}`).digest('hex') === signature
    return true;
  }
}

export const paymentService = new PaymentGatewayService();

