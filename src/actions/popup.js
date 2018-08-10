//显示成功弹窗
export const showSucPopup = mess => ({
	type: 'SHOW_SUCPOP',
	mess
})

//显示失败弹窗
export const showFailPopup = mess => ({
	type: 'SHOW_FAILPOP',
	mess
})

//隐藏弹框
export const hiddenPopup = cont => ({
	type: 'HIDDEN_POPUP',
	cont
})
