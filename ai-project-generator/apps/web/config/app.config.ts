export const APP_CONFIG = {
  name: 'AI Project Generator',
  description: 'Generate production-ready starter templates with AI',
  version: '1.0.0',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
  enableAI: process.env.NEXT_PUBLIC_ENABLE_AI !== 'false',
  enableMarketplace: process.env.NEXT_PUBLIC_ENABLE_MARKETPLACE !== 'false',
  enableBilling: process.env.NEXT_PUBLIC_ENABLE_BILLING !== 'false',
};
