// Year
var d = new Date();
var year = d.getFullYear();

$('#title-season').html('Anime Season '+ year);


// https://api.jikan.moe/v3/genre/type/genre_id/page

// Season Function
function animeSeason(season) {

    $('#middle-content').empty();

    $.getJSON('https://api.jikan.moe/v3/season/'+ year +'/'+ season, function(data) {
        
        let result = data.anime;

        $.each(result, function(i, data) {
            if( i >= 32 ) {
                return;
            }

            $('#middle-content').append(`
            <div class="col-md-3 col-6 mb-4">
                <div id="detail-anime" data-id="`+ data.mal_id +`" class="img-poster" data-toggle="modal" data-target=".bd-example-modal-lg" class="img-poster" style="
                    background-image: url(`+ data.image_url +`);
                    background-position: center;
                    background-size: cover;
                ">
                </div>
                <h3>`+ data.title +`</h3>
            </div>
            `);

        });

    });

}

// Gendre Function 
function animeGendre(id) {

    $('#middle-content').empty();

    $.getJSON('https://api.jikan.moe/v3/genre/anime/'+ id, function(data) {
        
        let result = data.anime;
        console.log(result);

        $.each(result, function(i, data) {
            if( i >= 32 ) {
                return;
            }

            $('#middle-content').append(`
            <div class="col-md-3 col-6 mb-4">
                <div id="detail-anime" data-id="`+ data.mal_id +`" class="img-poster" data-toggle="modal" data-target=".bd-example-modal-lg" class="img-poster" style="
                    background-image: url(`+ data.image_url +`);
                    background-position: center;
                    background-size: cover;
                ">
                </div>
                <h3>`+ data.title +`</h3>
            </div>
            `);
        });

    });

}

// Upcoming Function
function animeUpComing() {

    $('#anime-upcoming').empty();

    $.getJSON('https://api.jikan.moe/v3/top/anime/1/upcoming', function(data) {
        
        let result = data.top;

        $.each(result, function(i, data) {
            if( i >= 3 ) {
                return;
            }

            if( data.episodes == null ) {
                data.episodes = 'unknow';
            }
            
            $('#anime-upcoming').append(`
                <div class="row box-content">
                    <div class="col-md-4 col-4">
                        <div id="detail-anime" data-id="`+ data.mal_id +`" class="img-top" data-toggle="modal" data-target=".bd-example-modal-lg" class="img-poster" style="
                            background-image: url(`+ data.image_url +`);
                            background-position: center;
                            background-size: cover;
                        ">
                        </div>
                    </div>
                    <div class="col-md-8 col-6 subdata">
                        <h3>
                            `+ data.title +`
                        </h3>
                        <div class="row">
                            <div class="col-md-12">
                                <p>`+ data.type +` <span>`+ data.episodes +` eps</span></p>
                            </div>
                        </div>
                        <p>Members <span>`+ data.members +`</span></p>
                    </div>
                </div>
            `);

        });

    });

}

// TopAiring Function
function animeTopAiring() {

    $('#middle-content').empty();

    $.getJSON('https://api.jikan.moe/v3/top/anime/1/airing', function(data) {
        
        let result = data.top;

        $.each(result, function(i, data) {
            if( i >= 32 ) {
                return;
            }
            if( data.episodes == null ) {
                data.episodes = 'unknow';
            }
            
            $('#middle-content').append(`
            <div class="col-md-3 col-6 mb-4">
                <div id="detail-anime" data-id="`+ data.mal_id +`" data-toggle="modal" data-target=".bd-example-modal-lg" class="img-poster" style="
                    background-image: url(`+ data.image_url +`);
                    background-position: center;
                    background-size: cover;
                ">
                </div>
                <h3>`+ data.title +`</h3>
            </div>
            `);

        });

        $('#hero-title').html('Top Airing '+ year);

    });

}

// Search Anime
function animeSearch() {

    let input = $('#search-input').val();

    if( input == "" ) {
        animeTopAiring();
    }

    $('#middle-content').empty();
   
    $.ajax({
        url : "https://api.jikan.moe/v3/search/anime",
        type : "get",
        dataType : 'json',
        data : {
            'q' : input,
            'limit' : 32
        },
        success : function(result) {
            
            let anime = result.results;

            $.each(anime, function(i, data) {
    
                $('#middle-content').append(`
                <div class="col-md-3 col-6 mb-4">
                    <div id="detail-anime" data-id="`+ data.mal_id +`" class="img-poster" data-toggle="modal" data-target=".bd-example-modal-lg" class="img-poster" style="
                        background-image: url(`+ data.image_url +`);
                        background-position: center;
                        background-size: cover;
                    ">
                    </div>
                    <h3>`+ data.title +`</h3>
                </div>
                `);
    
            });

            let keyword = $('#search-input').val();
            $('#hero-title').html(keyword);
            $('#search-input').val('');

        }
    });

}

