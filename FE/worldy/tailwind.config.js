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
    },
  },
  plugins: [],
  devServer: {
    disableHostCheck: true
  },
};
