import galleryItems from './gallery-items.js';

const refs = {
    listGallery: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    imageModal: document.querySelector('.lightbox__image'),
    closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
    overlay: document.querySelector('.lightbox__overlay')
}

let indexCurrentImage;
refs.listGallery.addEventListener('click', onOpenModal);

const createMarkup = galleryItems => {
    return galleryItems.reduce((acc, { original, preview, description }, i) => {
        acc += `<li class="gallery__item">
                    <a class="gallery__link"
                        href="${original}">
                    <img class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                        data-index="${i}"/>
                    </a>
                </li>`;
        return acc;
    }, '');
};
refs.listGallery.innerHTML = createMarkup(galleryItems);


function onOpenModal(event) {
    event.preventDefault();

    if (event.target.nodeName === 'IMG') {
    indexCurrentImage = Number(event.target.dataset.index)
    refs.modal.classList.add('is-open')

    refs.imageModal.src = event.target.dataset.source;
    refs.imageModal.alt = event.target.alt;

    refs.closeModalBtn.addEventListener('click', onCloseModal);
    refs.overlay.addEventListener('click', onCloseModal);
    window.addEventListener('keydown', onPressKey)
    }
};

function onCloseModal() {
    refs.modal.classList.remove('is-open')
    refs.imageModal.src = ''

    refs.closeModalBtn.removeEventListener('click', onCloseModal);
    refs.overlay.removeEventListener('click', onCloseModal);
    window.removeEventListener('keydown', onPressKey)
};

function onPressKey(event) { 
    switch (event.code) {
        case 'Escape':
            onCloseModal()
                break;
        
        case 'ArrowRight':
            indexCurrentImage + 1 === galleryItems.length
                ? indexCurrentImage = 0
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
