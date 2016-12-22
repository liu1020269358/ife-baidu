window.onload = function(){
    //点击add按钮       
    var _add = document.getElementById("add");
    _add.onclick = function(){
        var label = document.getElementById("label-input").value;
        var type = document.getElementById("type-select").value;
        var success = document.getElementById("success").value;
        switch(type){
            //如果为输入框控件
            case 'text':
                var mustJS = {
                    'name' : 'mustJS',
                    'must' : document.getElementById("mustHave").checked,
                    'fail' : document.getElementById("must-fail").value,
                };
                var limitJS = {
                    'name' : 'limitJS',
                    'limit' : document.getElementById("lengthLimit").checked,
                    'fail' : document.getElementById("limit-fail").value,
                    'max' : parseInt(document.getElementById("length-max").value),
                    'min' : parseInt(document.getElementById("length-min").value),
                };
                var numberJS = {
                    'name' : 'numberJS',
                    'number' : document.getElementById("onlyNumber").checked,
                    'fail' : document.getElementById("number-fail").value,
                };
                var emailJS = {
                    'name' : 'emailJS',
                    'email' : document.getElementById("email").checked,
                    'fail' : document.getElementById("email-fail").value,
                };
                addText(label, success, mustJS, limitJS, numberJS, emailJS);
                break;
            //如果为单选框控件
            case 'radio':
                options = document.getElementById("options").value;
                var mustJS = {
                    'name' : 'mustJS',
                    'must' : document.getElementById("mustHave").checked,
                    'fail' : document.getElementById("must-fail").value,
                };
                addRadio(label, success, options, mustJS);
                break;

            case 'checkbox':
                options = document.getElementById("options").value;
                var mustJS = {
                    'name' : 'mustJS',
                    'must' : document.getElementById("mustHave").checked,
                    'fail' : document.getElementById("must-fail").value,
                };
                addCheckbox(label, success, options, mustJS);
                break;

            case 'password':
                var mustJS = {
                    'name' : 'mustJS',
                    'must' : document.getElementById("mustHave").checked,
                    'fail' : document.getElementById("must-fail").value,
                };
                var limitJS = {
                    'name' : 'limitJS',
                    'limit' : document.getElementById("lengthLimit").checked,
                    'fail' : document.getElementById("limit-fail").value,
                    'max' : parseInt(document.getElementById("length-max").value),
                    'min' : parseInt(document.getElementById("length-min").value),
                };
                addPassword(label, success, mustJS, limitJS);
                break;

            case 'submit':
                addSubmitBtn(label);
                break;
        }
    };

    //某些选项产生不同的配置界面
    var success = document.getElementById("successDiv");
    var optionsDiv = document.getElementById("optionsDiv");
    var mustHaveDiv = document.getElementById("mustHaveDiv");
    var lengthLimitDiv = document.getElementById("lengthLimitDiv");
    var onlyNumberDiv = document.getElementById("onlyNumberDiv");
    var emailDiv = document.getElementById("emailDiv");

    document.getElementById("type-select").onchange = function(){
        type = document.getElementById("type-select").value;
        switch(type){
            case 'text':
                optionsDiv.style.display = "none";
                mustHaveDiv.style.display = "block";
                lengthLimitDiv.style.display = "block";
                onlyNumberDiv.style.display = "block";
                emailDiv.style.display = "block";
                success.style.visibility = "visible";
                break;
            case 'radio':
                optionsDiv.style.display = "block";
                mustHaveDiv.style.display = "block";
                lengthLimitDiv.style.display = "none";
                onlyNumberDiv.style.display = "none";
                emailDiv.style.display = "none";
                success.style.visibility = "visible";
                break;
            case 'checkbox':
                optionsDiv.style.display = "block";
                mustHaveDiv.style.display = "block";
                lengthLimitDiv.style.display = "none";
                onlyNumberDiv.style.display = "none";
                emailDiv.style.display = "none";
                success.style.visibility = "visible";
                break; 
            case 'password': 
                optionsDiv.style.display = "none";
                mustHaveDiv.style.display = "block";
                lengthLimitDiv.style.display = "block";
                onlyNumberDiv.style.display = "none";
                emailDiv.style.display = "none";
                success.style.visibility = "visible";
                break;
            case 'submit':
                optionsDiv.style.display = "none";
                mustHaveDiv.style.display = "none";
                lengthLimitDiv.style.display = "none";
                onlyNumberDiv.style.display = "none";
                emailDiv.style.display = "none";
                success.style.visibility = "hidden";
                break;        
        }
    }


    configInit([
        [document.getElementById("mustHave"), document.getElementById("notMust")],
        [document.getElementById("lengthLimit"), document.getElementById("notLimit")],
        [document.getElementById("onlyNumber"), document.getElementById("notNumber")],
        [document.getElementById("email"), document.getElementById("notEmail")]
        ])
    
}


