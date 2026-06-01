
document.addEventListener('DOMContentLoaded', () => {
    // 1. 侧边栏导航切换
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有激活状态
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active-section'));

            // 激活当前点击项
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active-section');
        });
    });

    // 2. 表单提交模拟
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 发送中...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> 发送成功';
                btn.style.borderColor = '#00ff00';
                btn.style.color = '#00ff00';
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.borderColor = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 3. 简单的 Glitch 文字随机扰动
    const glitchTitle = document.querySelector('.glitch-title');
    if (glitchTitle) {
        setInterval(() => {
            if (Math.random() > 0.9) {
                const offset = Math.random() * 4 - 2;
                glitchTitle.style.textShadow = `${offset}px ${offset}px var(--primary)`;
                setTimeout(() => {
                    glitchTitle.style.textShadow = 'none';
                }, 100);
            }
        }, 2000);
    }
});
