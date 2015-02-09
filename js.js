var num_of_resources, num_of_activities,
    cons_weighted_score,
    multiplier,sum,
    resource_estimated_no = 2,
    activity_estimated_no = 5,
    expected = 0,
	student,
    student1 = 0,
    student2 = 0;
    var basket=0;
    var basket1 = 0;
    var basket2 = 0;
    var basketminus3;  
$(document).ready(function(){
	//function for left class's tree image
	function treeMain(){
		    if(expected<=100){
                basket=0;
                document.getElementById("container_left").innerHTML = "<img src=' "+ Math.round(expected) +".png'>";
            }else{
                basket = parseInt((expected - 80) / 20);
                console.log('basket :'+ basket);
                document.getElementById("container_left").innerHTML = "<img src=' "+ Math.round(80 +( expected % 20)) +".png'>"; 

             }
			}
			
	//function for right1 and right2 class's tree image		
	function tree1(student,num){
		if(student<=100){
                basket=0;
				basket1=basket;
				basket2=basket;
                 document.getElementById("container"+num).innerHTML = "<img src=' "+ Math.round(student) +".png'>";
            }else{                              
                basket = parseInt((student - 80) / 20);
				basket1=basket;
				basket2=basket;
                console.log('basket1 :'+ basket1);
                console.log('basket2 :'+ basket2);
                document.getElementById("container"+num).innerHTML = "<img src=' "+ Math.round(80 +( student % 20)) +".png'>";      
            }
			}
	
		//function to hide or show the baskets
    function Basket(basket,v){
        if(basket<=0){                
				$('#basket'+v +' .e_basket1, .e_basket2, .e_basket3, .sum_of_basket').hide();
        }else{
            if(basket==1){
                $('#basket'+v +' .e_basket1').show();
                $('#basket'+v +' .e_basket2, .e_basket3, .sum_of_basket').hide();
            }else if(basket==2){
                $('#basket'+v +' .e_basket1').show();
                $('#basket'+v +' .e_basket2').show();                    
                $('#basket'+v +' .e_basket3, .sum_of_basket').hide();
            }else if(basket==3){
                $('#basket'+v +' .e_basket1').show();
                $('#basket'+v +' .e_basket2').show();
                $('#basket'+v +' .e_basket3').show();
                $('#basket'+v +' .sum_of_basket ').hide();
            }else if(basket>3){
                $('#basket'+v +' .e_basket1').show();
                $('#basket'+v +' .e_basket2').show();
                $('#basket'+v +' .e_basket3').show();
                $('#basket'+v +' .sum_of_basket ').show();
                 basketminus3 = basket-3;
                $('#basket'+v +' .sum_of_basket  h3').html('and '+basketminus3+ ' more.'); 

            }
        }
    }

	function mainScore(){
			$('#main_score span:first').html( Math.round((expected - 4)/multiplier));
            $('#main_score span:eq(1)').html(Math.round((expected-4)*100)/100);
            $('#main_score span:eq(2)').html(Math.round(expected*100 )/100);
	}
	
	function studentScore(student,value,num){
				if((Math.round((Math.round(student) - value)/multiplier))<0){
                     $('#student'+num+'_score span:first').html(0);
                }else{
                    $('#student'+num+'_score span:first').html(Math.round((Math.round(student) - value)/multiplier));
                }                   
                if((Math.round((Math.round(student)-value)*100)/100)<0){
                     $('#student'+num+'_score span:eq(1)').html(0);
                }else{
                    $('#student'+num+'_score span:eq(1)').html(Math.round((Math.round(student)-value)*100)/100);
                }
                if((Math.round(student*100 )/100)<0){
                     $('#student'+num+'_score span:eq(2)').html(0);
                }else{
                    $('#student'+num+'_score span:eq(2)').html(Math.round(student*100 )/100);
                }
            }
	
	function login(value,num,nxt){
			if(value==4){
                student = ((multiplier*cons_weighted_score)/20);
            }else if(value==3){
                student = ((multiplier*cons_weighted_score)/30);
            }else if(value==2){
                student = ((multiplier*cons_weighted_score)/50);
            }else{
                student = 0;
            }
            (nxt).html(value);
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
			student1=student; student2=student;
			}	
		
		function select(num){
			var value = $('.right'+num+' .loginday').val();
			if(value==4){
                student = ((multiplier*cons_weighted_score)/20);
            }else if(value==3){
                student = ((multiplier*cons_weighted_score)/30);
            }else if(value==2){
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
			student1=student; student2=student;
			}	
		
		
		
	//toggles the table's child row on and off
    $('table tr:first-child').click(function(){
        $(this).siblings().toggle();
    });
    $('#go').hide();
    $('#activities, #resources, #discussions').on('input',function(){
        num_of_resources = $('#resources').val();
        num_of_activities = $('#activities').val();    
        num_of_discussion = $('#discussions').val();     
         if(num_of_activities && num_of_resources && num_of_discussion){          
            $('#go').show();
         }
    });
    
    $('body').on('click','#go',function(){       
        num_of_resources = $('#resources').val();
        num_of_activities = $('#activities').val();      
        num_of_discussion = $('#discussions').val();      
        $('#wrapper').hide();
        if(num_of_activities && num_of_resources){ 
            $('#go').hide();  
            $('#wrapper').show();
            $('#no_of_resources').text(num_of_resources);
            $('#no_of_activities').text(num_of_activities);
            $('#no_of_discussions').text(num_of_discussion);
            $('#weighted_score_resources').text('2 X '+num_of_resources+' = '+2*num_of_resources);
            $('#weighted_score_activities').text('5 X '+num_of_activities+' = '+5*num_of_activities);
            $('#weighted_score_discussions').text('5 X '+num_of_discussion+' = '+5*num_of_discussion);
            sum = (2*num_of_resources)+(5*num_of_activities)+(5*num_of_discussion);
            $('#weighted_score').text(sum);

            cons_weighted_score = sum * 75 / 100;
            $('#cons_weighted_score').text(cons_weighted_score); //+' ( 75% of ('+2*num_of_resources+' + '+ 5*num_of_activities+'))'
            $('#multiplier').text(Math.round((80/cons_weighted_score)*100)/100);

            multiplier = 80/cons_weighted_score;
            expected = (multiplier*cons_weighted_score)/20;
            console.log('expected : '+expected);    
            mainScore();
            $('#student1_score span:first').html(0);
            $('#student1_score span:eq(1)').html(0);
            $('#student1_score span:eq(2)').html(0);
            $('#student2_score span:first').html(0);
            $('#student2_score span:eq(1)').html(0);
            $('#student2_score span:eq(2)').html(0);
        }

			treeMain();	//calling function for left class's tree image
            tree1(student1,1);	//calling function for right1 class's tree image
			tree1(student2,2);    //calling function for right2 class's tree image    
            Basket(basket,'');	
            Basket(basket2,2);
            Basket(basket1,1);

    });

	
    $('#wrapper').append($('.inner-wrapper').eq(1).clone());	/*clones the 2nd element that uses inner-wrapper class that will show the dropdown of class left*/
    $('.inner-wrapper:last').show();
    $('.inner-wrapper:last #delete').hide();    


// delete particular //when clicking on the delete button
    $('body').on("click","#delete:visible",function(){       
        $(this).parent().parent().find('select:visible').each(function(){   /*traversing through the dropdown of class left*/            
            if(($(this).val()=='activity') || ($(this).val()=='discussion')){
                expected -= 5*multiplier;
            }else if($(this).val()=='resource'){
                expected -= 2*multiplier;
            }else if($(this).parent().hasClass('right1')){			/* checks if the parent class have right1 class*/
				var val=$(this).val();
				student1 -= val*multiplier;				
                studentScore(student1,val,1);
            }else if($(this).parent().hasClass('right2')){
                var val1=$(this).val();
				student2 -= val1*multiplier;
                studentScore(student2,val1,2);          
            }            
        });
			
			treeMain();
            tree1(student1,1);
            tree1(student2,2); 
            Basket(basket,'');
            Basket(basket2,2);
            Basket(basket1,1);
            mainScore();

       $(this).parent().parent().remove();    
    });

// particular select// traversing through the selected option in dropdown of left class
    $('body').on("change",".selected_particular",function(){
        
        if($(this).val()=='activity' || $(this).val()=='discussion'){
            $('.inner-wrapper:last #delete').show();
            $('#wrapper').append($('.inner-wrapper:last').clone());  
            $('.inner-wrapper:last #delete').hide();
            $(this).parent().find('[name=typeactivity]').show();
            $(this).parent().siblings('.right1, .right2').find('[name="submission"]').show();
            $(this).parent().siblings('.right1, .right2').find('[name="viewed"]').hide();
            $(this).parent().find('[name=typeresourse]').hide();
            $(this).prop('disabled', true);
            expected += 5*multiplier;
            console.log('expected : '+expected);           
            $(this).next().html('5');
        }else if($(this).val()=='resource'){
            $('.inner-wrapper:last #delete').show();
            $('#wrapper').append($('.inner-wrapper:last').clone());  
            $('.inner-wrapper:last #delete').hide();
            $(this).parent().find('[name=typeresourse]').show();
            $(this).parent().siblings('.right1, .right2').find('[name="submission"]').hide();
            $(this).parent().siblings('.right1, .right2').find('[name="viewed"]').show();
            $(this).parent().find('[name=typeactivity]').hide();
            $(this).prop('disabled', true);
            expected += 2*multiplier;
            console.log('expected : '+expected);
            $(this).next().html('2');
        }else if($(this).val()=='new_week'){
            $('<div class="new_week">New week started</div>').insertAfter( $('.inner-wrapper:last '));
            $('.inner-wrapper:last').clone().insertAfter($('.new_week:last'));  
            $(this).parent().parent().remove();             
        }
         
			treeMain();
			Basket(basket,'');
            mainScore();
    });

//login time
    $('body').on("change",".loginday",function(){
        if($(this).parent().hasClass('right1')){
			var val=$(this).val();
			var next=$(this).next();
            login(val,1,next);
			
            console.log('student1 : '+student1);
            tree1(student1,1);
            Basket(basket1,1);
			
            $('#student1_score span:first').html(Math.round((student1 - val)/multiplier));
            if(student1){
                $('#student1_score span:eq(1)').html(Math.round(student1-val));
            }else{
                $('#student1_score span:eq(1)').html(0);
            }
            $('#student1_score span:eq(2)').html(Math.round(student1));
        }
		else if($(this).parent().hasClass('right2')){
			var val=$(this).val();
			var next=$(this).next();
            login(val,2,next);

            console.log('student2 : '+student2);
            tree1(student2,2); 
            Basket(basket2,2);
            $('#student2_score span:first').html(Math.round((student2 - $(this).val())/multiplier));
            if(student2){
                $('#student2_score span:eq(1)').html(Math.round(student2-$(this).val()));
            }else{
                $('#student2_score span:eq(1)').html(0);
            }
            $('#student2_score span:eq(2)').html(Math.round(student2 ));
        }                       
    });    

// particular type
    $('body').on("change",".submission,.viewed",function(){
        if($(this).parent().hasClass('right1')){         
           var value;
		   select(1);
			
		   console.log(student1);        
            tree1(student1,1);
            Basket(basket1,1);
            $('#student1_score span:first').html(Math.round((Math.round(student1) - value)/multiplier));
            $('#student1_score span:eq(1)').html(Math.round((Math.round(student1)-value)*100)/100);
            $('#student1_score span:eq(2)').html(Math.round(student1*100 )/100);
        }else{
           select(2);

			tree1(student2,2);
			console.log(student2);   
            Basket(basket2,2);
            $('#student2_score span:first').html(Math.round((Math.round(student2) - value)/multiplier));
            $('#student2_score span:eq(1)').html(Math.round((Math.round(student2)-value)*100)/100);
            $('#student2_score span:eq(2)').html(Math.round(student2*100 )/100);
        }
        $(this).next().html($(this).val());
    });
});        