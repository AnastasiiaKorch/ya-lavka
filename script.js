document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product');
    const basket = document.querySelector('.basket-container');
    const banner = document.querySelector('.banner');
    const button = document.createElement('button');

    button.textContent = 'Оплатить корзину';
    button.style.display = 'none';
    button.type = 'submit';
    banner.appendChild(button);

    button.addEventListener('click', () => {
        window.location.href = 'https://lavka.yandex.ru';
    });

    let draggedItem = null;
    let draggedClone = null;
    let touchStartX = 0;
    let touchStartY = 0;

    products.forEach(function(product) {
        product.addEventListener('dragstart', function(e) {
            draggedItem = this;
            this.classList.add('dragging');
            e.dataTransfer.setData('text', '');
        });

        product.addEventListener('dragend', function(e) {
            this.classList.remove('dragging');
            if (draggedItem && !basket.contains(draggedItem)) {
                this.classList.remove('hidden');
            }
            draggedItem = null;
        });

        product.addEventListener('touchstart', function(e) {
            if(draggedItem === null){
                draggedItem = this;
                this.classList.add('dragging');
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        });
        product.addEventListener('touchmove', function(e) {
            if (draggedItem) {
                if (!draggedClone) {
                    draggedClone = draggedItem.cloneNode(true);
                    draggedClone.style.position = 'absolute';
                    draggedClone.style.zIndex = '1000';
                    draggedClone.style.pointerEvents = 'none';
                    document.body.appendChild(draggedClone);
                }

                draggedClone.style.left = e.touches[0].clientX - this.offsetWidth / 2 + 'px';
                draggedClone.style.top = e.touches[0].clientY - this.offsetHeight / 2 + 'px';

                e.preventDefault();
            }
        });

        product.addEventListener('touchend', function(e) {
            if (draggedItem) {
                if(draggedClone){
                    document.body.removeChild(draggedClone);
                    draggedClone = null;
                }

                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                const scaleX = window.innerWidth / document.documentElement.clientWidth;
                const scaleY = window.innerHeight / document.documentElement.clientHeight;
                const basketRect = basket.getBoundingClientRect();
                const basketLeft = basketRect.left + window.scrollX;
                const basketTop = basketRect.top + window.scrollY;
                const basketRight = basketLeft + basketRect.width;
                const basketBottom = basketTop + basketRect.height;

                if (touchEndX  >= (basketLeft - 50) * scaleX &&
                    touchEndX  <= (basketRight + 50)* scaleX &&
                    touchEndY >= (basketTop - 50) * scaleY &&
                    touchEndY <= (basketBottom + 50) * scaleY) {
                    basket.dispatchEvent(new Event('drop'));
                } else {
                    this.classList.remove('dragging');
                    if (draggedItem && !basket.contains(draggedItem)){
                        this.classList.remove('hidden');
                    }
                }
                draggedItem = null;
            }
        });
    });

    basket.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    basket.addEventListener('drop', function(e) {
        e.preventDefault();
        if (draggedItem) {
            const clonedItem = draggedItem.cloneNode(true);
            clonedItem.removeAttribute('id');
            clonedItem.setAttribute('draggable', false);
            this.appendChild(clonedItem);
            draggedItem.classList.add('hidden');
            draggedItem = null;
            const itemInBasket = this.querySelectorAll('.product').length;
            if (itemInBasket >= 3) {
                button.style.display = 'block';
                button.classList.add('btn_basket');
            } else {
                button.style.display = 'none';
            }
        }
    });
});