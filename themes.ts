import { createThemes, defaultComponentThemes } from '@tamagui/theme-builder'

const lightShadows = {
  shadow1: 'rgba(0,0,0,0.04)',
  shadow2: 'rgba(0,0,0,0.08)',
  shadow3: 'rgba(0,0,0,0.16)',
  shadow4: 'rgba(0,0,0,0.24)',
  shadow5: 'rgba(0,0,0,0.32)',
  shadow6: 'rgba(0,0,0,0.4)',
}

const darkShadows = {
  shadow1: 'rgba(0,0,0,0.2)',
  shadow2: 'rgba(0,0,0,0.3)',
  shadow3: 'rgba(0,0,0,0.4)',
  shadow4: 'rgba(0,0,0,0.5)',
  shadow5: 'rgba(0,0,0,0.6)',
  shadow6: 'rgba(0,0,0,0.7)',
}
const darkPalette = ['hsla(262, 43%, 1%, 1)', 'hsla(262, 43%, 6%, 1)', 'hsla(262, 43%, 12%, 1)', 'hsla(262, 43%, 17%, 1)', 'hsla(262, 43%, 23%, 1)', 'hsla(262, 43%, 28%, 1)', 'hsla(262, 43%, 34%, 1)', 'hsla(262, 43%, 39%, 1)', 'hsla(262, 43%, 45%, 1)', 'hsla(262, 43%, 50%, 1)', 'hsla(0, 15%, 93%, 1)', 'hsla(0, 15%, 99%, 1)']
const lightPalette = ['hsla(262, 43%, 70%, 1)', 'hsla(262, 43%, 68%, 1)', 'hsla(262, 43%, 66%, 1)', 'hsla(262, 43%, 63%, 1)', 'hsla(262, 43%, 61%, 1)', 'hsla(262, 43%, 59%, 1)', 'hsla(262, 43%, 57%, 1)', 'hsla(262, 43%, 54%, 1)', 'hsla(262, 43%, 52%, 1)', 'hsla(262, 43%, 50%, 1)', 'hsla(0, 15%, 15%, 1)', 'hsla(0, 15%, 1%, 1)']
const basePalette = [
  'hsla(186, 100%, 75%, 1)',
  'hsla(186, 100%, 68%, 1)',
  'hsla(186, 100%, 66%, 1)',
  'hsla(186, 100%, 63%, 1)',
  'hsla(186, 100%, 61%, 1)',
  'hsla(186, 100%, 59%, 1)',
  'hsla(186, 100%, 57%, 1)',
  'hsla(186, 100%, 55%, 1)',
  'hsla(186, 100%, 52%, 1)',
  'hsla(186, 100%, 34%, 1)',
  'hsla(0, 15%, 15%, 1)',
  'hsla(0, 15%, 1%, 1)'];

const builtThemes = createThemes({
  componentThemes: defaultComponentThemes,

  base: {
    palette: {
      light: lightPalette,
      dark: basePalette,
    },
  },
})

export type Themes = typeof builtThemes

// the process.env conditional here is optional but saves web client-side bundle
// size by leaving out themes JS. tamagui automatically hydrates themes from CSS
// back into JS for you, and the bundler plugins set TAMAGUI_ENVIRONMENT. so
// long as you are using the Vite, Next, Webpack plugins this should just work,
// but if not you can just export builtThemes directly as themes:
// export const themes: Themes =
//   process.env.TAMAGUI_ENVIRONMENT === 'client' &&
//   process.env.NODE_ENV === 'production'
//     ? ({} as any)
//     : (builtThemes as any)
export const themes: Themes = builtThemes as any;