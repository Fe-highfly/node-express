{% extends '../layout/default.swig' %} 
<!--title-->
{% block title %}
开课吧
 {%endblock%} 

{% block style %}
<link href="/css/common/nav.css" rel="stylesheet" type="text/css">
<link href ="/css/common/details.css" rel="stylesheet" type="text/css"/>
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
 <!--nav-->
 {% include "../tel/course_details.swig" %}

