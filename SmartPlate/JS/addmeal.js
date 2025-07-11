// Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navList = document.getElementById('list');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navList.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !navList.contains(e.target)) {
                    navList.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }