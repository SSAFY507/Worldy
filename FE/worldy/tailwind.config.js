module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        buttonRed: '#ff4d45',
        behindModalBackground: 'rgba(0,0,0,0.5)',
      },
      fontFamily: {
        PtdBlack: ['Ptd-Black', 'sans-serif'],
        PtdBold: ['Ptd-Bold', 'sans-serif'],
        PtdExtraBold: ['Ptd-ExtraBold', 'sans-serif'],
        PtdExtraLight: ['Ptd-ExtraLight', 'sans-serif'],
        PtdLight: ['Ptd-Light', 'sans-serif'],
        PtdMedium: ['Ptd-Medium', 'sans-serif'],
        PtdRegular: ['Ptd-Regular', 'sans-serif'],
        PtdSemiBOld: ['Ptd-SemiBold', 'sans-serif'],
        PtdThin: ['Ptd-Thin', 'sans-serif'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(-9deg)' },
        },
      },
      
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
