function fetchProductData() {
    const productData = {
        "product": {
            "id": 6937548554342,
            "title": "Embrace Sideboard",
            "description": "<p data-mce-fragment=\"1\">The Embrace Sideboard is a stylish wear. With a top cloth designed to provide superior protection and look great, this storage solution is both functional and attractive. It fits seamlessly into any home decor, with clean lines and a timeless look. Crafted from premium materials for a combination of style, durability, and reliability.</p>",
            "vendor": "Marmeto",
            "product_type": "Cloth",
            "price": "$12999",
            "compare_at_price": "$19999",
            "options": [
                {
                    "name": "Color",
                    "position": 1,
                    "values": [
                        {
                            "Yellow": "#ECDECC"
                        },
                        {
                            "Green": "#BBD278"
                        },
                        {
                            "Blue": "#BBC1F8"
                        },
                        {
                            "Pink": "#FFD3F8"
                        }
                    ]
                },
                {
                    "name": "Size",
                    "position": 2,
                    "values": [
                        "Small",
                        "Medium",
                        "Large",
                        "Extra large",
                        "XXL"
                    ]
                }
            ],
            "images": [
                {
                    "src": "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/laura-chouette-6Y2XstWtDvM-unsplash.jpg?v=1701946731"
                },
                {
                    "src": "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/laura-chouette-HVlOLCHlzJs-unsplash.jpg?v=1701946732"
                },
                {
                    "src": "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/laura-chouette-om8qxMDlGfI-unsplash.jpg?v=1701946732"
                },
                {
                    "src": "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/laura-chouette-WQgvRkmqRrg-unsplash.jpg?v=1701946731"
                }
            ]
        }
    };

    const price = parseFloat(productData.product.price.replace('$', '').replace(',', ''));
    const compareAtPrice = parseFloat(productData.product.compare_at_price.replace('$', '').replace(',', ''));
    const percentageOff = ((compareAtPrice - price) / compareAtPrice) * 100;

    document.querySelector('.product-vendor').textContent = productData.product.vendor;
    document.querySelector('.product-title').textContent = productData.product.title;
    document.querySelector('.price').textContent = productData.product.price;
    document.querySelector('.compare-at-price').textContent = productData.product.compare_at_price;
    document.querySelector('.product-description').innerHTML = productData.product.description;

    document.getElementById('main-product-image').src = productData.product.images[0].src;

    const percentageOffElement = document.querySelector('.percentage-off');
    if (!isNaN(percentageOff) && percentageOff > 0) {
        percentageOffElement.textContent = `Save ${percentageOff.toFixed(2)}%`;
    } else {
        percentageOffElement.textContent = 'No discount';
    }

    const thumbnailsContainer = document.querySelector('.thumbnails');
    productData.product.images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = 'Thumbnail';
        img.classList.add('thumbnail');
        img.addEventListener('click', () => {
            document.getElementById('main-product-image').src = image.src;
        });
        thumbnailsContainer.appendChild(img);
    });

    function populateColorOptions() {
        const colorContainer = document.querySelector('.c-container');
        productData.product.options[0].values.forEach(color => {
            const colorDiv = document.createElement('div');
            const colorName = Object.keys(color)[0];
            colorDiv.style.backgroundColor = color[colorName];
            colorDiv.classList.add('color');
            colorDiv.dataset.color = colorName;

            colorDiv.addEventListener('click', () => handleColorSelection(colorDiv));

            colorContainer.appendChild(colorDiv);
        });
    }

    const sizeSelector = document.querySelector('.size-selector');
    productData.product.options[1].values.forEach(size => {
        const input = document.createElement('input');
        const label = document.createElement('label');
        input.type = 'radio';
        input.id = size.toLowerCase();
        input.name = 'size';
        input.value = size;
        label.htmlFor = size.toLowerCase();
        label.textContent = size;
        sizeSelector.appendChild(input);
        sizeSelector.appendChild(label);
    });

    function handleColorSelection(selectedColorDiv) {
        const selectedColor = selectedColorDiv.dataset.color;
        const allColors = document.querySelectorAll('.color');
        allColors.forEach(color => {
            color.classList.remove('selected');
            color.style.border = 'none';
        });
        selectedColorDiv.classList.add('selected');
        selectedColorDiv.style.border = '2px solid black';
        updateAddToCartMessage();
    }

    function handleSizeSelection() {
        updateAddToCartMessage();
    }

    function updateAddToCartMessage() {
        const selectedColor = document.querySelector('.color.selected');
        const selectedSize = document.querySelector('input[name="size"]:checked');
        const price = document.querySelector('.price').textContent;

        if (selectedColor && selectedSize) {
            const color = selectedColor.dataset.color;
            const size = selectedSize.value;

            const addedProductDetails = document.getElementById('addedProductDetails');
            addedProductDetails.textContent = `Embrace Sideboard with Color ${color}, Size ${size}, Price ${price} added to cart`;
            
            addedProductDetails.style.background = '#E7F8B7';
            addedProductDetails.style.color = '#000000';
            addedProductDetails.style.fontFamily = 'Inter';
            addedProductDetails.style.fontSize = '14px';
            addedProductDetails.style.fontWeight = '600';
            addedProductDetails.style.lineHeight = '17px';
            addedProductDetails.style.letterSpacing = '0';
            addedProductDetails.style.textAlign = 'center';
        }
    }

    const colors = document.querySelectorAll('.color');
    colors.forEach(color => {
        color.addEventListener('click', () => handleColorSelection(color));
    });

    const sizeInputs = document.querySelectorAll('input[name="size"]');
    sizeInputs.forEach(size => {
        size.addEventListener('change', handleSizeSelection);
    });

    populateColorOptions();
}

fetchProductData();
