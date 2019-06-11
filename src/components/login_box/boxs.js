
import React, { Component } from 'react';

//用户名登录box
export function UsernameBox(props) {
  const {
    username,
    pass,
    validateCode,
    handleUsernamein,
    handlePassin,
    handlevalidateCodein,
    getImgCode,
    codeSrc,
    loginWithu,
    toReg,
    toLogp
  } = props;

  return (
    <div className="box_log">
      <div className="box_input">
        <div className="icon log_icon"></div>
        <input type="text" placeholder="请输入用户名" value={username} onChange={handleUsernamein}/>
      </div>
      <div className="box_input">
        <div className="icon pass_icon"></div>
        <input type="password" placeholder="请输入密码" value={pass} onChange={handlePassin}/>
      </div>
      <div className="btn_input">
        <input type="text" placeholder="请输入验证码" value={validateCode} onChange={handlevalidateCodein}/>
        <div className="vcode" onClick={getImgCode}>
          <img src={codeSrc} />
        </div>
      </div>
      <p>
        <label><input type="checkbox"/>自动登录</label>
        <a href="javascript:">忘记密码?</a>
      </p>
      <a href="javascript:"><div className="btn" onClick={loginWithu}>登 录</div></a>
      <p className="center">
        <a href="javascript:" className="left" onClick={toLogp}>手机验证码登录</a>
        <a href="javascript:" className="right" onClick={toReg}>免费注册账号</a>
      </p>
    </div>
  )
}

//手机验证登录box
export function AccountBox(props) {
  const {
    account,
    vcode,
    getv,
    getVcode,
    toLoga,
    toReg,
    handleAccountin,
    handleVcodein,
  } = props;
  return (
    <div className="log_box">
      <div className="box_input">
        <div className="icon phone_icon"></div>
        <input type="text" placeholder="输入手机号" value={account} onChange={handleAccountin}/>
      </div>
      <div className="btn_input">
        <input type="text" placeholder="输入验证码" value={vcode} onChange={handleVcodein}/>
        {
          getv ? 
          (<div className="wait">请输入验证码</div>) :             
          (<a href="javascript:" onClick={getVcode}>获取验证码</a>)
        }
      </div>
      <p></p>
      <p></p>
      <a href="javascript:"><div className="btn">登录</div></a>
      <p className="center">
        <a href="javascript:" className="left" onClick={toLoga}>账号登录</a>
        <a href="javascript:" className="right" onClick={toReg}>免费注册账号</a>
      </p>
    </div>
  );
}

//注册box
export function RegBox(props){
  const {
    account,
    vcode,
    getv,
    getVcode,
    handleVcodein,
    handleAccountin,
    toSuc,
    toLogp,
    toLoga,
  } = props;
  return (
    <div className="reg_box">
      <div className="box_input">
        <div className="icon phone_icon"></div>
        <input type="text" placeholder="输入手机号" value={account} onChange={handleAccountin}/>
      </div>
      <div className="btn_input">
        <input type="text" placeholder="输入验证码" value={vcode} onChange={handleVcodein}/>
        {
          getv === false ? 
          (<a href="javascript:" onClick={getVcode}>获取验证码</a>) : 
          (<div className="wait">请输入验证码</div>)
        }
      </div>
      <p></p>
      <p></p>
      <a href="javascript:"><div className="btn" onClick={toSuc} >下一步</div></a>
      <p className="center">
        <a href="javascript:" className="left" onClick={toLogp}>手机验证码登录</a>
        <a href="javascript:" className="right" onClick={toLoga}> 账 号 登 录 </a>
      </p>
    </div>
  );
}

//注册验证成功后的box
export function SucBox(props) {
  const {
    username,
    register,
    passone,
    passtwo,
    commitone,
    committwo,
    handleUsernamein,
    handlePasstwo,
    handlePassone
  } = props;
  return (
    <div className="box_log">
      <div className="box_input">
        <div className="icon log_icon"></div>
        <input type="text" placeholder="输入用户名" value={username} onChange={handleUsernamein}/>
      </div>
      
      <div className="box_input">
        <div className={"commit_" + commitone.color} >{commitone.words}</div>
        <div className="icon pass_icon"></div>
        <input type="password" placeholder="输入密码" onChange={handlePassone} value={passone}/>
      </div>

      <div className="box_input">
        <div className={"commit_" + committwo.color} >{committwo.words}</div>
        <div className="icon pass_icon"></div>
        <input type="password" placeholder="确认密码" onChange={handlePasstwo} value={passtwo}/>
      </div>

      <p></p>
      <a href="javascript:"><div className="btn" onClick={register}>注册</div></a>
    </div>
  );
}