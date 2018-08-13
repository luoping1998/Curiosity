export const exec = ( command, value = null) => {
	document.execCommand(command, false, value);
}