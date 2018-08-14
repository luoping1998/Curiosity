export const exec = ( command, value = null) => {
	document.execCommand(command, false, value);
}

export const qcstate = ( command ) => document.queryCommandState(command)