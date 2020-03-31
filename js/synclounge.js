
Array.from( document.querySelectorAll( '.md-tabs__link, .md-content a' ) ).forEach( tabLink => {
    if(location.hostname !== tabLink.hostname) {
        if(tabLink.title != 'Edit this page') {
            tabLink.classList.add('external');
            tabLink.setAttribute('target', '_blank')
        }
    }
});

let headerElement = document.querySelector('h1');
if( headerElement.innerHTML.includes("<!-- Home -->") ) {
    headerElement.remove();
    document.querySelector('a[title="Edit this page"]').remove();
}
