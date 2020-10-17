// 总数据
var arr = [
    { val:'吃饭', task:true},
    { val:'睡觉', task:false}
];
// 已完成
var comp = [];
// 未完成
var und = [];
var val = document.getElementsByTagName('input')[0];
var btn = document.getElementById('btn');  //添加 按钮
var con = document.getElementById('content')
var content = document.getElementById('content').children;  //存放列表
content[0].innerHTML = tabg(arr);
fn()
// 分类数据
function fn() {
    if (arguments.length == 1) {
        for(var i = 0;i < arr.length; i++){
            if(arr[i].val == arguments[0]) return   
        }  
        arr.push({ val: arguments[0], task: false });
            und.push(arr[arr.length - 1]);
            und = JSON.parse(JSON.stringify(und)); 
    } else {
        und = []
        comp = []
        for (var i = 0; i < arr.length; i++) {
            arr[i].task ? comp.push(arr[i]) : und.push(arr[i]);
            und = JSON.parse(JSON.stringify(und));
            comp = JSON.parse(JSON.stringify(comp));
        }
    }
}
function tabg(arr) {
    var str = ''
    for (let i = 0; i < arr.length; i++) {
        str += `<p><span >${arr[i].val}</span> <i class="iconfont ${arr[i].task ? 'icon-success' : 'icon-stop'}" index=${i}></i>   <i class="iconfont icon-more" index=${i}></i> <i class="iconfont icon-ashbin" index=${i}></i>`;   //模板字符串
    }
    return str
}
//事件
con.addEventListener('click', function (e) {
    var cla = e.target.getAttribute('class').split(' ')[1];
    var ins = e.target.getAttribute('index');
    // 删除
    if (cla == 'icon-ashbin') {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        arr.splice(ins, 1);
        fn();
    // 修改
    } else if (cla == 'icon-more') {
        var word = prompt("请输入修改内容", "");
        if (word == '') return
        for (var i = 0; i < arr.length; i++) {
            arr[i].val == e.target.parentNode.firstElementChild.innerHTML ? arr[i].val = word : '';
        }
        fn()
        content[0].innerHTML = tabg(arr);
        content[2].innerHTML = tabg(und);
        content[1].innerHTML = tabg(comp);
    // 状态
    } else {
        arr[ins].task = true;
        fn()
        e.target.classList.remove('icon-stop')
        e.target.classList.add('icon-success')
        content[0].innerHTML = tabg(arr);
        content[2].innerHTML = tabg(und);
        content[1].innerHTML = tabg(comp);
    }
})
// 添加事件
btn.onclick = function () {
    if (val.value.trim() == '') return;
    fn(val.value)
    val.value = '';
    content[0].innerHTML = tabg(arr);
    content[2].innerHTML = tabg(und);
    content[1].innerHTML = tabg(comp);
}
// tab 切换
var tabs = document.getElementById('tab')
tabs.onclick = function (e) {
    content[0].innerHTML = tabg(arr);
    content[2].innerHTML = tabg(und);
    content[1].innerHTML = tabg(comp);

    for (var i = 0; i < 3; i++) {
        if (i != e.target.getAttribute('index')) {
            tabs.children[i].classList.remove('bgc')
        } else {
            e.target.classList.add('bgc')
        }
    }
    for (var i = 0; i < 3; i++) {
        if (i == e.target.getAttribute('index')) {
            content[i].classList.add('conactive')
        } else {
            content[i].classList.remove('conactive')
        }
    }
}