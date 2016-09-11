/**
 * Created by 银鹏 on 2016/9/11.
 */
// 判断是否有参数
var undefined = 1;
function fn(arg1) {
    //var a;
    console.log('arg1 是否未被传入:', arg1 === void 0);
}
fn();

// 在标准浏览器中没有任何问题,但是在低版本ie中存在问题.

// 解决方案1 定义一个未被赋值的变量a,因为a没有被赋值所以a为真正的undefined

// 解决方案2 使用void 0 比较.

