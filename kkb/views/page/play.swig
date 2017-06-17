{% extends '../layout/default.swig' %} 
<!--title-->
{% block title %}
开课吧
 {%endblock%} 

{% block style %}
<link href="/css/common/nav.css" rel="stylesheet" type="text/css">
<link href="/css/common/course.css" rel="stylesheet" type="text/css">
<link href="/css/common/banner.css" rel="stylesheet" type="text/css">
<!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
      <link rel="stylesheet" href="css/ie.css">
<![endif]-->

 {%endblock%} 

 {% block head %} 
 {% endblock %} 
 
 {% block content %}
<!--nav-->
 {% include "../common/nav.swig" %}
 <!--courseBanner-->
 <h1>
 播放页面
 </h1>

 {% endblock %}


{% block script %} 
    <script src="/js/common/nav-ee8fb38740.js"></script>
 {% endblock %} 
<script>
$(function(){
     var navigation = responsiveNav("#nav", { // Selector: The ID of the wrapper
  animate: true, // Boolean: 是否启动CSS过渡效果（transitions）， true 或 false
  transition: 400, // Integer: 过渡效果的执行速度，以毫秒（millisecond）为单位
  label: "Menu", // String: Label for the navigation toggle
  insert: "after", // String: Insert the toggle before or after the navigation
  customToggle: "", // Selector: Specify the ID of a custom toggle
  openPos: "relative", // String: Position of the opened nav, relative or static
  jsClass: "js", // String: 'JS enabled' class which is added to <html> el
  debug: false, // Boolean: Log debug messages to console, true 或 false
  init: function(){}, // Function: Init callback
  open: function(){}, // Function: Open callback
  close: function(){} // Function: Close callback
});
})
 
</script>