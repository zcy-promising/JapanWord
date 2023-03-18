<template>
  <div>
    <div id="all">

      <div class="word">
        <h1>{{JapaneseWord}}</h1>
      </div>

      <div class="imgclick">
        <div class="el-icon-apple" @click="speak()">发声
        </div>
        &nbsp;&nbsp;
        <div class="el-icon-apple" @click="swap()">{{start}}
        </div>
      </div>

      <div class="write">
        <el-input v-model="input"  placeholder="请输入内容"  @keyup.enter.native="toTorForNext()"></el-input>
        <div class="showTorF">
          <div class="el-icon-success" v-show="Tshow">
          </div>
          <div class="el-icon-error" v-show="Fshow">
          </div>
        </div>

      </div>



      <div class="button">
        <el-button type="primary" round @click="TorF()">确定</el-button>
        <el-button type="primary" round @click="getword()">下一个</el-button>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: 'demo',
  data() {
    return {
      JapaneseWord: "",
      start: "日->中",
      input: "",
      index: 0,
      WordList: [
        {
          Jword: "",
          Jspeak: "",
          Cword: ""
        }
      ],
      random: 0,
      Tshow: false,
      Fshow: false,
      swapflag: "JtoC",
    }
  },
  methods: {
    speak() {
      let audio = new Audio();
      audio.src = "http://dict.youdao.com/dictvoice?le=jap&type=3&audio=" + this.WordList[this.random].Jspeak;
      audio.play();
    },

    //下一个单词
    nextword() {
      this.Tshow = false;
      this.Fshow = false;
      var input=document.querySelector(".el-input__inner");
      input.style.border="1px solid CornflowerBlue";
      this.input = "";
      this.random = Math.floor(Math.random() * this.WordList.length);
      this.index = this.random;
      if (this.swapflag == "CtoJ") {
        this.JapaneseWord = this.WordList[this.random].Cword;
      } else {
        this.JapaneseWord = this.WordList[this.random].Jword;
      }

    },

    //获取单词
    getword() {
      this.$axios.get('./static/word.json').then(res => {
        this.toWordList(res.data.RECORDS);
      });
      this.Tshow = false;
      this.Fshow = false;
    },

    //给单词赋值
    toWordList(data) {
      this.WordList = data;
      this.nextword();
    },

    //判断是否正确
    TorF() {
      this.Tshow = false;
      this.Fshow = false;
      if (this.swapflag == "CtoJ") {
        if (this.input == this.WordList[this.index].Jword) {
          this.Tshow = true;
          var input=document.querySelector(".el-input__inner");
          input.style.border="2px solid MediumSpringGreen";
        } else {
          this.Fshow = true;
          var input=document.querySelector(".el-input__inner");
          input.style.border="2px solid red";
        }
      } else {
        if (this.input == this.WordList[this.index].Cword) {
          this.Tshow = true;
          var input=document.querySelector(".el-input__inner");
          input.style.border="2px solid MediumSpringGreen";
        } else {
          this.Fshow = true;
          var input=document.querySelector(".el-input__inner");
          input.style.border="2px solid red";
        }
      }

    },

    //输入框回车触发
    toTorForNext() {
      if (this.Tshow == false) {
        this.TorF();
      } else {
        this.nextword();
      }
    },

    //中日交换
    swap() {
      if (this.swapflag == "JtoC") {
        this.swapflag = "CtoJ";
        this.start = "中->日";
      } else {
        this.swapflag = "JtoC";
        this.start = "日->中";
      }
      this.nextword();
    },


  },
  created() {
    this.getword();
  },
  mounted() {
    //this.getword();
  }

}
</script>

<style >
#all {
  width: 550px;
  height: 600px;
  position: relative;
  margin: auto;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, .6);
  box-shadow: 2px 1px 19px rgba(0, 0, 0, .1);
  background-color: blanchedalmond;
}

.word {
  width: 100%;
  height: 200px;
  line-height: 300px;
}

.word h1 {
  text-align: center;
  font-size: 40px;
  text-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
}

.imgclick {
  display: inline-block;
  cursor: pointer;
}

.write .el-input__inner{
  outline: none;
  border: 1px solid;
  width: 300px;
  height: 50px;
  border-radius: 8px;
  font-size: 20px;
}

.button {
  position: relative;
  margin-top: 20px;
}

.write {
  margin-top: 20px;
}

.showTorF {
  position: absolute;
  font-size: 30px;
  left: 385px;
  bottom: 293px;
}
</style>
