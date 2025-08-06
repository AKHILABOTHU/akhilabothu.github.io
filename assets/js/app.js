  fetch('./assets/data/data.json')
    .then(response => response.json())
    .then(data => {
      emailjs.init("lmtctuRbX4cLaf5JL"); // Replace with your actual public key

      const { createApp } = Vue;

      createApp({
        data() {
          return {
            ...data,
            formStatus: '',
            statusMessage: '',
            showResumeDropdown: false,
            currentRole: '',
            animateSkills: false,
            darkMode: false,
            skillRecommendation: '',
            contactForm: {
              name: '',
              email: '',
              subject: '',
              message: ''
            }
          };
        },
        computed: {
          experiencePairs() {
            const pairs = [];
            for (let i = 0; i < this.experiences.length; i += 2) {
              pairs.push({
                left: this.experiences[i],
                right: this.experiences[i + 1] || null
              });
            }
            return pairs;
          },
          experienceYears() {
            const startDate = new Date("2017-10-13");
            const today = new Date();
            const diffYears = today.getFullYear() - startDate.getFullYear();
            const monthDiff = today.getMonth() - startDate.getMonth();
            const years = monthDiff < 0 ? diffYears - 1 : diffYears;
            return `${years}`;
          },
          currentYear() {
            return new Date().getFullYear();
          }
        },
        mounted() {
          document.addEventListener('click', this.handleClickOutside);

          this.animateRole();
          this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            this.darkMode = e.matches;


          });

          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                this.animateSkills = true;
              }
            });
          });

          const skillsSection = document.getElementById('skills');
          if (skillsSection) {
            observer.observe(skillsSection);
          }

          // Hide loader and show app
          document.getElementById('loader').style.display = 'none';
          document.getElementById('app').style.display = 'block';
        },
        methods: {
          toggleResumeDropdown() {
            this.showResumeDropdown = !this.showResumeDropdown;
          },
          scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
              behavior: 'smooth'
            });
          },
          handleClickOutside(event) {
            const container = document.querySelector('.d-flex.mb-5');
            if (container && !container.contains(event.target)) {
              this.showResumeDropdown = false;
            }
          },
          getAIRecommendation() {
            const recommendations = [
              "Based on your strong Java and Vue.js skills, I recommend exploring Spring WebFlux for reactive programming and Nuxt.js for server-side rendering to enhance your full-stack capabilities.",
              "Your AI interest is promising! Consider diving deeper into LangChain for building AI applications and exploring vector databases like Pinecone for advanced RAG implementations.",
              "To complement your backend expertise, learning Docker Swarm or Kubernetes would be valuable for container orchestration, and exploring GraphQL could enhance your API development skills.",
              "Your frontend skills are solid! Consider learning TypeScript for better code maintainability and exploring modern state management solutions like Pinia for Vue.js applications.",
              "Given your database experience, learning about time-series databases like InfluxDB and exploring database optimization techniques would add significant value to your skill set."
            ];
            this.skillRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
          },
          sendMessage() {

            if (!recaptchaResponse) {
    Swal.fire({
      icon: 'warning',
      title: 'Please verify',
      text: 'Please confirm you are not a robot.',
      confirmButtonColor: '#f0ad4e'
    });
    return;
  }

            const { name, email, subject, message } = this.contactForm;

            if (!name || !email || !subject || !message) {
              Swal.fire({
                icon: 'warning',
                title: 'All fields are required!',
                text: 'Please fill out every field before submitting.',
                confirmButtonColor: '#f0ad4e'
              });
              return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
              Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
                confirmButtonColor: '#d33'
              });
              return;
            }

            const templateParams = { name, email, subject, message };

            emailjs.send("service_mg3q0ne", "template_929eyue", templateParams)
              .then(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Message Sent!',
                  text: 'Thank you for reaching out. I’ll get back to you soon.',
                  confirmButtonColor: '#3085d6'
                });
                this.contactForm = { name: '', email: '', subject: '', message: '' };
              })
              .catch((error) => {
                console.error("EmailJS error:", error);
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong while sending the message.',
                  confirmButtonColor: '#d33'
                });
              });
          },
          animateRole() {
            const roles = [
              'Full Stack Developer',
              'Java Spring Expert',
              'Vue.js Specialist',
              'AI Enthusiast',
              'Problem Solver'
            ];
            let currentIndex = 0;
            this.currentRole = roles[currentIndex];
            setInterval(() => {
              currentIndex = (currentIndex + 1) % roles.length;
              this.currentRole = roles[currentIndex];
            }, 3000);
          }
        }
      }).mount('#app');
    })
    .catch((error) => {
      console.error('Failed to load data.json:', error);
      document.getElementById('loader').innerHTML = `
        <div class="text-center">
          <div class="text-danger fw-bold">Failed to load data. Please try again later.</div>
        </div>`;
    });
