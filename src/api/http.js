import Axios from 'axios';

export default class http {
	/**
	 * 初始化 axios 对象
	 * @param {*} options 设置项
	 */
  init(options) {
    this.instance = Axios.create(Object.assign({}, options));
  }

	/**
	 * 注册时 验证验证码
	 * @param {*} deviceId 设备Id
	 * @param {*} validateCode 验证码
	 * @param {*} phoneNum 手机号
	 */
	veriFacate(deviceId, validateCode, phoneNum) {
		return this.instance.get('/sms/verificate', {
			headers: {
				deviceId,
				validateCode
			},
			params: {
				phoneNum
			}
		});
	}

	/**
	 * 获取验证码
	 * @param {*} deviceId 设备 Id
	 * @param {*} phoneNum 手机号
	 */
	getVcode(deviceId, phoneNum) {
		return this.instance.get('/code/phone', {
			headers: { deviceId },
			params: { phoneNum }
		})
	}

	/**
	 * 获取登录验证码
	 * @param {*} deviceId 设备Id
	 */
	getImgCode(deviceId) {
		return this.instance.get('code/image',{
			headers : {
				deviceId
			},
			responseType: 'arraybuffer'
		})
	}

	/**
	 * 登录
	 * @param {*} deviceId 设备Id
	 * @param {*} data 数据段
	 * @param {*} validateCode 验证码
	 */
	login(deviceId, data, validateCode) {
		const headers = {
			"Content-Type" : "application/json",
			"Authorization" : 'Basic YnJhbmNoOnhpeW91M2c=',
			deviceId,
			validateCode
		};

		return this.instance.post('/login', data, {	headers });
	}

	/**
	 * 注册
	 * @param {*} deviceId 设备 Id
	 * @param {*} data 数据段
	 * @param {*} key key
	 */
	register(deviceId, data, key) {
		const headers = {
			deviceId,
			key
		};
		return this.instance.post('/user/register', data, { headers });
	}
}