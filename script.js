
document.addEventListener('DOMContentLoaded', () => {
    // 1. 侧边栏导航切换
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active-section'));

            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active-section');
        });
    });

    // 2. 技能卡片滑块逻辑 (循环滚动版)
    const track = document.getElementById('skillsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cards = Array.from(document.querySelectorAll('.skill-card'));
    
    // 为了实现无缝循环，我们需要克隆首尾卡片
    // 克隆第一张放到最后，克隆最后一张放到最前
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);
    
    track.appendChild(firstClone);
    track.insertBefore(lastClone, cards[0]);
    
    // 重新获取所有卡片（包含克隆的）
    const allCards = document.querySelectorAll('.skill-card');
    
    let currentIndex = 1; // 从第二张开始（因为第一张是克隆的最后一张）
    let isTransitioning = false;
    
    const cardWidth = 300; // 卡片基础宽度
    const gap = 32; // gap-8 is 2rem = 32px
    const totalOriginalCards = cards.length;

    // 初始化位置
    updateSliderPosition(false);

    function updateSliderPosition(animate = true) {
        if (!animate) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        }
        
        const moveAmount = -(currentIndex * (cardWidth + gap));
        track.style.transform = `translateX(${moveAmount}px)`;
    }

    function handleTransitionEnd() {
        isTransitioning = false;
        // 如果到了克隆的最后一张（实际上是第一张的内容），跳回真正的第一张
        if (currentIndex >= totalOriginalCards + 1) {
            currentIndex = 1;
            updateSliderPosition(false);
        }
        // 如果到了克隆的第一张（实际上是最后一张的内容），跳回真正的最后一张
        if (currentIndex <= 0) {
            currentIndex = totalOriginalCards;
            updateSliderPosition(false);
        }
    }

    track.addEventListener('transitionend', handleTransitionEnd);

    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updateSliderPosition(true);
    });

    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        updateSliderPosition(true);
    });

    // 窗口大小改变时重新计算（简单处理，实际项目中可能需要更复杂的响应式逻辑）
    window.addEventListener('resize', () => {
        updateSliderPosition(false);
    });

    // 3. 表单提交模拟
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

    // 4. 简单的 Glitch 文字随机扰动
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
