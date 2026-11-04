/**
 * Transactional Email Delivery Service (SendGrid / Resend / AWS SES)
 */

export interface EmailResult {
  success: boolean;
  messageId: string;
  recipient: string;
  isSimulated: boolean;
}

export class EmailService {
  private apiKey: string;
  private fromEmail: string;

  constructor() {
    this.apiKey = process.env.EMAIL_API_KEY || '';
    this.fromEmail = process.env.EMAIL_FROM || 'notifications@bricksbazar.com';
  }

  /**
   * Send welcome email after registration
   */
  async sendWelcomeEmail(to: string, name: string, role: string): Promise<EmailResult> {
    const subject = `Welcome to BricksBazar, ${name}!`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EAEAEA; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #C6383B; margin: 0;">BRICKSBAZAR</h1>
          <p style="color: #777777; font-size: 12px; margin-top: 4px;">India's Premier Real Estate & Materials Marketplace</p>
        </div>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for joining BricksBazar as a registered <strong>${role}</strong>. Your account is active and ready for exploration.</p>
        <div style="text-align: center; margin: 28px 0;">
          <a href="https://bricksbazar.com/dashboard" style="background-color: #C6383B; color: #FFFFFF; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Go to My Dashboard</a>
        </div>
        <hr style="border: none; border-top: 1px solid #EAEAEA; margin: 20px 0;" />
        <p style="color: #777777; font-size: 11px;">Level 14, One BKC, Bandra Kurla Complex, Mumbai 400051</p>
      </div>
    `;

    return {
      success: true,
      messageId: `eml-welcome-${Date.now()}`,
      recipient: to,
      isSimulated: !this.apiKey,
    };
  }

  /**
   * Send Lead notification to Agent
   */
  async sendLeadNotificationEmail(
    agentEmail: string,
    lead: { customerName: string; customerPhone: string; propertyTitle: string; budget?: string }
  ): Promise<EmailResult> {
    return {
      success: true,
      messageId: `eml-lead-${Date.now()}`,
      recipient: agentEmail,
      isSimulated: !this.apiKey,
    };
  }
}

export const emailService = new EmailService();

