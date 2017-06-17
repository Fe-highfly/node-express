<nav class="nav navbar-inverse navbar-fixed-top" role="navgation">
    <div class="container-fluid">
        <div class="navbar-header">
            <a href="#" class="navbar-brand">
                <img src="/img/logo.png">
            </a>

            <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>

        <div class="collapse navbar-collapse">
            <ul class="navbar-nav nav visible-lg-block">
                <li class="active"><a href="/">首页</a></li>
                <li><a href="/list">全部课程</a></li>
                <li><a href="http://student.kaikeba.com/ucenter/course">学习中心</a></li>
                <li><a href="http://www.kaikeba.com/download">下载APP</a></li>
            </ul>
             <ul class="navbar-nav nav visible-xs-block">
                <li><a href="#">{{checkLogin.true_name}}</a></li>
                  <li><a class="" href="http://student.kaikeba.com/ucenter/course"><em class="icon-ic_top_xl_2"></em><span>我的课程</span></a></li>
                  <li><a class="" href="http://student.kaikeba.com/ucenter/message"><em class="icon-ic_top_xl_3"></em><span>消息</span></a></li>
                  <li><a class="" href="http://student.kaikeba.com/ucenter/account"><em class="icon-ic_top_xl_4"></em><span>账号管理</span></a></li>
                  <li><a class="logout" href="user/logout"><em class="icon-ic_top_xl_5"></em><span>退出</span></a></li>
            </ul>
            {% if !checkLogin %}
            <div class="navbar-form navbar-right" style="margin-right: 30px;">
                <input type="text" class="form-control" name="" placeholder="请输入搜索内容">
                <button class="btn btn-success" style="margin-right: 30px;">搜索</button>
                <a href="http://student.test.kaikeba.com/user/login" class="navbar-link">登录 </a>
                <a href="http://student.test.kaikeba.com/user/register" class="navbar-link">注册</a>
            </div>
            {% else %}
            <div class="navbar-form navbar-right visible-lg-block" style="margin-right: 30px;">
                <input type="text" class="form-control" name="" placeholder="请输入搜索内容">
                <button class="btn btn-success" style="margin-right: 30px;">搜索</button>
                <div class="dropdown pull-right">
                <img class="dropdown-toggle img-circle img-responsive" data-toggle="dropdown"  src={{checkLogin.avatar}} style="height:40px;width:40px" />
                <ul class="dropdown-menu">
                  <li><a href="#">{{checkLogin.true_name}}</a></li>
                  <li><a class="" href="http://student.kaikeba.com/ucenter/course"><em class="icon-ic_top_xl_2"></em><span>我的课程</span></a></li>
                  <li><a class="" href="http://student.kaikeba.com/ucenter/message"><em class="icon-ic_top_xl_3"></em><span>消息</span></a></li>
                  <li><a class="" href="http://student.kaikeba.com/ucenter/account"><em class="icon-ic_top_xl_4"></em><span>账号管理</span></a></li>
                  <li><a class="logout" href="/user/logout"><em class="icon-ic_top_xl_5"></em><span>退出</span></a></li>
                </ul>
              </div>
            </div>
            {% endif %}
        </div>
    </div>
</nav>
