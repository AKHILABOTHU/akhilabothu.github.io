new Vue({
	el:'#app',
	data:{
		isActive:false,
		user:{
			name:'Akhil Abothu',
			age:'26',
			city:'Hyderabad',
			email:'abothuakhil@gmail.com',
			phone:'(+91) 8919059351',
			role:'Associate Consultant at Capgemini',
			bio:'4+ Years of Experience in Software Development, Software Engineer Lead with Hands-on Experience in SpringBoot, React, Spring ORM, MYSQL, Jenkins, and Strong Hands-on Experience in Spring MVC, Java, Vue.js, HTML, CSS, JavaScript, Bootstrap, JSON.'
		}
	},
	methods:{
		changeNav:function(){
			this.isActive = !this.isActive;
			console.log(this.isActive)
		}
	}
	
});