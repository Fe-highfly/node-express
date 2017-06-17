<div class="container">
    <div class="visible-lg-block visible-md-block visible-sm-block ">
        <div class="category-nav">
            <div class="left tit">课程类别：</div>
            <div class="left category">
                {% for item in data.listnav.data %}
                    {{ item }}
                    <a href = {{ "/list/"+item }} class="item" params="">{{ item }}</a>
                {% endfor %}
            </div>
        </div>
        <div style="width: 100%;height: 40px"></div>
        <ul class="lists wrap">
        {% for item in data.categoryCourse.data.courses %}
            <li class="item clearfix">
                <a class="img-wrap" href="/course/16" target="_blank">
                    <img src= {{ item.pic }} width="288px" height="162px">
                    <div class="mask"></div>
                    <span class="course-name">{{ item.name }}</span>
                </a>
                <div class="info-wrap">
                    <a class="title" href="/course/16" target="_blank">{{ item.name }}</a>
                    <span class="tag">{{item.oneword}}</span>                    <p class="tutor">课程讲师：刘文智</p>
                    <p class="des">{{ item.description }}</p>
                    <span class="label first">{{ item.hours }}<small>课时</small></span>
                    <span class="label">{{ item.hours }}<small>分钟</small></span>
                    <span class="label">{{ item.custom1 }}</span>
                    <span class="label">{{ item.custom2 }}</span>
                    <span class="label">{{ item.custom3 }}</span>
                    <a href={{ "/course/"+"item.courseid" }} class="opt applypie">查看详情<em class="icon icon-jkck"></em></a>
                </div>
            </li>
            {% endfor %}
           
        </ul>
    </div>
        <!--移动端-->
     <ul class="lists visible-xs-block">
      {% for item in category.data.courses %}
        <li class="item clearfix">
            <a class="img-wrap m-img-wrap" href="/course/16" target="_blank">
                <img src={{ itme.pic }} width="288px" height="162px">
                <div class="mask"></div>
                <span class="course-name">{{ item.name }}</span>
            </a>
        </li>
        {% endfor %}
    </ul>

   
</div>