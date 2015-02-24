$(document).ready(function(){
    var cons_weighted_score, multiplier, student0 = 0, student1 = 0, student2 = 0;
    var students=[], baskets=[], resources;
    var items=[
                resources   = { weight : 2, Count : 0 , name : 'resource'}, 
                activities  = { weight : 5, Count : 0 , name : 'activity'}, 
                discussions = { weight : 5, Count : 0 , name : 'discussion'} 
            ];
    
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
            var round=student - val;
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
    }});
  
    //initial work(getting values)
    $('body').on('click','#go',function(){
    var basket=0;
    $('#wrapper').hide();
    items[0].Count=$('#resources').val(), items[1].Count=$('#activities').val(), items[2].Count=$('#discussions').val();
    if((items[0].Count>=0) && (items[1].Count>=0) && (items[2].Count>=0)){ 
            $('#go').hide();  
            $('#wrapper').show();
            for(var col=0; col<=2; col++){
            $('#weighted_score_column'+col+'').text(''+items[col].weight+' X '+items[col].Count+' = '+(items[col].weight)*(items[col].Count));    
            }
            weighted_score = (items[0].weight)*(items[0].Count) + (items[1].weight)*(items[1].Count) + (items[2].weight)*(items[2].Count);
            $('#weighted_score').text(weighted_score);
            $('#cons_weighted_score').text(cons_weighted_score = weighted_score * 75 / 100); 
            $('#multiplier').text(Math.round((multiplier = 80/cons_weighted_score)*100)/100);
            students.push(student0 = (multiplier*cons_weighted_score)/20);
            mainScore();
            $('#student1_score .span, .span1, .span2 ').html(0);
            $('#student2_score .span, .span1, .span2').html(0);
        }else{ alert("please enter positive values");}
            students.push(student1);    students.push(student2);			
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
            if($(this).parent().attr("class")=="left"){
                for(var x=0; x<items.length; x++){
                    if($(this).val()==items[x].name){
                        students[0] -= items[x].weight*multiplier;
                }}
           }else{ ($(this).parent().attr("class")=="right1")?number=1:number=2;
                var value=$(this).val();
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
        if($(this).val()=='activity'){            
            part_sel(items[1].weight,next);
            $(this).parent().siblings('.right1, .right2').find('[name="submission"]').show();
            $(this).prop('disabled', true);
        }else if($(this).val()=='discussion'){            
            part_sel(items[2].weight,next);
            $(this).parent().siblings('.right1, .right2').find('[name="submission"]').show();
            $(this).prop('disabled', true);
        }else if($(this).val()=='resource'){
            part_sel(items[0].weight,next);
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