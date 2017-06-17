<!doctype html>
<html>

<head>
     <meta charset="utf-8">
     <base href="/">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{% block title %}{% endblock %}</title>

    <link href="/css/main.css" rel="stylesheet" type="text/css">
    <link href = "/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type = "text/css"/>
    <link href="/bower_components/swiper/dist/css/swiper.min.css" rel="stylesheet" type="text/css"/>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    {% block style %} {% endblock %}
    {% block head %} {% endblock %}
</head>

<body>
    <main class="clear">
        <div class="mainLeft">
            {%block content%}{%endblock%}
        </div>
    </main>
    <div class="copyright textCenter">Copyright © kaikeba.com 版权所有 | 京ICP备08102442号</div>
</body>

<script src="/bower_components/jquery/dist/jquery.min.js"></script>
<script src="/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="/bower_components/swiper/dist/js/swiper.jquery.min.js"></script>
<script src="/js/common/index.js"></script>
<script>
    
</script>
 {% block script %} {% endblock %}

</html>