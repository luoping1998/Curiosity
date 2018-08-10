export const handleImg = (img) => {
	return 'data:image/png;base64,' + btoa(new Uint8Array(img).reduce((data, byte) => data + String.fromCharCode(byte), ''))
}

export const isPoneAvailable = (str) => {
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
	if (!myreg.test(str)) {
    	return false;
   	} else {
        return true;
    }
}
//判断密码
export const isPassAvailabel = (str) => {
	if(str.length < 6) {
		return false;
	}else {
		return true;
	}
}