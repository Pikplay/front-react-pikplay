export default {
  // API_URL: 'http://localhost:3000', // process.env.API_URL,
  API_URL: 'http://localhost/api',
  IS_MOBILE: typeof window !== "undefined" ? window.screen.width <= 420 : false,
  IS_TABLET: typeof window !== 'undefined' ? window.screen.width <= 768 : false,
  IS_ADMIN: false,
}

export const IS_MOBILE = typeof window !== 'undefined' ? window.screen.width <= 420 : false
