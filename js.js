$(document).ready(function(){
    var cons_weighted_score, multiplier, student0 = 0, student1 = 0, student2 = 0;
    var students=[], baskets=[];
    const res=2,act=5, disc=5;

    //function to show the tree image(size depends on value of student)
    function tree(student,num){
        basket= student<=100 ? 0: parseInt((student - 80) / 20);
        var score= (student<=100) ? student: 80 +( student % 20);
        document.getElementById("container"+num).innerHTML = "<img src=' "+ Math.round(score) +".png'>";
        return basket;
    }

    //function to show number of baskets
    function Basket(basket,v){
        const Max=3; var i=1, basketminus3=basket-3;
        for(;i<=basket;i++){
            $('#basket'+v +' .e_basket'+i+'').show();
        }
        while(i<=Max){
            $('#basket'+v +' .e_basket'+i+'').hide();
            i++;
        }
        if(basket<=Max){
            $('#basket'+v +' .sum_of_basket').hide();
        }else {
            $('#basket'+v +' .sum_of_basket').show();
            $('#basket'+v +' .sum_of_basket  h3').html('and '+basketminus3+ ' more.');
        }}

    //these funtions will show the values of promptness, normalised score and login bonus
    function mainScore(){
            $('#main_score span:first').html( Math.round((students[0] - 4)/multiplier));
            $('#main_score span:eq(1)').html(Math.round((students[0]-4)*100)/100);
            $('#main_score span:eq(2)').html(Math.round(students[0]*100 )/100);
    }

    function studentScore(student,val,num){
            var round=student - val,
            span=[$('#student'+num+'_score span:eq(0)'),$('#student'+num+'_score span:eq(1)'),$('#student'+num+'_score span:eq(2)')];
            ((Math.round(round/multiplier))<0) ? span[0].html(0) : span[0].html(Math.round(round/multiplier));
            ((Math.round(round*100)/100)<0) ? span[1].html(0) : span[1].html((Math.round(round*100)/100));
            ((Math.round(student*100 )/100)<0) ? span[2].html(0) : span[2].html(Math.round(Math.round(student*100)/100));
    }

    //function to add values to the score depending on the selected item
    function login(val,num){
            if(val==4){
                student = ((multiplier*cons_weighted_score)/20);
            }else if(val==3){
                student = ((multiplier*cons_weighted_score)/30);
            }else if(val==2){
                student = ((multiplier*cons_weighted_score)/50);
            }else{
                student = 0;
            }
            $('.right'+num+' .submission:not(:first), .right'+num+' .viewed:not(:first)').each(function(){
                    student += $(this).val()*multiplier;
            });
            return student;
    }
	
    //function for particular select
    function part_sel(num,nxt){	
            $('.inner-wrapper:last #delete').show();
            $('#wrapper').append($('.inner-wrapper:last').clone());
            $('.inner-wrapper:last #delete').hide();
            students[0] += num*multiplier;
            nxt.html(''+num+'');
    }

    $('table tr:first-child').click(function(){
        $(this).siblings().toggle();
    });
    $('#go').hide();
    $('#activities, #resources, #discussions').on('input',function(){
         if($('#activities').val() && $('#resources').val() && $('#discussions').val()){
            $('#go').show();
        }
    });
    
    //initial work(getting values)
    $('body').on('click','#go',function(){
        var basket=0; 
        var num_of_resources = $('#resources').val();
        var num_of_activities = $('#activities').val();
        var num_of_discussion = $('#discussions').val();      
        $('#wrapper').hide();
        if((num_of_activities>=0) && (num_of_resources>=0) && (num_of_discussion>=0)){ 
            $('#go').hide();  
            $('#wrapper').show();
            $('#weighted_score_resources').text(''+res+' X '+num_of_resources+' = '+res*num_of_resources);
            $('#weighted_score_activities').text(''+act+' X '+num_of_activities+' = '+act*num_of_activities);
            $('#weighted_score_discussions').text(''+disc+' X '+num_of_discussion+' = '+disc*num_of_discussion);
            cons_weighted_score = (res*num_of_resources)+(act*num_of_activities)+(disc*num_of_discussion);
            $('#weighted_score').text(cons_weighted_score);
            cons_weighted_score = cons_weighted_score * 75 / 100;
            $('#cons_weighted_score').text(cons_weighted_score); 
            $('#multiplier').text(Math.round((80/cons_weighted_score)*100)/100);
            multiplier = 80/cons_weighted_score;
            student0 = (multiplier*cons_weighted_score)/20;
            students.push(student0);
            mainScore();
            $('#student1_score .span, .span1, .span2 ').html(0);
            $('#student2_score .span, .span1, .span2').html(0);
        }else{ alert("please enter positive values");}
            students.push(student1);students.push(student2);			
            for(var pos=0; pos<students.length; pos++){
                tree(students[pos],pos);				
                baskets[pos]=basket;
                Basket(baskets[pos],pos);
                }
    });
    $('#wrapper').append($('.inner-wrapper').eq(1).clone());
    $('.inner-wrapper:last').show();
    $('.inner-wrapper:last #delete').hide();    

    // delete particular
    $('body').on("click","#delete:visible",function(){     
        $(this).parent().parent().find('select:visible').each(function(){
            var value=$(this).val();		
            if(($(this).val()=='activity') || ($(this).val()=='discussion')){
                students[0] -= act*multiplier;
            }else if($(this).val()=='resource'){
                students[0] -= res*multiplier;
            }else{ ($(this).parent().attr("class")=="right1")?number=1:number=2;
                students[number]-=value*multiplier;
                studentScore(students[number],value,number);}
            });
                for(var pos=0; pos<students.length;pos++){
                tree(students[pos],pos);				
                baskets[pos]=basket;
                Basket(baskets[pos],pos);
                }
            mainScore();
       $(this).parent().parent().remove();    
    });

    // particular select
    $('body').on("change",".selected_particular",function(){
            var next=$(this).next();
            if($(this).val()=='activity' || $(this).val()=='discussion'){            
            part_sel(act,next);
            $(this).parent().siblings('.right1, .right2').find('[name="submission"]').show();
            $(this).prop('disabled', true);
        }else if($(this).val()=='resource'){
            part_sel(res,next);
            $(this).parent().siblings('.right1, .right2').find('[name="viewed"]').show();
            $(this).prop('disabled', true);
        }else if($(this).val()=='new_week'){
            $('<div class="new_week">New week started</div>').insertAfter( $('.inner-wrapper:last '));
            $('.inner-wrapper:last').clone().insertAfter($('.new_week:last'));  
            $(this).parent().parent().remove();             
        }
            tree(students[0],0); baskets[0]=basket;
            Basket(baskets[0],0);
            mainScore();
    });
   
    // login type and particular type
    $('body').on("change",".loginday, .submission,.viewed",function(){
        var num=($(this).parent().attr("class")=='right1')?1:2;
        var value=$('.right'+num +' .loginday').val();
        login(value,num);
        students[num]=student;
        tree(students[num],num);
        baskets[num]=basket;
        Basket(baskets[num],num);
        studentScore(students[num],value,num);
        $(this).next().html($(this).val());
    });
});