//增加输入框
function addText(label, success, mustJS, limitJS, numberJS, emailJS){
    //添加输入框
    var parent = document.getElementById('show-form');
    var box = document.createElement('div');
    box.innerHTML = "<label>"+label+"</label><div><input type='text' /></div>";
    parent.appendChild(box);
    //给新的输入框添加事件
    var input = box.getElementsByTagName("input")[0];
    input.addEventListener("blur", function(){
        _box = box;
        _success = success;
        must_JS = mustJS;
        limit_JS = limitJS;
        number_JS = numberJS;
        email_JS =  emailJS;
        //获取验证结果，然后根据验证结果显示消息
        must_tof = validator.mustHave(input.value);
        limit_tof = validator.lengthLimit(input.value, limitJS.max, limitJS.min);
        number_tof = validator.onlyNumber(input.value);
        email_tof = validator.email(input.value);
        if(must_JS.must == true && must_tof == false){
            valiMessShow(_box, must_JS.fail)
        }else if(limit_JS.limit == true && limit_tof == false){
            valiMessShow(_box, limit_JS.fail)
        }else if(number_JS.number == true && number_tof == false){
            valiMessShow(_box, number_JS.fail)
        }else if(email_JS.email == true && email_tof == false){
            valiMessShow(_box, email_JS.fail)
        }else{
            valiMessShow(_box, _success)
        }   
    })   
}



//增加单选框
function addRadio(label, success, options, mustJS){
    var parent = document.getElementById('show-form');
    var options = options.split(/[,\uFF0C]/);
    var box = document.createElement('div');
    var inner = ["<label>"+label+"</label><div>"];
    for(i=0; i<options.length; i++){
        inner.push((function(n){
            return "<label>"+options[n]+"<input type='radio' value='"+options[n]+"' /></label>"
        })(i));
    }
    inner.push("</div>")
    box.innerHTML = inner.join("");
    parent.appendChild(box);
    labels = box.getElementsByTagName('input');
    manyToOne(labels);
    document.body.addEventListener("click", function(){
        _box = box;
        _success = success;
        must_JS = mustJS;
        DOMS = ndtrarr(_box.getElementsByTagName("input"));
        value = DOMS.map(function(x){return x.checked}).reduce(function(x, y){return x || y});
        if(must_JS.must == true && value == false){
            valiMessShow(_box, must_JS.fail)
        }else{
            valiMessShow(_box, _success)
        }
    })
}
//增加多选框
function addCheckbox(label, success, options, mustJS){
    var parent = document.getElementById('show-form');
    var options = options.split(/[,\uFF0C]/);
    var box = document.createElement('div');
    var inner = ["<label>"+label+"</label><div>"];
    for(i=0; i<options.length; i++){
        inner.push((function(n){
            return "<label>"+options[n]+"<input type='checkbox' value='"+options[n]+"' /></label>"
        })(i));
    }
    inner.push("</div>")
     
    box.innerHTML = inner.join("");
    parent.appendChild(box);
    document.body.addEventListener("click", function(){
        _box = box;
        _success = success;
        must_JS = mustJS;
        DOMS = ndtrarr(_box.getElementsByTagName("input"));
        value = DOMS.map(function(x){return x.checked}).reduce(function(x, y){return x || y});
        if(must_JS.must == true && value == false){
            valiMessShow(_box, must_JS.fail)
        }else{
            valiMessShow(_box, _success)
        }
    })
}
//增加密码框
function addPassword(label, success, mustJS, limitJS){
    var parent = document.getElementById('show-form');
    var box = document.createElement('div');
    box.innerHTML = "<label>"+label+"</label><div><input type='password' /></div>";
    parent.appendChild(box);
    var input = box.getElementsByTagName("input")[0];
    input.addEventListener("blur", function(){
        _box = box;
        _success = success;
        must_JS = mustJS;
        limit_JS = limitJS;
        must_tof = validator.mustHave(input.value);
        limit_tof = validator.lengthLimit(input.value, limitJS.max, limitJS.min);
        if(must_JS.must == true && must_tof == false){
            valiMessShow(_box, must_JS.fail)
        }else if(limit_JS.limit == true && limit_tof == false){
            valiMessShow(_box, limit_JS.fail)
        }else{
            valiMessShow(_box, _success)
        }   
    })

}
//增加提交按钮
function addSubmitBtn(label){
    var parent = document.getElementById('show-form');
    var box = document.createElement('div');
    var btn = document.createElement('bottom')
    btn.setAttribute('class', 'btn');
    btn.innerHTML = "<span>"+label+"</span>";
    btn.onclick = function(){alert('已提交表单')}
    console.log(btn);
    box.appendChild(btn);
    parent.appendChild(box);
}


