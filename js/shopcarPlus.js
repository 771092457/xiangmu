/**
 * 购物车加强js
 * 2020-12-18 by 任先生
 */
 $(function () {
    //把三个类型的input分别获取
   var $theadInput = $('thead input[type=checkbox]');//表头中的全选框
   var $tbodyInputs = $('tbody input[type=checkbox]');//表格中的每一行的选择框
   var $totalPriceInput = $('.totalPrice input[type=checkbox]');//计算总价中的全选框
    
    /* 全选 */
    /**
     * 表头中的全选按钮 绑定点击事件 
     * 给表格中的每一行数据选择框
     * 给计算总价中的全选框
     */
    $theadInput.change(function(){
        var checkState = $(this).prop('checked');

        $tbodyInputs.prop('checked',checkState);
        $totalPriceInput.prop('checked',checkState);

        allTotal();//总计
    });

    /**计算总价的全选
     * 给计算总价的全选按钮 绑定事件
     * 把状态给表头的全选
     * 把状态给表格的选择框
    */
   $totalPriceInput.change(function(){
       var checkState = $(this).prop('checked');

       $theadInput.prop('checked',checkState);
       $tbodyInputs.prop('checked',checkState);
       
       allTotal();//总计
   });


   /**
    * 表格中的选择框反影响全选框
    * 给表格中的选择框绑定点击事件
    * 循环表格中的选择框
    * 获取选择框的选择状态
    * 把值赋给全选框
    */
   $tbodyInputs.change(function(){
       var flag = true;
       $tbodyInputs.each(function(index,input){
           var checkState = $(this).prop('checked');
           if(!checkState) {
                flag = false;
           }
       })
       $theadInput.prop('checked',flag);
       $totalPriceInput.prop('checked',flag);
       allTotal();//总计
   })

   /**
    * 加法功能
    * 获取+按钮，绑定点击事件
    * 点击的时候获取后面的
    * 输入框的值自增
    * 自增值赋给后面的输入框
    */
   $('.add').click(function (){
       var count = parseInt($(this).next().val());
       count++;
       $(this).next().val(count);

       //小计
       subTotal($(this),count);
       allTotal();//总计
   })
/**
 * 减法功能
 */
   $('.reduce').click(function (){
    var count = parseInt($(this).prev().val());
    count--;
    count = count < 1 ? 1 :count;
    $(this).prev().val(count);
    // 小计
    subTotal($(this),count);
    allTotal();//总计
})

/*
    封装一个小计函数：（）
 */
    function subTotal(dom,count){
        var singlePrice =parseFloat(dom.closest('tr').find('.price').text());

        var subTotalPrice = singlePrice * count;
        dom.closest('tr').find('.subprice').text(subTotalPrice.toFixed(2))
    }


    /**
     * 总计功能实现:()
     * 定义一个变量 保存总价 保存数量
     * 获取表格中的选择框状态
     * 选中累加小计
     */
    function allTotal(){
        var allPrice = 0;
        var selectedCount = 0;

        $('tbody input[type=checkbox]').each(function(){
            var checkState = $(this).prop('checked');
            if(checkState){
                allPrice += parseFloat($(this).closest('tr').find('.subprice').text());
                selectedCount++;
            }
            $('.total').text(allPrice.toFixed(2));
            $('.count').text(selectedCount);
        })
            
    }



    /**
     * 删除
     */
    $('.del').click(function(){
        $(this).closest('tr').remove()
    })

    //删除选中
    $('.deleteChecked').click(function(){
        $('tbody input[type=checkbox]').each(function(){
            var checkState = $(this).prop('checked');
            if(checkState){
                $(this).closest('tr').remove();
            }
        }) 
    })


    //全部商品
    function getGoodsCount(){

        //获取数量
        var goodsCount = $('table tbody tr').length;

        $('.goodsCount').text(goodsCount);
    }

    getGoodsCount();//页面加载调用

})
