/**
 * XodimKPI & Paynet CRM - Sales Page Interactive Logic (v2)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Role Tabs Switching
  const roleTabBtns = document.querySelectorAll('.role-tab-btn');
  const rolePanels = document.querySelectorAll('.role-panel');

  roleTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetRole = btn.getAttribute('data-role');
      
      roleTabBtns.forEach(b => b.classList.remove('active'));
      rolePanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      const targetPanel = document.getElementById(`panel-${targetRole}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      // Pause videos if leaving respective tab
      const xodimVid = document.getElementById('xodimVideoPlayer');
      const kassirVid = document.getElementById('kassirVideoPlayer');
      const rahbarVid = document.getElementById('rahbarVideoPlayer');
      if (xodimVid && targetRole !== 'xodim' && !xodimVid.paused) xodimVid.pause();
      if (kassirVid && targetRole !== 'kassir' && !kassirVid.paused) kassirVid.pause();
      if (rahbarVid && targetRole !== 'rahbar' && !rahbarVid.paused) rahbarVid.pause();
    });
  });

  // 2. Objection Accordion Toggle
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close other accordions for clean mobile viewing
      accordionItems.forEach(i => i.classList.remove('open'));
      
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Monthly Plan Collapsible Toggle
  const toggleMonthlyBtn = document.getElementById('toggle-monthly-plan-btn');
  const monthlyPlanContainer = document.getElementById('monthly-plan-container');

  if (toggleMonthlyBtn && monthlyPlanContainer) {
    toggleMonthlyBtn.addEventListener('click', () => {
      const isOpen = monthlyPlanContainer.classList.contains('open');
      if (isOpen) {
        monthlyPlanContainer.classList.remove('open');
        toggleMonthlyBtn.classList.remove('open');
        const span = toggleMonthlyBtn.querySelector('span');
        if (span) span.textContent = "Oylik obunani ko'rish";
      } else {
        monthlyPlanContainer.classList.add('open');
        toggleMonthlyBtn.classList.add('open');
        const span = toggleMonthlyBtn.querySelector('span');
        if (span) span.textContent = "Oylik obunani yashirish";
        monthlyPlanContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // 3. Discovery Quiz / Audit Calculator
  const quizInputs = document.querySelectorAll('.quiz-input');
  
  function updateQuizResult() {
    const q1 = document.querySelector('input[name="q_branches"]:checked')?.value || '1-5';
    const q2 = document.querySelector('input[name="q_method"]:checked')?.value || 'daftar';
    const q3 = document.querySelector('input[name="q_pain"]:checked')?.value || 'karta';

    // Update active class on label wrappers
    document.querySelectorAll('.quiz-option-label').forEach(label => {
      const radio = label.querySelector('input[type="radio"]');
      if (radio && radio.checked) {
        label.classList.add('active');
      } else {
        label.classList.remove('active');
      }
    });

    const resultTariffBadge = document.getElementById('res-tariff-badge');
    const resultTitle = document.getElementById('res-title');
    const resultDesc = document.getElementById('res-desc');
    const statTejam = document.getElementById('res-stat-tejam');
    const statVaqt = document.getElementById('res-stat-vaqt');
    const statXato = document.getElementById('res-stat-xato');

    let recommendedPlan = "Oylik tarif (500 000 so'm)";
    let targetPlanValue = "oylik";
    let estSavings = "1 200 000 so'm / oy";
    let estTime = "1-2 soat / kun";

    if (q1 === '1-5') {
      recommendedPlan = "Oylik tarif (500 000 so'm/oy)";
      targetPlanValue = "oylik";
      estSavings = "1 500 000 so'm / oy";
      estTime = "1.5 soat / kun";
    } else if (q1 === '6-15') {
      recommendedPlan = "1 Yillik tarif (15 xodim — 4 800 000 so'm/yil)";
      targetPlanValue = "yillik";
      estSavings = "3 800 000 so'm / oy";
      estTime = "2.5 soat / kun";
    } else if (q1 === '16-25') {
      recommendedPlan = "1 Yillik tarif (25 xodim — 6 240 000 so'm/yil)";
      targetPlanValue = "yillik_25";
      estSavings = "5 500 000 so'm / oy";
      estTime = "3 soat / kun";
    } else {
      recommendedPlan = "5 Yillik VIP Litsenziya (14 900 000 so'm)";
      targetPlanValue = "vip";
      estSavings = "7 500 000+ so'm / oy";
      estTime = "3.5+ soat / kun";
    }

    if (resultTariffBadge) resultTariffBadge.textContent = recommendedPlan;
    if (statTejam) statTejam.textContent = estSavings;
    if (statVaqt) statVaqt.textContent = estTime;
    if (statXato) statXato.textContent = "0 ta kassa kamomadi";

    let painMsg = "Karta to'ldirishdagi takroriy xatolar va +3% hisob-kitob butunlay avtomatlashtiriladi.";
    if (q3 === 'sim') {
      painMsg = "5 ta operator bo'yicha 18 xonali seriya qidiruvi bilan birorta ham sim-karta yo'qolmaydi.";
    } else if (q3 === 'kassa') {
      painMsg = "So'm va dollar alohida olinadi, rahbar kursi bo'yicha hisoblanib xodimga Telegram chek boradi.";
    } else if (q3 === 'qarz') {
      painMsg = "Xodimlar qarzdorligi avtomatik saqlanib, 8 soatlik jonli lokatsiya bilan intizom ta'minlanadi.";
    }

    const teamLabel = q1 === '1-5' ? '1-5 ta xodim' : (q1 === '6-15' ? '6-15 ta xodim' : (q1 === '16-25' ? '16-25 ta xodim' : '26+ ta xodim'));
    if (resultDesc) {
      resultDesc.innerHTML = `Siz tanlagan <strong>${teamLabel}</strong> hajmiga ko'ra: ${painMsg} Har kuni soat 23:55 da Telegramingizga tayyor kunlik svodka keladi.`;
    }

    // Update modal preselected plan
    const modalPlanSelect = document.getElementById('modal-plan-select');
    if (modalPlanSelect) {
      modalPlanSelect.value = targetPlanValue;
    }

    const resultCtaBtn = document.querySelector('.result-cta-btn');
    if (resultCtaBtn) {
      resultCtaBtn.setAttribute('data-plan', targetPlanValue);
    }
  }

  quizInputs.forEach(input => {
    input.addEventListener('change', updateQuizResult);
  });
  // Initial call
  updateQuizResult();

  // 4. Modal Window Logic
  const modal = document.getElementById('lead-modal');
  const openModalBtns = document.querySelectorAll('.open-modal-trigger');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalPlanSelect = document.getElementById('modal-plan-select');
  const modalPillBadge = document.getElementById('modal-pill-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalSubmitBtn = document.getElementById('modal-submit-btn');

  function updateModalUI(plan) {
    if (plan === 'trial_7days') {
      if (modalPillBadge) {
        modalPillBadge.textContent = '🎁 100% Bepul Test-Drive';
        modalPillBadge.className = 'pill-badge pill-emerald';
      }
      if (modalTitle) modalTitle.textContent = '7 Kunlik Bepul Sinovni Ulab Berish';
      if (modalDesc) {
        modalDesc.textContent = "Tez fursatda 7 kunlik to'liq litsenziyani bepul ulab beramiz. Karta yoki to'lov talab qilinmaydi!";
      }
      if (modalSubmitBtn) {
        modalSubmitBtn.innerHTML = '🎁 7 Kunlik Bepul Sinovni Boshlash';
        modalSubmitBtn.className = 'btn btn-emerald';
      }
    } else {
      if (modalPillBadge) {
        modalPillBadge.textContent = 'Tezkor Bog\'lanish';
        modalPillBadge.className = 'pill-badge pill-cyan';
      }
      if (modalTitle) modalTitle.textContent = 'Buyurtma va Demoga Yozilish';
      if (modalDesc) {
        modalDesc.textContent = "Tez fursatda siz bilan bog'lanamiz va shaxobchangizga ulab beramiz.";
      }
      if (modalSubmitBtn) {
        modalSubmitBtn.innerHTML = '🚀 Yuborish & Dasturchi Bilan Bog\'lanish';
        modalSubmitBtn.className = 'btn btn-amber';
      }
    }
  }

  function openModal(plan = null) {
    const targetPlan = plan || (modalPlanSelect ? modalPlanSelect.value : 'yillik');
    if (modalPlanSelect && plan) {
      modalPlanSelect.value = plan;
    }
    updateModalUI(targetPlan);

    // Hide nudge toast if open
    hideNudgeToast();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalPlanSelect) {
    modalPlanSelect.addEventListener('change', () => {
      updateModalUI(modalPlanSelect.value);
    });
  }

  // Bind all modal trigger buttons (delegated or static)
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-modal-trigger');
    if (trigger) {
      e.preventDefault();
      const plan = trigger.getAttribute('data-plan') || 'trial_7days';
      openModal(plan);
    }
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // 5. Smart Floating Downsell Toast (7 Kunlik Bepul Sinov Taklifi)
  const nudgeToast = document.getElementById('trial-nudge-toast');
  const nudgeCloseBtn = document.getElementById('trial-nudge-close');
  let nudgeShown = false;

  function showNudgeToast() {
    if (nudgeShown || sessionStorage.getItem('trial_nudge_dismissed') === 'true') return;
    if (modal && modal.classList.contains('active')) return;

    if (nudgeToast) {
      nudgeToast.classList.add('active');
      nudgeToast.setAttribute('aria-hidden', 'false');
      nudgeShown = true;
    }
  }

  function hideNudgeToast() {
    if (nudgeToast) {
      nudgeToast.classList.remove('active');
      nudgeToast.setAttribute('aria-hidden', 'true');
    }
  }

  if (nudgeCloseBtn) {
    nudgeCloseBtn.addEventListener('click', () => {
      hideNudgeToast();
      sessionStorage.setItem('trial_nudge_dismissed', 'true');
    });
  }

  // Faqat foydalanuvchi sahifa oxiriga (footer / oxirgi bo'limga) yetgandagina qalqib chiqish
  window.addEventListener('scroll', () => {
    if (nudgeShown) return;
    const scrollPos = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - 400; // Sahifa oxiriga 400px yetganda

    if (scrollPos >= threshold) {
      showNudgeToast();
    }
  }, { passive: true });

  // 6. Asosiy Lead (Lid) Yuborish Mantiqi (Bosh Rahbar Telegramiga & CRM Bazasiga)
  const CRM_API_URL = "https://crm.xodimkpi.uz/api/leads";

  async function sendLeadToCRM(payload, submitBtn, successCallback) {
    const originalText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '⏳ Yuborilmoqda...';
    }

    try {
      const response = await fetch(CRM_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        if (successCallback) successCallback();
        alert(`✅ Rahmat, ${payload.name}!\n\nSizning so'rovingiz qabul qilindi. Bosh rahbarimiz tez orada siz bilan bog'lanadi!`);
      } else {
        throw new Error(data.detail || data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      console.warn("API orqali yuborishda ogohlantirish, Telegram fallback ishga tushdi:", err);
      // Favqulodda holatda Telegram orqali yuborish
      const fallbackUrl = `https://t.me/doniyornodirov?text=${encodeURIComponent(
        `🚀 Yangi So'rov (XodimKPI)\n\n👤 Ism: ${payload.name}\n📞 Tel: ${payload.phone}\n📱 Telegram: ${payload.telegram || ''}\n📦 Tarif: ${payload.plan}`
      )}`;
      window.open(fallbackUrl, '_blank');
      alert(`Rahmat, ${payload.name}! Sizning so'rovingiz qabul qilindi.`);
      if (successCallback) successCallback();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }
  }

  // Modal orqali lid yuborish
  const leadForm = document.getElementById('lead-submission-form');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const userName = document.getElementById('field-company')?.value || '';
      const leaderTg = document.getElementById('field-telegram')?.value || '';
      const phone = document.getElementById('field-phone')?.value || '';
      const planText = modalPlanSelect ? modalPlanSelect.options[modalPlanSelect.selectedIndex].text : 'Oylik tarif';
      const submitBtn = document.getElementById('modal-submit-btn');

      const payload = {
        name: userName,
        phone: phone,
        telegram: leaderTg,
        plan: planText,
        source: 'xodimkpi.uz (Modal Form)'
      };

      sendLeadToCRM(payload, submitBtn, () => {
        leadForm.reset();
        closeModal();
      });
    });
  }

  // Inline tezkor ulanish formasi
  const inlineForm = document.getElementById('inline-onboard-form');
  if (inlineForm) {
    inlineForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const userName = document.getElementById('inline-comp')?.value || '';
      const leaderTg = document.getElementById('inline-lead-tg')?.value || '';
      const phone = document.getElementById('inline-phone')?.value || '';
      const planElem = document.getElementById('inline-plan');
      const planText = planElem ? planElem.options[planElem.selectedIndex].text : '1 Yillik tarif';
      const submitBtn = inlineForm.querySelector('button[type="submit"]');

      const payload = {
        name: userName,
        phone: phone,
        telegram: leaderTg,
        plan: planText,
        source: 'xodimkpi.uz (Inline Form)'
      };

      sendLeadToCRM(payload, submitBtn, () => {
        inlineForm.reset();
      });
    });
  }

  // 10. Image Lightbox for Real CRM Interface Previews
  window.openLightbox = function(src, title) {
    const modal = document.getElementById('image-lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    if (!modal || !img) return;
    img.src = src;
    if (titleEl) titleEl.textContent = title || 'CRM Interfeysi';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    const modal = document.getElementById('image-lightbox-modal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  const closeLightboxBtn = document.getElementById('close-lightbox-btn');
  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', window.closeLightbox);
  }

  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', window.closeLightbox);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeLightbox();
    }
  });

  // ===================================================================
  // 11. MODERN CYBER GLASSMORPHISM VIDEO PLAYER CONTROLLER
  // ===================================================================
  const videoRoles = ['xodim', 'kassir', 'rahbar'];
  const videoPlayers = {};

  videoRoles.forEach(role => {
    const container = document.getElementById(`player-${role}`);
    if (!container) return;

    const video = document.getElementById(`${role}VideoPlayer`);
    const bigOverlay = document.getElementById(`${role}BigOverlay`);
    const centerFlash = document.getElementById(`${role}CenterFlash`);
    const playBtn = document.getElementById(`${role}PlayBtn`);
    const muteBtn = document.getElementById(`${role}MuteBtn`);
    const timeCur = document.getElementById(`${role}TimeCur`);
    const timeDur = document.getElementById(`${role}TimeDur`);
    const progressContainer = document.getElementById(`${role}ProgressContainer`);
    const progressFill = document.getElementById(`${role}ProgressFill`);
    const bufferedFill = document.getElementById(`${role}Buffered`);
    const fsBtn = document.getElementById(`${role}FsBtn`);

    if (!video) return;

    function formatTime(seconds) {
      if (isNaN(seconds) || seconds < 0) return '0:00';
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    function showFlash(type) {
      if (!centerFlash) return;
      centerFlash.className = `player-center-flash flash-${type} active`;
      clearTimeout(centerFlash._timer);
      centerFlash._timer = setTimeout(() => {
        centerFlash.classList.remove('active');
      }, 450);
    }

    // Inactivity hide timer for controls
    let inactiveTimer = null;
    function resetInactivity() {
      container.classList.remove('is-inactive');
      clearTimeout(inactiveTimer);
      if (!video.paused) {
        inactiveTimer = setTimeout(() => {
          container.classList.add('is-inactive');
        }, 2500);
      }
    }

    container.addEventListener('mousemove', resetInactivity);
    container.addEventListener('touchstart', resetInactivity, { passive: true });

    function pauseOthers() {
      videoRoles.forEach(r => {
        if (r !== role && videoPlayers[r] && videoPlayers[r].video && !videoPlayers[r].video.paused) {
          videoPlayers[r].video.pause();
        }
      });
    }

    function play() {
      pauseOthers();
      video.play().catch(() => {});
    }

    function pause() {
      video.pause();
    }

    function togglePlay() {
      if (video.paused || video.ended) {
        play();
      } else {
        pause();
      }
    }

    // Big Overlay click
    if (bigOverlay) {
      bigOverlay.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
      });
    }

    // Video screen click
    video.addEventListener('click', () => {
      togglePlay();
    });

    // Play/Pause button click
    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
      });
    }

    // Video event listeners
    video.addEventListener('play', () => {
      container.classList.add('is-started', 'is-playing');
      showFlash('play');
      resetInactivity();
    });

    video.addEventListener('pause', () => {
      container.classList.remove('is-playing', 'is-inactive');
      showFlash('pause');
      clearTimeout(inactiveTimer);
    });

    video.addEventListener('ended', () => {
      container.classList.remove('is-started', 'is-playing', 'is-inactive');
      video.currentTime = 0;
      if (progressFill) progressFill.style.width = '0%';
      if (timeCur) timeCur.textContent = '0:00';
    });

    // Duration & Time update
    video.addEventListener('loadedmetadata', () => {
      if (timeDur) timeDur.textContent = formatTime(video.duration);
    });

    video.addEventListener('timeupdate', () => {
      if (!video.duration) return;
      const pct = (video.currentTime / video.duration) * 100;
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (timeCur) timeCur.textContent = formatTime(video.currentTime);
    });

    // Buffered progress
    video.addEventListener('progress', () => {
      if (video.buffered.length > 0 && video.duration && bufferedFill) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        bufferedFill.style.width = `${(bufferedEnd / video.duration) * 100}%`;
      }
    });

    // Seeking / Scrubbing on progress bar
    if (progressContainer) {
      let isDragging = false;
      function seek(e) {
        const rect = progressContainer.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        let pos = (clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(1, pos));
        video.currentTime = pos * video.duration;
        if (progressFill) progressFill.style.width = `${pos * 100}%`;
        if (timeCur) timeCur.textContent = formatTime(video.currentTime);
      }

      progressContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        seek(e);
      });

      window.addEventListener('mousemove', (e) => {
        if (isDragging) seek(e);
      });

      window.addEventListener('mouseup', () => {
        if (isDragging) isDragging = false;
      });

      progressContainer.addEventListener('touchstart', (e) => {
        seek(e);
      }, { passive: true });

      progressContainer.addEventListener('touchmove', (e) => {
        seek(e);
      }, { passive: true });
    }

    // Mute / Unmute
    if (muteBtn) {
      muteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        if (video.muted) {
          container.classList.add('is-muted');
        } else {
          container.classList.remove('is-muted');
        }
      });
    }

    // Fullscreen toggle
    if (fsBtn) {
      fsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
          if (container.requestFullscreen) {
            container.requestFullscreen();
          } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }
      });
    }

    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement === container) {
        container.classList.add('is-fullscreen');
      } else {
        container.classList.remove('is-fullscreen');
      }
    });

    videoPlayers[role] = { container, video, play, pause };
  });

  // Tab switching coordination
  roleTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetRole = btn.getAttribute('data-role');
      videoRoles.forEach(r => {
        if (r !== targetRole && videoPlayers[r] && videoPlayers[r].video && !videoPlayers[r].video.paused) {
          videoPlayers[r].video.pause();
        }
      });
    });
  });
});