//显示验证消息
function valiMessShow(box, message){
    if(box.lastChild.nodeName == "SPAN"){
        box.removeChild(box.lastChild)
    }
    span = document.createElement('span');
    span.innerHTML = message
    box.appendChild(span);
}
//验证方法对象
var validator = {
    'mustHave': 
        function(value){
            if(value == ""){
                return false;    
            }
            else{
                return true;
            }
        },

    'lengthLimit': 
        function(value, max, min){
            if(value.length<=max && value.length>=min){
                return true;
            }
            else{
                return false;
            }
        },

    'onlyNumber':
        function(value){
            var re = /^\d*$/;
            return re.test(value);
        },

    'email':
        function(value){
            var re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+[\.a-zA-Z0-9_-]+$/;
            return re.test(value);
        }
}
//实现多个选项只能选一个的功能
function manyToOne(doms){
    //传入nodelist，将nodelist转为数组
    //用map()给每个节点绑定一个函数
    //该函数为给每个节点绑定一个onclick事件
    //该onclick事件为将发生事件的节点的checked设为true,surplusDOMS为除了该节点的其他节点
    //然后将其他节点的checked设为false
    var DOMS = ndtrarr(doms);
    DOMS.map(function(x){
        x.onclick = function(){
            x.checked = true;
            surplusDOMS = DOMS.filter(function(y){return y !== x});
            surplusDOMS.map(function(z){z.checked = false;})
        }
    })
}

//将nodelist转换为数组
function ndtrarr(doms){
    var DOMS = [];
    for(i=0; i<doms.length; i++){
        DOMS.push(doms[i])
    }
    return DOMS;
}
//隐藏可选配置
function hideVali(dom){
    dom.addEventListener("click", function(){
        var nodeli = this.parentElement.parentElement.getElementsByTagName("div");
        nodeli = ndtrarr(nodeli);
        nodeli.map(function(x){
        x.style.display = "none"
        })
    })
}
//显示可选配置
function showVali(dom){
    dom.addEventListener("click", function(){
        var nodeli = this.parentElement.parentElement.getElementsByTagName("div");
        nodeli = ndtrarr(nodeli);
        nodeli.map(function(x){
        x.style.display = "block"
        })
    })
}

function configInit(doubleDoms){
    doubleDoms.map(function(doubleDom){
        manyToOne(doubleDom);
        hideVali(doubleDom[1]);
        showVali(doubleDom[0]);
    })
}