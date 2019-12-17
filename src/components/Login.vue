<!--  -->
<template>
  <div
    class="login"
    v-show="isShow"
  >
    <div class="login-form">
      <h1>登录</h1>
      <el-radio-group
        v-model="label"
        size="small"
        class="radio"
      >
        <el-radio-button label="phone">手机号</el-radio-button>
        <el-radio-button label="email">邮箱</el-radio-button>
      </el-radio-group>
      <el-form
        :model="ruleForm"
        :rules="rules"
        status-icon
        ref="ruleForm"
      >
        <el-form-item
          :label="getLabelName"
          :prop="label"
        >
          <el-input
            @focus="handleClearValid"
            v-model="ruleForm[label]"
            :placeholder="'请填写'+getLabelName"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请填写密码"
            @focus="handleClearValid"
          ></el-input>
        </el-form-item>
        <el-button
          type="primary"
          class="btn"
          @click="submitForm('ruleForm')"
          @keyup.enter="submitForm('ruleForm')"
        >确认登录</el-button>
      </el-form>
      <i
        class="close el-icon-close"
        @click="resetForm"
      ></i>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import * as TYPES from "@/store/types";
import * as APIS from "@/api";
import { Message } from "element-ui";

export default {
  name: "login",
  data() {
    let validateUser = (rule, value, callback) => {
      let flag = false;
      if (value === "") {
        flag = "请输入";
      } else {
        let phoneReg = /^[1][3|4|5|7|8][0-9]{9}$/g;
        let emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/g;
        if (
          (this.label == "phone" && !phoneReg.test(value)) ||
          (this.label == "email" && !emailReg.test(value))
        ) {
          console.log(flag);
          flag = "请输入正确的";
        }
      }
      flag ? callback(new Error(`${flag + this.getLabelName}`)) : callback();
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "top",
      label: "phone",
      ruleForm: {
        phone: "",
        email: "",
        password: ""
      },
      rules: {
        phone: [{ validator: validateUser, trigger: "blur" }],
        email: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  computed: {
    getLabelName() {
      return this.label == "phone" ? "手机号" : "邮箱";
    },
    ...mapState({
      isShow: state => state.user.showLogin
    })
  },
  created() {
    // window.addEventListener("click", this.handleClose);
  },
  watch: {},
  methods: {
    submitForm(formName) {
      // 登录
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let fn = this.label == "phone" ? APIS.loginPhone : APIS.loginEmail;
          let res = await fn(this.ruleForm);
          if (res.code == 200) {
            this.resetForm();
            Message.success("登录成功");
            this[TYPES.MUTATIONS_SET_SHOW_LOGIN]();
            this[TYPES.MUTATIONS_SET_LOGIN_STATE]();
            this[TYPES.MUTATIONS_SET_LOGIN_INFO](res);
            const uid = res.account.id;
            let data = await Promise.all([
              APIS.loginStatus(),
              APIS.userInfo({ uid }),
              APIS.userPlayList({ uid })
            ]);
            console.log(data)
          } else {
            Message.error(res.message);
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      // 取消
      this[TYPES.MUTATIONS_SET_SHOW_LOGIN](false);
      // 重置表单
      this.$refs["ruleForm"].resetFields();
    },
    handleClose(e) {
      // 点击遮罩关闭
      if (this.isShow) {
        const isInclude = e.path.some(item => item.className == "login-form");
        const isLayout = e.path.some(item => item.className == "login");
        if (!isInclude && isLayout) {
          this.resetForm();
        }
      }
    },
    handleClearValid() {
      // 输入清空验证
      this.$refs["ruleForm"].clearValidate();
    },
    ...mapMutations([
      TYPES.MUTATIONS_SET_SHOW_LOGIN,
      TYPES.MUTATIONS_SET_LOGIN_STATE,
      TYPES.MUTATIONS_SET_LOGIN_INFO
    ])
  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    // window.removeEventListener("click", this.handleClose);
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.login {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  h1 {
    text-align: center;
    color: @theme-color;
  }
  .login-form {
    padding: 20px;
    background: #fff;
    width: 300px;
    border-radius: 5px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    .radio {
      width: 100%;
      /deep/ .el-radio-button {
        width: 50%;
        .el-radio-button__inner {
          width: 100%;
        }
      }
    }
    .btn {
      width: 100%;
      margin-top: 20px;
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      padding: 10px;
      cursor: pointer;
      font-size: 16px;
      &:hover {
        color: @theme-color;
      }
    }
  }
}
</style>