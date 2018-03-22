<template>
    <div>
        <div>收费：
            <checker v-model="cost" class="select" default-item-class="default_select" selected-item-class="select-item">
                <checker-item value="1">玩家AA付费</checker-item>
                <checker-item value="2">俱乐部老板付费</checker-item>
            </checker>
        </div>
        <div>局数：
            <checker v-model="turns" class="select" default-item-class="default_select" selected-item-class="select-item">
                <checker-item v-for="item in endCost" value="item.turn">{{item.turn}}局(房卡X{{item.cost}})</checker-item>
            </checker>
        </div>
        <div id="table">
        </div>
    </div>
</template>

<script>
import { Checker, CheckerItem } from "vux";
import qs from "qs";
import axios from "axios";
var lua = require("lua.vm.js");
export default {
  data() {
    return {
      gameId: "",
      cost: "1",
      turns: "",
      myCost: [],
      aaCost: []
    };
  },
  components: {
    Checker,
    CheckerItem
  },
  computed: {
    endCost() {
      return this.cost === "1" ? this.myCost : this.aaCost;
    }
  },
  created() {
    let thisHref = location.href;
    this.gameId = thisHref.split("?")[1].split("=")[1];
    console.log(this.gameId);
    console.log(location.href);
    window.gameid = this.gameId;
    axios
      .post(
        "/index.php/Mobile/Clubnew/getinfo",
        qs.stringify({
          activityId: this.gameId
        })
      )
      .then(res => {
        let data = res.data;
        if (data.code === 1) {
          let result = data.data;
          let cost = JSON.parse(result.cost);
          for (const key in cost) {
            if (cost.hasOwnProperty(key)) {
              const item = cost[key];
              if (key.indexOf("AA") > -1) {
                console.log(key);
                this.aaCost.push({
                  turn: key.split("AA")[1],
                  cost: cost[key]
                });
              } else {
                this.myCost.push({
                  turn: key,
                  cost: cost[key]
                });
              }
            }
          }
        }
      });
  },
  mounted() {
    //导入lua代码
    const s1 = document.createElement("script");
    s1.type = "text/lua";
    // s1.src = "/Public/gamerule.lua";
    // document.body.appendChild(s0);
    s1.innerHTML = `
if (js.global.gameid == "") then
    return
end

local window = js.global
local document = js.global.document
local module = "GamesUI.filename." .. window.gameid
local mjcc = require(module)
local table = document:getElementById("table")
local luaItem = {}
local initUserset = {}

function luaTransfrom(item)
    return {
        setEnabled = function(name, state)
            item:setEnabled(name, state)
        end,
        setValue = function(name, state)
            local htmlDom = document:getElementsByName(name)
            local htmlValue = "0"
            if (htmlDom.length > 1) then
                for m = 1, htmlDom.length do
                    local htmlItem = htmlDom[m - 1]

                    if (htmlItem.checked) then
                        htmlValue = htmlItem.value
                    end
                end
            else
                if (htmlDom[0].checked) then
                    htmlValue = "1"
                else
                    htmlValue = "0"
                end
            end

            if (state == htmlValue) then
                return
            end

            item:setValue(name, state)
            local temp = luaItem[name]
            if (temp) then
                local func = temp.onvaluechanged
                if (func) then
                    if (temp.type == "radiobutton") then
                        local zu = document:getElementsByName(name)
                        for m = 1, zu.length do
                            local htmlItem = zu[m - 1]
                            local itemTrans = luaTransfrom(htmlItem)

                            if (htmlItem.checked) then
                                local num = htmlItem.value
                                func(itemTrans, num)
                            end
                        end
                    else
                        local htmlItem = document:getElementsByName(name)[0]
                        local num = changeEvent(htmlItem.checked)
                        local itemTrans = luaTransfrom(htmlItem)
                        func(itemTrans, num)
                    end
                end
            end
        end
    }
end

function changeEvent(condition)
    local num = "0"
    if (condition) then
        num = "1"
    else
        num = "0"
    end
    return num
end

for i = 1, #mjcc.ui do
    for j = 1, #mjcc.ui[i] do
        local c = mjcc.ui[i][j]
        if (c.type == "text" and c.text ~= "局数:") then
            local p = document:createElement("p")
            p.innerHTML = c.text
            if (c.text2) then
                local span = document:createElement("span")
                span.innerHTML = c.text2
                span.style.paddingLeft = "20px"
                span.style.color = "#1AAD19"
                p:appendChild(span)
            end
            table:appendChild(p)
        elseif (c.type == "radiobutton" and c.valuename ~= "round") then
            local divSelect = document:createElement("div")
            local wrap = document:createElement("label")
            local divWrap = document:createElement("div")
            local button = document:createElement("input")
            local desc = document:createElement("span")
            local idval = string.gsub(c.exportvalue, "|", "")
            desc.innerHTML = c.text
            divSelect.innerHTML = c.text
            divSelect.style.display = "inline-block"
            divSelect.classList:add(c.valuename)
            divSelect.onclick = function()
                local divsRadios = document:querySelectorAll('.'..divSelect.className)
                for a=1, divsRadios.length do
                    divsRadios[a-1]:setAttribute('checked', 'unchecked')
                    divsRadios[a-1].style.backgroundColor = ''
                end
                divSelect.style.backgroundColor = 'red'
                divSelect:setAttribute('checked', 'checked')
            end
            desc:setAttribute("for", c.valuename .. c.exportvalue)
            button.type = "radio"
            button.name = c.valuename
            button.id = c.valuename .. idval
            button.value = c.exportvalue

            if (c.default == 1) then
                button.checked = "checked"
                initUserset[c.valuename] = c.exportvalue
            end
            if (c.name ~= nil) then
                button.className = c.name
            end
            wrap.className = "rulewrap"
            wrap:appendChild(button)
            wrap:appendChild(desc)
            divWrap.className = "rulewrap"
            divWrap:appendChild(divSelect)
            table:appendChild(divWrap)
            table:appendChild(wrap)
            table:appendChild(divSelect)
        elseif (c.type == "checkbox") then
            local label = document:createElement("label")
            local span = document:createElement("span")
            local check = document:createElement("input")
            local checkTrans = luaTransfrom(check)

            local checkboxDiv = document:createElement('div')
            checkboxDiv.innerHTML = c.text
            checkboxDiv.classList:add('somecheck')
            checkboxDiv.onclick = function()
                local divsRadios1 = document:querySelectorAll('.somecheck')
                for a=1, divsRadios1.length do
                    divsRadios1[a-1]:setAttribute('checked', 'unchecked')
                    divsRadios1[a-1].style.backgroundColor = ''
                end
                checkboxDiv.style.backgroundColor = 'red'
                checkboxDiv:setAttribute('checked', 'checked')
            end
            table:appendChild(checkboxDiv)

            span.innerHTML = c.text
            check.type = "checkbox"
            check.name = c.valuename
            check.value = "1"

            if (c.name ~= nil) then
                check.className = c.name
            end
            if (c.default == 1) then
                check.checked = "checked"
                initUserset[c.valuename] = "1"
            else
                initUserset[c.valuename] = "0"
            end
            if (c.onvaluechanged) then
                local func = c.onvaluechanged
                local initNum = "0"

                check.onchange = function()
                    local num = changeEvent(check.checked)
                    func(checkTrans, num)
                end
            end
            label.className = "rulewrap"
            label:appendChild(check)
            label:appendChild(span)
            table:appendChild(label)
        else
        end
    end
end

for i = 1, #mjcc.ui do
    for j = 1, #mjcc.ui[i] do
        local r = mjcc.ui[i][j]
        if (r.type == "radiobutton") then
            if (r.onvaluechanged) then
                luaItem[r.valuename] = r
                local zu = document:getElementsByName(r.valuename)
                local func = r.onvaluechanged
                for m = 1, zu.length do
                    local item = zu[m - 1]
                    local itemTrans = luaTransfrom(item)

                    if (item.checked) then
                        local initNum = item.value
                        func(itemTrans, initNum)
                    end

                    item.onchange = function()
                        local num = item.value
                        func(itemTrans, num)
                    end
                end
            end
        elseif (r.type == "checkbox") then
            if (r.onvaluechanged) then
                luaItem[r.valuename] = r
                local func = r.onvaluechanged
                local item = document:getElementsByName(r.valuename)[0]
                local itemTrans = luaTransfrom(item)

                local initNum = changeEvent(r.default == 1)
                func(itemTrans, initNum)
            end
        end
    end
end

if (mjcc.getPlayerCount) then
    local playerCount = mjcc.getPlayerCount(initUserset)
    if (playerCount ~= nil) then
        local waittime = document:getElementById("waittime")
        waittime.innerHTML = ""
    end
end

function getRule()
    local userset = window.userset
    return mjcc.getRuler(userset)
end

function getPlayerCount()
    local userset = window.userset
    if (mjcc.getPlayerCount) then
        local playerCount = mjcc.getPlayerCount(initUserset)
        if (playerCount ~= nil) then
            return mjcc.getPlayerCount(userset)
        else
            return false
        end
    else
        return false
    end
end

return mjcc

    `;
    // s1.async = false;
    document.body.appendChild(s1);

    // //导入lua运行环境
    // const s0 = document.createElement("script");
    // s0.type = "text/javascript";
    // s0.src = "/Public/js/lua.vm.js";
    // // s0.async = false;
    // document.body.appendChild(s0);

    //最后的代码
    const s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.innerHTML = `
    console.log('你好么')
    var rule = lua.execute('return getRule()');
    console.log(rule)
    `;
    setTimeout(() => {
      document.body.appendChild(s2);
    }, 1000);
  },
  beforeRouteEnter(to, from, next) {
    let re = sessionStorage.getItem("refresh");
    if (!re) {
      location.reload();
    }
    sessionStorage.setItem("refresh", "jj");
    next();
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem("refresh");
    next();
  }
};
</script>

<style scoped>
.select {
  display: inline-block;
}
.default_select {
  border: 1px solid red;
}
.select-item {
  background-color: #f40;
}
</style>

