/**
 * @Description 公共校验集
 */
const validate = {};

/**
 * @description 验证手机号规则
 * 使用前须知
 * 先参考 [async-validator](https://github.com/yiminghe/async-validator)
 * 已封装大部分验证规则 包括 number url email min max len
 * 如无法实现再写自定义验证
 */
validate.validatePhone = (rule, value, callback) => {
  if (value && !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
    return callback(new Error('手机号格式不正确'))
  } else {
    callback()
  }
}
/**
 * @description 身份证
 */
validate.validateIDCard = (rule, value, callback) => {
  if (value && !/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(value)) {
    return callback(new Error('请输入正确的身份证号'))
  } else if (!value) {
    return callback(new Error('请输入身份证号'))
  } else {
    callback()
  }
}

/**
 * @description ip
 */
validate.validateIP = (rule, value, callback) => {
  if (value && !/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value)) {
    return callback(new Error('请输入正确的ip'))
  } else {
    callback()
  }
}

/**
 * @description 数组中前一个值大于后一个值
 */
validate.validateArraySize = (rule, value, callback) => {
  let myreg = /^[0-9]\d{0,3}$/;
  if(value.length){
    if(value.length !== 2){
      return callback(new Error('请输入数值范围'))
    }else {
      if(parseInt(value[1]) <= parseInt(value[0])){
        return callback(new Error('第一个值小于第二个值'))
      }else {
        if(!myreg.test(value[0]) || !myreg.test(value[1])){
          return callback(new Error('数值限定4位且大于0'))
        }else{
          callback()
        }
      }
    }
  }else {
    callback()
  }
}

/**
 * @Description 校验三位整数，一位小数
 * @param  {String} 校验的数值
 */
validate.threeIntegersOneDecimal = (str) => {
  let reg = /^\d{1,3}(\.\d{1})?$/;
  return reg.test(str);
};

/**
 * @Description 校验四位整数，两位小数且
 * @param  {String} 校验的数值
 */
validate.fourIntegersTwoDecimal = (str) => {
  let reg = /^\d{1,4}(\.\d{1, 2})?$/;
  return reg.test(str);
};


export default validate
