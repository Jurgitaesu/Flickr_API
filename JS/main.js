$(function () {
    let API_KEY = "9bb17a7da342e8fb1afb103bed25d2bd";
    let url = "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=" + API_KEY + "&format=json&nojsoncallback=1";
    let photos = [];
    var sortAlphabeticallyBtn = document.getElementById("sortAlphabeticallyBtn");
    var flickrSortedPhotoWithTitle = document.getElementById("flickrSortedPhotoWithTitle");

    $.get(url, function (data) {
        fetchPhoto(data);
    });

    sortAlphabeticallyBtn.addEventListener("click", function () {
        $.get(url, function (data) {
            fetchPhoto(data);
        });

        function compareTitles(a, b) {
            var titleA = a.title.toLowerCase(),
                titleB = b.title.toLowerCase()

            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }
            return 0;
        }

        photos.sort(compareTitles);

        $("#flickrSortedPhotoWithTitle").html(photos);
    })


    function fetchPhoto(data) {
        for (let i = 0; i < data.photos.photo.length; i++) {
            let photoObj = {
                id: data.photos.photo[i].id,
                title: data.photos.photo[i].title
            }
            photos.push(photoObj);
            getThumbnail(photoObj);
        }

        function getThumbnail(photoObj) {
            let getThumbnailStr = "https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + API_KEY + "&photo_id=" + photoObj.id + "&format=json&nojsoncallback=1";
            $.get(getThumbnailStr, function (data) {
                photoObj.thumbnail = data.sizes.size[2].source;
                display(photos);

            });
        }

        function display(photos) {
            let htmlStr = "";
            for (let i = 0; i < photos.length; i++) {
                htmlStr += `<div class="row"><div class="column"><figure data-thumbnail="${photos[i].thumbnail}"><img src = "${photos[i].thumbnail}"></figure></div><div class="column">${photos[i].title}</div></div>`;

            }

            $("#flickrPhotoWithTitle").html(htmlStr);

        }
    }
});
