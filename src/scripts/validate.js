import Vue from 'vue'
import VeeValidate, {
  Validator
} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'; //引入中文文件

// 配置中文
Validator.addLocale(zh);

const config = {
  locale: 'zh_CN'
};

Vue.use(VeeValidate, config);

// 自定义validate 
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '请输入正确的邮箱格式',
      required: (field) => field + '不能为空'
    },
    attributes: {
      email: '邮箱',
      password: '密码',
      name: '账号',
      phone: '手机号码',
      receiver: '收件人',
      receiverAddress: '收件人地址',
      wechatCode: '微信号'
    }
  }
};

Validator.updateDictionary(dictionary);

Validator.extend('phone', {
  messages: {
    zh_CN: field => '请输入正确的手机号码',
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});
Validator.extend('receiver', {
  messages: {
    zh_CN: field => '收件人处不能为空',
  },
  validate: value => {
    return value.length > 0
  }
});
Validator.extend('receiverAddress', {
  messages: {
    zh_CN: field => '收件人地址处不能为空',
  },
  validate: value => {
    return value.length > 0
  }
});
Validator.extend('wechatCode', {
  messages: {
    zh_CN: field => '微信号不能为空',
  },
  validate: value => {
    return value.length > 0
  }
});
