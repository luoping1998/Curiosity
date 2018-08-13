import { exec } from './exec.js'
const actions = {
	bold: {
		icon:'<b>B</b>',
		title: 'Bold',
		result: () => exec('bold')
	},
	italic: {
		icon: '<i>I</i>',
		title: 'Italic',
		result: () => exec('italic')
	},
	underline: {
		icon: '<u>U</u>',
		title: 'Underline',
		result: () => exec('underline')
	}
}

export default actions