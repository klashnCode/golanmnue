
$(document).ready(function () {
    const database = firebase.database();
    const beforeQuery = database.ref('menu/')

    /************* */

    const notifications = (message) => {
        if (message == 'fillall') {
            $('.fillall').fadeIn(1000);

            setTimeout(function () {
                $('.fillall').fadeOut(1000);
            }, 3500);
        }

        if (message == 'inserted successfully') {
            $('.inserted').fadeIn(1000);

            setTimeout(function () {
                $('.inserted').fadeOut(1000);
            }, 3500);
        }

        if (message == 'updated') {
            $('.updated').fadeIn(1000);

            setTimeout(function () {
                $('.updated').fadeOut(1000);
            }, 3500);
        }
    }

    /******************** */
    $('[name=submit]').click(function (e) {
        e.preventDefault();

        const category = $('[name=category]').val(),
            title = $('[name=title]').val(),
            price = $('[name=price]').val(),
            image = $('[name=image]').val().slice(12),
            newid = beforeQuery.push();
        console.log(category)
        console.log(title)
        console.log(price)
        console.log(image)

        if (!title || !price || !image) {
            notifications('fillall');
        } else {
            newid.set({
                category: category,
                title: title,
                price: price,
                image: "img/" + image
            },
                function (error) {
                    if (!error) {
                        notifications("inserted successfully");
                        $('[name=title]').val("");
                        $('[name=price]').val("");
                        $('[name=image]').val("");
                    }
                    else {
                        console.log('Not Saved');
                    }

                });
        }
    });


    beforeQuery.on('value', function success(data) {
        if (data) {
            let category1 = '',
                category2 = '',
                category3 = '',
                category4 = '';

            $.each(data.val(), function (key, value) {
                let id = key,
                    category = value['category'],
                    title = value['title'],
                    price = value['price'],
                    image = value['image'];

                if (category == 'category1') {
                    category1 += `<div class="product-box">
                          <div id= ${key}>
                          <img class="image" src=${image}>
                          <img class="title">${title}</div><hr>
                          <div class="price">${parseFloat(price).toFixed(2)} ש</div><hr>
                          <div data-id=${key} class="delete">del</div>
                          </div>
                          </div>
                          `;
                    /*category1 += `<div class="cards">
                          <div class="card">
                          <div id= ${key}>
                          <img class="card-img-top" style="width: 280px; height: 280px; " src=${image}>
                          <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${parseFloat(price).toFixed(2)} ש</p>
                          </div>
                          <div class="card-footer">
                          <div data-id=${key} class="del">del</div>
                          </div>
                        </div>
                        </div>
                        `;*/
                } else if (category == 'category2') {
                    category2 += `<div class="product-box">
                    <div id= ${key}>
                    <img class="image" src=${image}>
                    <img class="title">${title}</div><hr>
                    <div class="price">${parseFloat(price).toFixed(2)} ש</div><hr>
                    <div data-id=${key} class="delete">del</div>
                    </div>
                    </div>
                          `;
                    /*category2 += `<div class="cards">
                          <div class="card">
                          <div id= ${key}>
                          <img class="card-img-top" style="width: 280px; height: 280px; " src=${image}>
                          <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${parseFloat(price).toFixed(2)} ש</p>
                          </div>
                          <div class="card-footer">
                          <div data-id=${key} class="del">del</div>
                          </div>
                        </div>
                        </div>
                        `;*/
                } else if (category == 'category3') {
                    category3 += `<div class="product-box">
                    <div id= ${key}>
                    <img class="image" src=${image}>
                    <img class="title">${title}</div><hr>
                    <div class="price">${parseFloat(price).toFixed(2)} ש</div><hr>
                    <div data-id=${key} class="delete">del</div>
                    </div>
                    </div>
                          `;
                    /*category3 += `<div class="cards">
                          <div class="card">
                          <div id= ${key}>
                          <img class="card-img-top" style="width: 280px; height: 280px; " src=${image}>
                          <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${parseFloat(price).toFixed(2)} ש</p>
                          </div>
                          <div class="card-footer">
                          <div data-id=${key} class="del">del</div>
                          </div>
                        </div>
                        </div>
                        `;*/
                } else if (category == 'category4') {
                    category4 += `<div class="product-box">
                    <div id= ${key}>
                    <img class="image" src=${image}>
                    <img class="title">${title}</div><hr>
                    <div class="price">${parseFloat(price).toFixed(2)} ש</div><hr>
                    <div data-id=${key} class="delete">del</div>
                    </div>
                    </div>
                          `;
                    /*category4 += `<div class="cards">
                          <div class="card">
                          <div id= ${key}>
                          <img class="card-img-top" style="width: 280px; height: 280px; " src=${image}>
                          <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${parseFloat(price).toFixed(2)} ש</p>
                          </div>
                          <div class="card-footer">
                          <div data-id=${key} class="del">del</div>
                          </div>
                        </div>
                        </div>
                        `;*/
                }

            });
            $('.category1').html(category1);
            $('.category2').html(category2);
            $('.category3').html(category3);
            $('.category4').html(category4);



            /******* */

            $(".delete").click(function () {
                let thekey = $(this).data('id');
                beforeQuery.child(thekey).remove();
            })

            /****** */


        } else { console.log('NO data Found') }
    });


});
