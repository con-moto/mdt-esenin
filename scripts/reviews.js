document.addEventListener('DOMContentLoaded', function() {
  const reviewsList = document.getElementById('reviewsList');
  
  // Создаем навигацию (список спектаклей)
  const nav = document.createElement('nav');
  nav.className = 'reviews-nav';
  const navList = document.createElement('ul');
  navList.className = 'reviews-nav__list';
  
  reviewsData.forEach(spectacle => {
    const navItem = document.createElement('li');
    navItem.className = 'reviews-nav__item';
    const navLink = document.createElement('a');
    navLink.className = 'reviews-nav__link';
    navLink.href = `#${spectacle.id}`;
    navLink.textContent = spectacle.title;
    navItem.appendChild(navLink);
    navList.appendChild(navItem);
  });
  
  nav.appendChild(navList);
  reviewsList.appendChild(nav);
  
  // Создаем секции с отзывами
  reviewsData.forEach(spectacle => {
    const section = document.createElement('section');
    section.className = 'reviews-section__item';
    section.id = spectacle.id;
    
    const title = document.createElement('h2');
    title.className = 'reviews-section__title';
    // Перенос строки после «Отзывы о спектакле»
    title.innerHTML = `Отзывы о спектакле<br>«${spectacle.title}»`;
    section.appendChild(title);
    
    const spacer = document.createElement('div');
    spacer.className = 'reviews-spacer';
    section.appendChild(spacer);
    
    spectacle.reviews.forEach(review => {
      const reviewCard = document.createElement('div');
      reviewCard.className = 'review-card';
      
      const author = document.createElement('div');
      author.className = 'review-card__author';
      author.textContent = review.author;
      reviewCard.appendChild(author);
      
      const text = document.createElement('div');
      text.className = 'review-card__text';
      text.textContent = review.text;
      reviewCard.appendChild(text);
      
      const divider = document.createElement('div');
      divider.className = 'review-card__divider';
      reviewCard.appendChild(divider);
      
      section.appendChild(reviewCard);
    });
    
    reviewsList.appendChild(section);
  });
});