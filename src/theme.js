// theme.js
import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    brand: {
      50: '#fff5db',
      100: '#ffe8b3',
      200: '#ffd980',
      300: '#ffcb4d',
      400: '#fcbf1c',
      500: '#fcd144', // Base color
      600: '#cba236',
      700: '#997827',
      800: '#664e19',
      900: '#33270c',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'black',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
        ghost: {
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
  },
});

export default customTheme;
