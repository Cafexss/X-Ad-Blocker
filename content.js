function removeAds() {
    const adSelectors = [
      '[data-testid="placementTracking"]',
      '[data-testid="trend"]',
      '[aria-label="Timeline: Trending now"]',
      '[id^="id__"][data-testid="card.wrapper"]', // 定位推荐卡片
    ];
  
    adSelectors.forEach(selector => {
      const ads = document.querySelectorAll(selector);
      ads.forEach(ad => {
        const closestTweet = ad.closest('[data-testid="tweet"]');
        if (closestTweet) {
          closestTweet.remove(); // 移除整个推文容器
        } else {
          ad.remove(); // 如果不在推文内,直接移除广告元素
        }
      });
    });
  
    // 处理"推荐"标签
    document.querySelectorAll('.css-175oi2r.r-1s2bzr4').forEach(el => {
      if (el.textContent.includes('推荐')) {
        const closestTweet = el.closest('[data-testid="tweet"]');
        if (closestTweet) {
          closestTweet.remove();
        } else {
          el.remove();
        }
      }
    });
  }
  
  // 初始运行
  removeAds();
  
  // 创建一个MutationObserver来监视DOM变化
  const observer = new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.addedNodes.length > 0)) {
      removeAds();
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });