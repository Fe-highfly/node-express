{% for item in data.course.data.courses %}
 <div class="col-sm-6 col-md-3 course-wrap">
    <div class="thumbnail">
        <a target="_blank" href={{'/course/'+item.courseid}} class="showItme">
            <img src={{item.pic}}>
            <div class="market"></div>
            <span class="course-btn">即刻学习</span>
            <h4 class="course-title" style="">{{item.name}}</h4>
            <span class="course-cate">{{item.name}}</span>
            <div class="info-box">
                <div class="slidebox" style="height: 31px;">
                    <p class="p1">{{item.oneword}}</p>
                    <p class="p2">{{item.description}}}</p>
                </div>
                <p class="p3">
                    <span class="salary">{{item.salaryRange}}</span>
                    <span class="course-time"><img class="icon" src="/public/img/img_ico_top_xl_1@2x.png">{{item.hours}}课时<span>{{item.longtime}}分钟</span></span>
                </p>
            </div>
        </a>
    </div>
</div>
{% endfor %}
<script>
    
</script>