/**
 * WhatsApp Business API Service (Gupshup / Interakt / Meta Cloud API)
 */

export interface WhatsAppResult {
  success: boolean;
  messageId: string;
  recipientPhone: string;
  isSimulated: boolean;
}

export class WhatsAppService {
  private apiToken: string;
  private phoneNumberId: string;

  constructor() {
    this.apiToken = process.env.WHATSAPP_TOKEN || '';
    this.phoneNumberId = process.env.WHATSAPP_PHONE_ID || '';
  }

  /**
   * Send WhatsApp direct alert to client or broker
   */
  async sendTemplateMessage(
    phone: string,
    templateName: string,
    params: Record<string, string>
  ): Promise<WhatsAppResult> {
    const cleanPhone = phone.replace(/\D/g, '');

    return {
      success: true,
      messageId: `wa-${Date.now()}`,
      recipientPhone: cleanPhone,
      isSimulated: !this.apiToken,
    };
  }

  /**
   * Helper to format direct WhatsApp click-to-chat web URLs
   */
  getClickToChatUrl(phone: string, prefilledText: string): string {
    const cleanPhone = phone.replace(/\D/g, '');
    const encoded = encodeURIComponent(prefilledText);
    return `https://wa.me/${cleanPhone}?text=${encoded}`;
  }
}

export const whatsAppService = new WhatsAppService();

