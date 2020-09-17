//Declarar as variáveis / constantes para atuação do nosso worker
var CACHE_NAME = 'blog-cache-v1'
var urlsToCache = [
    'css/blog.css',
    'css/bootstrap.css',
    'js/bootstrap.js',
    'js/jquery-3.5.1.js',
]

self.addEventListener('install', function(event) {
    //Paremetrizar as etapas de instalação do nosso cache no dispositivo
    event.waitUntil( 
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Cache aberto...')
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            if(response) {
                return response
            }
            return fetch(event.request)
        })
    )
})