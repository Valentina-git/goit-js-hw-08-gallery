import galleryItems from './gallery-items.js';

const refs = {
    listGallery: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    imageModal: document.querySelector('.lightbox__image'),
    closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
    overlay: document.querySelector('.lightbox__overlay')
}

let indexCurrentImage;

refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.listGallery.addEventListener('click', onOpenModal);

function createLi({original, preview, description}, index)  {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');

    li.classList.add('gallery__item');
    a.classList.add('gallery__link');
    img.classList.add('gallery__image');

    a.href = original;
    img.src = preview;
    img.alt = description;
    
    img.setAttribute('data-source', original);
    img.setAttribute('data-index', index);

    a.append(img);
    li.append(a);

    return li;
};

function createGallery(galleryItems) {
    
    return galleryItems.map((liItem, index) => {

        return createLi({
            original: liItem.original,
            preview: liItem.preview,
            description: liItem.description
        }, index)
    })
}

refs.listGallery.append(...createGallery(galleryItems));


function onOpenModal(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return
    }

    indexCurrentImage = Number(event.target.dataset.index)
    refs.modal.classList.add('is-open')

    refs.imageModal.src = event.target.dataset.source;
    refs.imageModal.alt = event.target.alt;

    refs.closeModalBtn.addEventListener('click', onCloseModal);
    refs.overlay.addEventListener('click', onCloseModal);
    window.addEventListener('keydown', onPressKey)
};

function onCloseModal() {
    refs.modal.classList.remove('is-open')
    refs.imageModal.src = ''
};

function onPressKey(event) { 
    switch (event.code) {
        case 'Escape':
            onCloseModal()
                break;
        
        case 'ArrowRight':
            indexCurrentImage + 1 === galleryItems.length
                ? indexCurrentImage = galleryItems.length - 1
                : indexCurrentImage += 1;
            refs.imageModal.src = galleryItems[indexCurrentImage].original
            break;
        
        case 'ArrowLeft':
            indexCurrentImage === 0
                ? indexCurrentImage = galleryItems.length - 1
                : indexCurrentImage -= 1;
            refs.imageModal.src = galleryItems[indexCurrentImage].original
            break;

        default:
            break;
    }
};
