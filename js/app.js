new Vue({
	el:'#app',
	data:{
		isActive:false,
		position:false,
		user:{
			profilePic: "img/me.jpg",
			name:'Akhil Abothu',
			age:'26',
			city:'Hyderabad',
			email:'abothuakhil@gmail.com',
			phone:'(+91) 8919059351',
			role:'Associate Consultant at Capgemini',
			resume:'resume/Akhil Abothu.pdf',
			bio:'4+ Years of Experience in Software Development, Software Engineer Lead with Hands-on Experience in SpringBoot, React, Spring ORM, MYSQL, Jenkins, and Strong Hands-on Experience in Spring MVC, Java, Vue.js, HTML, CSS, JavaScript, Bootstrap, JSON.'
		},
		workedOn:{
			title:"WORKED ON",
			works:[{"title":"Front End","icon":"fa-laptop","technologies":["Vue.js","React"]},{"title":"Back End","icon":"fa-server","technologies":["Java","Spring MVC","Spring Boot"]},{"title":"Database","icon":"fa-database","technologies":["MySQL"]}]
			
		},
		education:{
			title:"EDUCATION",
			educations:[
				{
					"school":"Sai Spurthi Institute of Technology (JNTUH)",
					"specification":"Bachelor of Technology in Computer Science and Engineering",
					"period":"2013-2017",
				},
				{
					"school":"Sri C.V Raman Junior College (BIEAP)",
					"specification":"Intermediate (MPC)",
					"period":"2011-2013",
				},
				{
					"school":"SZ.P.S.S Nacharam High School (BSEAP)",
					"specification":"SSC",
					"period":"2010-2011",
				}
			]
		},
		experience:{
			title:"EXPERIENCE",
			experiences:[
				{
					"company":"Capgemini",
					"designation":"Associate Consultant",
					"period":"2021 February- Present",
					"description":""
				},
				{
					"company":"Gourivenkat Soft Solutions Private Limited",
					"designation":"Associate Software Developer",
					"period":"2018 June- 2021 February",
					"description":""
				},
				{
					"company":"Wevio India Info Solutions Private Limited",
					"designation":"Software Engineer",
					"period":"2017 October - 2018 May",
					"description":""
				},
				{
					"company":"TATA Institute of Social Sciences",
					"designation":"Service Engineer",
					"period":"2017 June- 2017 September",
					"description":""
				}
			]
		},
		certification:{
			title:"CERTIFICATIONS",
			certifications:[
				{
					"certificateName":"Microsoft Certified : Azure Fundamentals",
					"sponsor":"Microsoft",
					"year":"2021",
					"certificates":[{"title":"Azure Certificate","link":"certificates\Microsoft_Azure.pdf"}]
				},
				{
					"certificateName":"IT Essentials",
					"sponsor":"Cisco",
					"year":"2017",
					"certificates":[{"title":"Letter","link":"certificates\AKHILABOTHU-ITE-BATCH-02-CISCO Letter.pdf"},{"title":"Certificate","link":"certificates\AKHILABOTHU-ITE-BATCH-02-CISCOCertificate.pdf"}]
				},
				{
					"certificateName":"Database Design & Database Programming with SQL",
					"sponsor":"Orcle & TASK",
					"year":"2016",
					"certificates":[{"title":"Database Design","link":"certificates\ABOTHU-AKHIL-DATABASE-DESIGN-ORACLE-TASK.pdf"},{"title":"Database Programming","link":"certificates\ABOTHU-AKHIL-DATABASE-PROGRAMMING-WITH-SQL-ORACLE-TASK.pdf"}]
				},
				{
					"certificateName":"Microsoft Technology Associate Database Fundamentals",
					"sponsor":"Microsoft",
					"year":"2016",
					"certificates":[{"title":"MTA Certificate","link":"certificates\MTACertificate.pdf"}]
				}
			]
		},
		skill:{
			"title":"Skills",
			skills:[
				{
				"name":"HTML5",
				"percentage":"90%",
				"nameColor":"#e44d26",
				"progressColor":"#f16529"
			},
			{
				"name":"Core Java",
				"percentage":"70%",
				"nameColor":"#009aff",
				"progressColor":"#65b6ea"
			},
			{
				"name":"CSS3",
				"percentage":"70%",
				"nameColor":"#264de4",
				"progressColor":"#2965f1"
			},
			
			{
				"name":"Servlet",
				"percentage":"60%",
				"nameColor":"#4d4d4d",
				"progressColor":"#757171"
			},
			{
				"name":"JavaScript",
				"percentage":"70%",
				"nameColor":"#d6ba33",
				"progressColor":"#fdde39"
			},
			{
				"name":"JSP",
				"percentage":"60%",
				"nameColor":"#000",
				"progressColor":"#565050"
			},
			{
				"name":"React",
				"percentage":"30%",
				"nameColor":"#183555",
				"progressColor":"#346092"
			},
			{
				"name":"SpringMVC",
				"percentage":"70%",
				"nameColor":"#78c158",
				"progressColor":"#97de78"
			},
			{
				"name":"Vue.js",
				"percentage":"40%",
				"nameColor":"#41b883",
				"progressColor":"#6ddaa9"
			},
			{
				"name":"SpringBoot",
				"percentage":"40%",
				"nameColor":"#78c158",
				"progressColor":"#97de78"
			},

		]
		}
	},
	methods:{
		changeNav:function(){
			this.isActive = !this.isActive;
			console.log(this.isActive)
		}
	}
	
});