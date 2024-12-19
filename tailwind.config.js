module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        '#313131': '#313131',
        '#EAAE36': '#EAAE36',
        '#A5A5A5': '#A5A5A5',
        '#00FFEA': '#00FFEA',
        '#282828': '#282828',
        '#303030': '#303030',
        '#1F1F1F': '#1F1F1F',
        '#846934': '#846934',
        '#FFD667': '#FFD667',
        '#525251': '#525251',
        '#E4E4E4': '#E4E4E4',
        '#747474': '#747474',
        '#FFFFFF73': '#FFFFFF73',
        '#00000061': '#00000061',
        '#C2B9D01E': '#C2B9D01E',
        '#A5A5A536': '#A5A5A536',
        '#00000088': '#00000088',
        '#E6E6E620': '#E6E6E620',
        '#EAAE361E': '#EAAE361E',


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
