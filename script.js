document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product');
    const basket = document.querySelector('.basket-container');
    const banner=document.querySelector('.banner')
    const button = document.createElement('button');

    button.textContent = 'Оплатить корзину';
    button.style.display = 'none';
    button.type='submit';
    banner.appendChild(button);

    button.addEventListener('click', ()=>{
        window.location.href= 'https://lavka.yandex.ru';
    })
    let draggedItem = null;

    products.forEach(function(product) {
        product.addEventListener('dragstart', function (e) {
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

            const position = parseInt(draggedItem.getAttribute('data-position'), 10);
            clonedItem.style.position = 'absolute';

            if (position < 1 ) {
                clonedItem.style.top = '400px';
                clonedItem.style.left='80px'
            }
            if(position >=1){
                clonedItem.style.top='430px'
            }
            if(position >= 2 ){
                clonedItem.style.top='480px';
                clonedItem.style.left='130px'
            }
            if(position >=3){
                clonedItem.style.top='490px'
                clonedItem.style.left='140px'
            }
            if(position >=4){
                clonedItem.style.top='480px'
                clonedItem.style.left='120px'
                clonedItem.style.zIndex='-4'
            }
            if(position >=5){
                clonedItem.style.top='480px'
                clonedItem.style.left='150px'

            }
            if(position >=6){
                clonedItem.style.top='480px'
                clonedItem.style.left='155px'
                clonedItem.style.zIndex='-4'
            }
            if(position >=7){
                clonedItem.style.top='440px'
                clonedItem.style.left='185px'
                clonedItem.style.zIndex='-3'
            }
            if(position >=8){
                clonedItem.style.top='470px'
                clonedItem.style.left='185px'
            }
            this.appendChild(clonedItem);
            draggedItem.classList.add('hidden');
            draggedItem = null;

            const itemInBasket= this.querySelectorAll('.product').length;
            if(itemInBasket >= 3){
                button.style.display='block';
                button.classList.add('btn_basket')
            } else {
                button.style.display='none';
            }
        }
    });
});