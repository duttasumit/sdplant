var num_of_resources, num_of_activities, cons_weighted_score, multiplier,
    resource_estimated_no = 2, activity_estimated_no = 5,
    expected = 0, student1 = 0, student2 = 0;
    var basket=0; var basket0=0; var basket1 = 0; var basket2 = 0;
  
  
$(document).ready(function(){  
	
	//function to show the tree image(size depends on value of student)
	function tree(student,num){
		if(student<=100){
                basket=0;
                 document.getElementById("container"+num).innerHTML = "<img src=' "+ Math.round(student) +".png'>";
            }else{                              
                basket = parseInt((student - 80) / 20);
                document.getElementById("container"+num).innerHTML = "<img src=' "+ Math.round(80 +( student % 20)) +".png'>";      
            }
	}
			
	//function to show number of baskets		
    function Basket(basket,v){
		const Max=3; var i=1; var basketminus3;
		for(;i<=basket;i++){
			$('#basket'+v +' .e_basket'+i+'').show();
		}
		while(i<=Max){
			$('#basket'+v +' .e_basket'+i+'').hide();
			i++;
		}
		if(basket<=Max){
			$('#basket'+v +' .sum_of_basket').hide();
		}
		else {
			basketminus3=basket-3;
			$('#basket'+v +' .sum_of_basket').show();
			$('#basket'+v +' .sum_of_basket  h3').html('and '+basketminus3+ ' more.');
		}
        
    }
	
	//these funtions will show the values of promptness, normalised score and login bonus 
	function mainScore(){
			$('#main_score span:first').html( Math.round((student0 - 4)/multiplier));
            $('#main_score span:eq(1)').html(Math.round((student0-4)*100)/100);
            $('#main_score span:eq(2)').html(Math.round(student0*100 )/100);
	}
    
	function st_Score(student,val,num){
			$('#student'+num+'_score span:first').html(Math.round((student - val)/multiplier));
            $('#student'+num+'_score span:eq(1)').html(Math.round(student-val));
            $('#student'+num+'_score span:eq(2)').html(Math.round(student));
	}
	
	function studentScore(student,val,num){
			if((Math.round((Math.round(student) - val)/multiplier))<0){
                     $('#student'+num+'_score span:first').html(0);
                }else{
                    $('#student'+num+'_score span:first').html(Math.round((Math.round(student) - val)/multiplier));
                }                   
                if((Math.round((Math.round(student)-val)*100)/100)<0){
                     $('#student'+num+'_score span:eq(1)').html(0);
                }else{
                    $('#student'+num+'_score span:eq(1)').html(Math.round((Math.round(student)-val)*100)/100);
                }
                if((Math.round(student*100 )/100)<0){
                     $('#student'+num+'_score span:eq(2)').html(0);
                }else{
                    $('#student'+num+'_score span:eq(2)').html(Math.round(student*100 )/100);
                }
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
            $('.right'+num+' .submission:not(:first)').each(function(){
            if(isFinite($(this).val())){
                student += $(this).val()*multiplier;
            }                   
            });
            $('.right'+num+' .viewed:not(:first)').each(function(){
                if(isFinite($(this).val())){
                    student += $(this).val()*multiplier;
                }
            });
			console.log('student(login) : '+student);
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
    
    $('body').on('click','#go',function(){       
        num_of_resources = $('#resources').val();
        num_of_activities = $('#activities').val();      
        num_of_discussion = $('#discussions').val();      
        $('#wrapper').hide();
        if((num_of_activities>=0) && (num_of_resources>=0) && (num_of_discussion>=0)){ 
            $('#go').hide();  
            $('#wrapper').show();
            $('#weighted_score_resources').text('2 X '+num_of_resources+' = '+2*num_of_resources);
            $('#weighted_score_activities').text('5 X '+num_of_activities+' = '+5*num_of_activities);
            $('#weighted_score_discussions').text('5 X '+num_of_discussion+' = '+5*num_of_discussion);
            cons_weighted_score = (2*num_of_resources)+(5*num_of_activities)+(5*num_of_discussion);
            $('#weighted_score').text(cons_weighted_score);

            cons_weighted_score = cons_weighted_score * 75 / 100;
            $('#cons_weighted_score').text(cons_weighted_score); //+' ( 75% of ('+2*num_of_resources+' + '+ 5*num_of_activities+'))'
            $('#multiplier').text(Math.round((80/cons_weighted_score)*100)/100);

            multiplier = 80/cons_weighted_score;
            student0 = (multiplier*cons_weighted_score)/20;
            console.log('student0 : '+student0);    
            mainScore();
            $('#student1_score span:first').html(0);
            $('#student1_score span:eq(1)').html(0);
            $('#student1_score span:eq(2)').html(0);
            $('#student2_score span:first').html(0);
            $('#student2_score span:eq(1)').html(0);
            $('#student2_score span:eq(2)').html(0);
        }else{ alert("please enter positive values");}

			tree(student0,0); basket0=basket;
			tree(student1,1); basket2=basket;
			tree(student2,2); basket1=basket;
            Basket(basket0,'');
            Basket(basket2,2);
            Basket(basket1,1);

    });
   
    $('#wrapper').append($('.inner-wrapper').eq(1).clone());
    $('.inner-wrapper:last').show();
    $('.inner-wrapper:last #delete').hide();    

// delete particular
    $('body').on("click","#delete:visible",function(){       
        $(this).parent().parent().find('select:visible').each(function(){               
            if($(this).val()=='activity'){
                student0 -= 5*multiplier;
            }else if($(this).val()=='resource'){
                student0 -= 2*multiplier;
            }else if($(this).val()=='discussion'){
                student0 -= 5*multiplier;
            }else if($(this).parent().hasClass('right1')){
                student1 -= $(this).val()*multiplier;
				var value=$(this).val();
				studentScore(student1,value,1);                
            }else if($(this).parent().hasClass('right2')){
                student2 -= $(this).val()*multiplier;
                var value1=$(this).val();
				studentScore(student2,value1,2);            
            }            
        });
			tree(student0,0); basket0=basket;
			tree(student1,1); basket1=basket;
			tree(student2,2); basket2=basket;
            Basket(basket0,'');
            Basket(basket2,2);
            Basket(basket1,1);
            mainScore();
       $(this).parent().parent().remove();    
    });

// particular select
    $('body').on("change",".selected_particular",function(){
        
        if($(this).val()=='activity' || $(this).val()=='discussion'){
            $('.inner-wrapper:last #delete').show();
            $('#wrapper').append($('.inner-wrapper:last').clone());  
            $('.inner-wrapper:last #delete').hide();
            $(this).parent().siblings('.right1, .right2').find('[name="submission"]').show();
            $(this).prop('disabled', true);
            student0 += 5*multiplier;
            console.log('student0 : '+student0);           
            $(this).next().html('5');
        }else if($(this).val()=='resource'){
            $('.inner-wrapper:last #delete').show();
            $('#wrapper').append($('.inner-wrapper:last').clone());  
            $('.inner-wrapper:last #delete').hide();
            $(this).parent().siblings('.right1, .right2').find('[name="viewed"]').show();
            $(this).prop('disabled', true);
            student0 += 2*multiplier;
            console.log('student0 : '+student0);
            $(this).next().html('2');
        }else if($(this).val()=='new_week'){
            $('<div class="new_week">New week started</div>').insertAfter( $('.inner-wrapper:last '));
            $('.inner-wrapper:last').clone().insertAfter($('.new_week:last'));  
            $(this).parent().parent().remove();             
        }
			tree(student0,0);
			basket0=basket;
            Basket(basket0,'');
            mainScore();
    });

//login time
    $('body').on("change",".loginday",function(){
        if($(this).parent().hasClass('right1')){
            var value=$(this).val();
			login(value,1);
			student1=student;
            console.log('student1 : '+student1);
            tree(student1,1);
			basket1=basket;
            Basket(basket1,1);
			st_Score(student1,value,1);
        }else if($(this).parent().hasClass('right2')){
            var value=$(this).val();
			login(value,2);
			student2=student;
            console.log('student2 : '+student2);
            tree(student2,2);
			basket2=basket;
            Basket(basket2,2);
			st_Score(student2,value,2);
        }
		$(this).next().html($(this).val());
    });    

// particular type
    $('body').on("change",".submission,.viewed",function(){
        if($(this).parent().hasClass('right1')){         
			var value = $('.right1 .loginday').val();
			login(value,1);          
			student1=student;
			console.log(student1);        
			tree(student1,1);
			basket1=basket;
			Basket(basket1,1);
            st_Score(student1,value,1);
        }else{
           var value = $('.right2 .loginday').val();
            login(value,2);
			student2=student;
			console.log(student2);
            tree(student2,2);
			basket2=basket;               
            Basket(basket2,2);
            st_Score(student2,value,2);
        }
        $(this).next().html($(this).val());
    });
});        