// Detail Anime
$('#body').on('click', '#detail-anime',function() {

    $('#modal-body').empty();

    let id = $(this).data('id');

    $.getJSON('https://api.jikan.moe/v3/anime/'+id, function(data) {

        if( data.episodes == null ) {
            data.episodes = 'unknow';
        }
        
        $('#modal-body').append(`
            <div class="row detail-anime">
                <div class="col-md-4 text-center">
                    <img src="`+ data.image_url +`" alt="" class="img-fluid">
                </div>
                <div class="col-md-8">
                    <h3 class="title-detail">
                        `+ data.title +`
                    </h3>
                    <p class="durasi">Status : <span>`+ data.status +`</span></p>
                    <p class="durasi">Duration : <span>`+ data.duration +`</span></p>
                    <div class="row mt-2 mb-2">
                        <div class="col-md-3 col-12">
                            <p class="score">Score : <span>`+ data.score +`</span></p>
                        </div>
                        <div class="col-md-4 col-12">
                            <p class="score">Type : <span>`+ data.type +`</span> <span>`+ data.episodes +` eps</span></p>
                        </div>
                        <div class="col-md-5 col-12">
                            <p class="score">Members : <span>`+ data.members +`</span></p>
                        </div>
                    </div>
                    <p class="score">Popularity : <span>`+ data.popularity +`</span></p>
                    <p class="score">Studio :  <span>`+ data.studios[0].name +`</span></p>
                    <div class="synopsis">
                        <p class="score">Synopsis</p>
                        <span>`+ data.synopsis +`</span>
                    </div>
                </div>
                <div class="col-12"> 
                    <div class="row preview">
                        <div class="col-md-12 trailer text-center">
                            <h4>Trailer</h4>
                            <div class="embed-responsive embed-responsive-16by9">
                                <iframe class="embed-responsive-item" src="`+ data.trailer_url +`" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        `);

    });

});

animeTopAiring()
animeUpComing();

$('.btn-gendre').on('click', function() {
    $('.btn-gendre').removeClass('btn-gendre-active');
    $('.link-season').removeClass('link-season-active');
    $(this).addClass('btn-gendre-active');

    let gendre = $(this).html();
    $('#hero-title').html(gendre);

    switch (gendre.toLowerCase()) {
        case 'action':
          id = 1;
          break;
        case 'adventure':
          id = 2;
          break;
        case 'comedy':
            id = 4;
            break;
        case 'fantasy':
          id = 10;
          break;
        case 'game':
          id = 11;
          break;
        case 'horror':
          id = 14;
          break;
        case 'romance':
          id = 22;
          break;
        case 'sports':
          id = 30;
          break;
      }

    animeGendre(id);

    // $('#middle-content').empty();

    // $.getJSON('https://api.jikan.moe/v3/genre/anime/'+ id, function(data) {
        
    //     let result = data.anime;
    //     console.log(result);

    //     $.each(result, function(i, data) {
    //         if( i >= 32 ) {
    //             return;
    //         }

    //         $('#middle-content').append(`
    //         <div class="col-md-3 mb-4">
    //             <div class="img-poster" data-target=".bd-example-modal-lg" class="img-poster" style="
    //                 background-image: url(`+ data.image_url +`);
    //                 background-position: center;
    //                 background-size: cover;
    //             ">
    //             </div>
    //             <h3>`+ data.title +`</h3>
    //         </div>
    //         `);
    //     });

    // });

});

$('.link-season').on('click', function() {
    $('.btn-gendre').removeClass('btn-gendre-active');
    $('.link-season').removeClass('link-season-active');

    $(this).addClass('link-season-active');

    let season = $(this).html();
    $('#hero-title').html(season);

    animeSeason(season.toLowerCase());

});

$('#search-input').on('keyup', function (e) {
    if( e.which === 13 ) {
        animeSearch();
    }
});

