module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#f1b434',
        'gray100': '#777b83',
        'gray200': '#2a3037',
        'gray300': '#202a2b',
        'gray400': '#151515',
        'grayicon': '#949494',
        'grayword': '#ccc',

        'black100': '#bbb',
        'black200': '#111',
        'black300': '#181818',
        'black400': '#151515',
        'black500': '#171717',

        'lighticon': '#aeb5bd',
        'lightword': '#6d757d',
        'lightborder': '#e9ecef',
        'lightprimary': '#f8f9fa',
        'lighttable': '#212529',
        'lightbottom': '#edeffa',
        'lightsecond': '#fbfcfe',
        'lightitemtitle': '#111B36',
        'lightmoreword': '#6c757d',
        // 595c5f

        'border100': '#222',

        'white100': '#ebf0f6',
        'white200': '#f5f5f5',
        'white300': '#fafafa',

        'btndisable': '#888',

        'clickable': '#6ab5db'
      },
      spacing: {
        '100': '100rem'
      },
      minWidth: {
        '100': '80rem',
        '70': '60rem',

      },
      width: {
        '0.48': '48%'
      }
    },
    inset: {
      '1/10': '16%',
      '1/5': '20%',
    }
  },
  variants: {
    extend: {

      textOpacity: ['dark'],
      backgroundColor: ['dark'],
    },
  },
  plugins: [
  ],
}
