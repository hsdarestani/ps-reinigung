(() => {
  const imageMap = {
    1: {
      src: 'https://ps-reinigung.de/wp-content/uploads/2025/01/10002538_600x600.jpg'
    },
    2: {
      src: 'https://ps-reinigung.de/wp-content/uploads/2025/01/LEWI-Einwaschbezug-Pad-Strip-mit-Druckknopf-35-cm-1.jpg',
      fallback: 'https://ps-reinigung.de/wp-content/uploads/2025/01/LEWI-Einwaschbezug-Pad-Strip-mit-Druckknopf-35-cm-1-100x100.jpg'
    },
    3: {
      src: 'https://ps-reinigung.de/wp-content/uploads/2025/01/Lewi-Einwaschbezug-Blue-Star-mit-Klettverschluss.jpg',
      fallback: 'https://ps-reinigung.de/wp-content/uploads/2025/01/Lewi-Einwaschbezug-Blue-Star-mit-Klettverschluss-100x100.jpg'
    },
    4: {
      src: 'https://media.hygi.eu/479447/image/81608_big_0.jpg?cache=1a748fb098ff1132f552da8025bf50ba'
    },
    5: {
      src: 'https://www.office1.fr/16133-large_default/dreiturm-nettoyant-pour-sols-wischfris-classic-10-litres.jpg'
    },
    6: {
      src: 'https://www.clendo.de/cdn/shop/files/buzil-buz-dish-fix-g530-spuelmittel-10l-111.webp?v=1774432594&width=3840'
    },
    7: {
      src: 'https://cleanclub.de/media/38/3b/eb/1758034824/2906_Cover.jpg?ts=1758034824'
    },
    8: {
      src: 'https://media.hygi.eu/489742/image/144950_big_0.jpg?cache=05c611a1b1b4adee2ff539684e138318'
    },
    9: {
      src: 'https://ps-reinigung.de/wp-content/uploads/2020/03/Handseife-10L.png'
    },
    10: {
      src: 'https://ps-reinigung.de/wp-content/uploads/2020/03/Handtuchrolle_Innenabwicklung_2-lagig_Zellstoff-Papier-600x470.png'
    },
    11: {
      src: 'https://ps-reinigung.de/wp-content/uploads/2020/03/Toilettenpapier-2-Lagig-250-BL-2-600x360.png'
    },
    12: {
      src: 'https://media.hygi.eu/478085/image/35669_big_0.jpg?cache=0d7e7d6774fc3fe6a1513fc7da85c902'
    }
  };

  const style = document.createElement('style');
  style.textContent = `
    .product-visual {
      background: linear-gradient(145deg,#ffffff,#f4f8f6) !important;
    }
    .product-photo {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 20px 22px 16px;
      display: block;
      mix-blend-mode: multiply;
      filter: drop-shadow(0 14px 18px rgba(16,48,42,.10));
      transition: transform .25s ease;
    }
    .product:hover .product-photo { transform: scale(1.045); }
    .product-visual .badge { z-index: 2; }
    @media (max-width: 600px) {
      .product-photo { padding: 14px 16px 12px; }
    }
  `;
  document.head.appendChild(style);

  products.forEach(product => {
    if (imageMap[product.id]) product.image = imageMap[product.id];
  });

  const fallbackVisual = visual;

  window.psProductImageFallback = function (img, id) {
    const product = products.find(item => item.id === Number(id));
    if (!product) return;

    const image = product.image || {};
    if (image.fallback && img.dataset.fallbackTried !== '1') {
      img.dataset.fallbackTried = '1';
      img.src = image.fallback;
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = fallbackVisual(product);
    const replacement = wrapper.firstElementChild;
    if (replacement) img.replaceWith(replacement);
  };

  visual = function (product) {
    if (!product.image || !product.image.src) return fallbackVisual(product);
    const safeName = product.name.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<img class="product-photo" src="${product.image.src}" alt="${safeName}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="psProductImageFallback(this, ${product.id})">`;
  };

  renderProducts();
})();
