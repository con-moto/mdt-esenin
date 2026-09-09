// scripts/news.js

(function() {
  const newsList = document.getElementById('newsList');
  if (!newsList || !window.NEWS_DATA) return;

  const COLORS = [
    'bg-white',
    'bg-gray1',
    'bg-gray2',
    'bg-gray3',
    'bg-lightblue',
    'bg-bluegray',
    'bg-silver',
    'bg-lightgray'
  ];

  function getRandomColor(exclude) {
    let available = COLORS.filter(c => c !== exclude);
    return available[Math.floor(Math.random() * available.length)];
  }

  function renderNews() {
    newsList.innerHTML = '';
    let lastColor = '';

    window.NEWS_DATA.forEach(item => {
      const color = getRandomColor(lastColor);
      lastColor = color;

      const card = document.createElement('article');
      card.className = `news-card ${color}`;

      const img = document.createElement('img');
      img.className = 'news-card__image';
      img.src = `../assets/images/news/card (${item.imageNumber}).avif`;
      img.alt = item.title;
      img.loading = 'lazy';

      const content = document.createElement('div');
      content.className = 'news-card__content';

      const title = document.createElement('h3');
      title.className = 'news-card__title';
      title.textContent = item.title;

      const lead = document.createElement('p');
      lead.className = 'news-card__lead';
      lead.textContent = item.lead;

      const paragraphs = document.createElement('div');
      paragraphs.className = 'news-card__paragraphs';

      item.paragraphs.forEach(para => {
        const p = document.createElement('p');
        p.className = 'news-card__paragraph';
        p.textContent = para;
        paragraphs.appendChild(p);
      });

      const moreWrapper = document.createElement('div');
      moreWrapper.className = 'news-card__more-wrapper';

      const more = document.createElement('a');
      more.className = 'news-card__more';
      more.href = item.moreUrl;
      more.target = '_blank';
      more.rel = 'noopener noreferrer';
      more.textContent = 'ПОДРОБНЕЕ';

      moreWrapper.appendChild(more);

      content.appendChild(title);
      content.appendChild(lead);
      content.appendChild(paragraphs);
      content.appendChild(moreWrapper);

      card.appendChild(img);
      card.appendChild(content);
      newsList.appendChild(card);
    });
  }

  renderNews();
})();