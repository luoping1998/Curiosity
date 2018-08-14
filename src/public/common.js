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
		words : '',
		trans : ''

	} 
	switch (index) {
		case 'FantasySentiment':
		case '玄幻言情':
		case 0 :
			style.color = '#6f60aa'
			style.words = '玄幻言情'
			style.trans = 'FantasySentiment'
			break;

		case 'ImmortalChivalry':
		case '仙侠言情':
		case 1 : 
			style.color = '#009ad6'
			style.words = '仙侠言情'
			style.trans = 'ImmortalChivalry'
			break;

		case 'AncientSentiment':
		case '古代言情':
		case 2 : 
			style.color = '#f391a9'
			style.words = '古代言情'
			style.trans = 'AncientSentiment'
			break;

		case 'ModernSentiment':
		case '现代言情':
		case 3 : 
			style.color = '#ed1941'
			style.words = '现代言情'
			style.trans = 'ModernSentiment'
			break;

		case 'RomanticYouth':
		case '浪漫青春':
		case 4 : 
			style.color = '#f05b72'
			style.words = '浪漫青春'
			style.trans = 'RomanticYouth'
			break;

		case 'SuspensePsychic':
		case '悬疑灵异':
		case 5 : 
			style.color = '#121a2a'
			style.words = '悬疑灵异'
			style.trans = 'SuspensePsychic'
			break;

		case 'ScienceSpace':
		case '科幻空间':
		case 6 : 
			style.color = '#7bbfea'
			style.words = '科幻空间'
			style.trans = 'ScienceSpace'
			break;

		case 'GameCompetition':
		case '游戏竞技':
		case 7 : 
			style.color = '#fdb933'
			style.words = '游戏竞技'
			style.trans = 'GameCompetition'
			break;
			
		case 'TanbiNovel':
		case '耽美小说':
		case 8 : 
			style.color = '#65c294'
			style.words = '耽美小说'
			style.trans = 'TanbiNovel'
			break;
	}
	return style
}