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

//转化
export const changeStyle = (index) => {
	let style = {
		color : '',
		words : ''
	} 
	switch (index) {
		case 'FantasySentiment':
		case 0 :
			style.color = '#6f60aa'
			style.words = '玄幻言情'
			break;
		case 'ImmortalChivalry':
		case 1 : 
			style.color = '#009ad6'
			style.words = '仙侠言情'
			break;
		case 'AncientSentiment':
		case 2 : 
			style.color = '#f391a9'
			style.words = '古代言情'
			break;
		case 'ModernSentiment':
		case 3 : 
			style.color = '#ed1941'
			style.words = '现代言情'
			break;
		case 'RomanticYouth':
		case 4 : 
			style.color = '#f05b72'
			style.words = '浪漫青春'
			break;
		case 'SuspensePsychic':
		case 5 : 
			style.color = '#121a2a'
			style.words = '悬疑灵异'
			break;
		case 'ScienceSpace':
		case 6 : 
			style.color = '#7bbfea'
			style.words = '科幻空间'
			break;
		case 'GameCompetition':
		case 7 : 
			style.color = '#fdb933'
			style.words = '游戏竞技'
			break;
		case 'TanbiNovel':
		case 8 : 
			style.color = '#65c294'
			style.words = '耽美小说'
			break;
	}
	return style
}